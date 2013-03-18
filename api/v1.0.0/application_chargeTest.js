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
  var client;
  var created_test_charge_id;
  var confirmation_url;
  var auth_url = "https://" + process.env['SHOPIFY_HOST'] + "/admin/auth";

  beforeEach(function() {
    client = new Client({
      version: "1.0.0",
      host: process.env['SHOPIFY_HOST'],
      token: process.env['SHOPIFY_TOKEN']

    });
  });

  it("should successfully execute POST /admin/application_charges.json (create)", function(next) {
    client.application_charge.create({
      application_charge: {
        name: "Test Application One Time Charge",
        price: "100.00",
        test: true
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
    client.application_charge.all({},

    function(err, res) {
      Assert.equal(err, null);
      Assert.ok(res.application_charges);
      next();
    });
  });

  it("should successfully execute GET /admin/application_charges/:id.json (one)", function(next) {
    client.application_charge.one({
      id: created_test_charge_id,
      fields: "id,name,price,confirmation_url"
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

  it("should successfully accept the charge", function(next) {
    this.timeout(0);
    var Chimera = require('chimera').Chimera;
    var c = new Chimera({
      disableImages: true
    });

    //First, login like normal
    c.perform({
      url: "https://" +
    })
    c.perform({
      url: confirmation_url,
      locals: {
        username: process.env['SHOP_USERNAME'],
        password: process.env['SHOP_PASSWORD']
      },
      run: function(callback) {
        console.log('->Chimera Run');
        console.log(document.location);
        try {
          var usernameInput;

          if (window.$ !== undefined) {
            console.log('->looking up login input');
            var usernameInput = $("login-input");
          }

          if (usernameInput) {
            usernameInput.value = username;
            $("password").value = password;
            chimera.capture("./screencaps/login-page.png");

            var submitButton = $$("form div.actions input.btn")[0];
            chimera.sendEvent('click', submitButton.measure("left") + 10, submitButton.measure("top") + 10);
          }
          else {
            chimera.capture("./screencaps/success.png");
            callback(null, "Success");
          }
        }
        catch (e) {
          console.log('->Error in Chimera');
          chimera.capture('./screencaps/error.png');
          console.log(e);
        }
      },
      callback: function(err, result) {
        console.log('->Chimera Callback');
        console.log(c.cookies());
        c.capture("./screencaps/loggedin-page.png");
        c.close();
        console.log(result);
      }
    });



  });



  it("should successfully execute POST /admin/application_charges/:id/activate.json (activate)", function(next) {
    client.application_charge.activate({
      id: created_test_charge_id
    },

    function(err, res) {
      //Should throw an error, since we have no way to approve a charge yet.
      Assert.equal(err.code, 422);

      next();
    });
  });

});