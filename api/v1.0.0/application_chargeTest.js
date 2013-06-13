/*
 * Copyright 2013 Mitchell Amihod
 *
 * Author: Mitchell Amihod <mitchell@amihod.com>
 */

"use strict";

var Assert = require("assert");
var Client = require("./../../index");
if(process.env['SHOPIFY_HOST'] === undefined) {
  require('./../../env');
}

describe("[application_charge]", function() {
  var client
    , created_test_charge_id
    , confirmation_url
    , auth_url = "https://" + process.env['SHOPIFY_HOST'] + "/admin/auth"
    , auth_cookies
    ;

  beforeEach(function() {
    client = new Client({
      version: "1.0.0"
      , host: process.env['SHOPIFY_HOST']
      , token: process.env['SHOPIFY_TOKEN']

    });
  });

  it("should successfully execute POST /admin/application_charges.json (create)", function(next) {
    this.timeout(4000);
    client.application_charge.create({
      application_charge: {
        name: "Test Application One Time Charge"
        , price: "100.00"
        , test: true
      }
    },

    function(err, res) {
      Assert.equal(err, null);
      Assert.ok(res.application_charge);

      created_test_charge_id = res.application_charge.id;
      Assert.ok(created_test_charge_id);

      confirmation_url = res.application_charge.confirmation_url;
      console.log(confirmation_url);
      Assert.ok(confirmation_url);
      next();
    });
  });


  it("should successfully execute GET /admin/application_charges.json (all)", function(next) {
    this.timeout(4000);
    client.application_charge.all({},

    function(err, res) {
      Assert.equal(err, null);
      Assert.ok(res.application_charges);
      next();
    });
  });

  it("should successfully execute GET /admin/application_charges/:id.json (one)", function(next) {
    client.application_charge.one({
      id: created_test_charge_id
      , fields: "id,name,price,confirmation_url"
    },

    function(err, res) {
      Assert.equal(err, null);
      Assert.equal(res.application_charge.id, created_test_charge_id);
      Assert.ok(res.application_charge.name);
      Assert.ok(res.application_charge.price);
      Assert.equal(res.application_charge.confirmation_url, confirmation_url);
      //Will throw an error if its true. basically check fields is respected.
      Assert.ifError(res.application_charge.status);
      next();
    });
  });

  it("should successfully login to the admin area", function(next) {

    this.timeout(0);
    var Chimera = require('chimera').Chimera;
    var c = new Chimera({
      disableImages: true
    });

    c.perform({
      url: auth_url
      , locals: {
        username: process.env['SHOP_USERNAME']
        , password: process.env['SHOP_PASSWORD']
      }
      , run: function(callback) {
        console.log('->Auth-Login Run', document.location);
        try {
          var usernameInput;
          if (window.$ !== undefined) {
            usernameInput = $("login-input");
          }

          if (usernameInput) {
            usernameInput.value = username;
            $("password").value = password;

            var submitButton = $$("form div.actions input.btn")[0];
            chimera.sendEvent('click', submitButton.measure("left") + 10, submitButton.measure("top") + 10);
          }
          else {
            callback(null, document.location);
          }
        }
        catch (e) {
          console.log('->Error in Auth-Login Chimera');
          chimera.capture('./screencaps/error.png');
          console.log(e);
        }
      }
      , callback: function(err, result) {

        auth_cookies = c.cookies();
        Assert.equal(0, result.pathname.indexOf('/admin'));
        Assert.notEqual(-1, auth_cookies.indexOf('_secure_session_id'));

        c.close();
        next();

      }
    });
  });

  //NOTE: We have the callback url for the APP setup in testing-server.js
  //This should be running or this test will fail, since chimera seems to hang
  //when endpoint doesn't exist.
  //@todo fireup http server when running test.
  it("should successfully accept the charge", function(next) {
    this.timeout(0);
    var Chimera = require('chimera').Chimera;
    var c = new Chimera({
      disableImages: true
      , cookies: auth_cookies
    });
    console.log( "\n", 'confirmation_url', confirmation_url );
    c.perform({
      url: decodeURIComponent(confirmation_url)
      , locals: {
        already_clicked: false
      }
      , run: function(callback) {
        try {
          console.log( '->RUN' );
          var pathname = document.location.pathname;
          console.log( 'pathname', pathname );
          if(window && window.jQuery && (pathname.indexOf('charges/confirm_') > -1)) {
            var form = window.jQuery("form")[0];
            if(form) {
              form.submit();
            }
          }
          else {
            callback(null, 'ok');
          }
        }
        catch (e) {
          callback(e, null);
        }
      },
      callback: function(err, result) {
        c.capture("./screencaps/accept-charge-callback.png");
        Assert.ifError(err);
        c.close();
        next();
      }
    });
  });


  it("should successfully execute POST /admin/application_charges/:id/activate.json (activate)", function(next) {
    client.application_charge.activate({
      id: created_test_charge_id
    },
    function(err, res) {
      // console.log(err);
      Assert.ifError(err);
      next();
    });
  });

});