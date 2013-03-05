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
    
    beforeEach(function() {
        client = new Client({
            version: "1.0.0"
            ,host: process.env['SHOPIFY_HOST']
            ,token: process.env['SHOPIFY_TOKEN']
            
        });
    });

    it("should successfully execute POST /admin/application_charges.json (create)",  function(next) {
        client.application_charge.create(
            {
                application_charge: {
                    name: "Test Application One Time Charge"
                    ,price: "100.00"
                    ,test: true
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.ok(res.application_charge);
                Assert.ok(created_test_charge_id = res.application_charge.id);
                //Can we:
                    //grab the confirmation_url
                    //parse out the form
                    //Use the info from form to POST accept
                next();
            }
        );
    });


    it("should successfully execute GET /admin/application_charges.json (all)",  function(next) {
        client.application_charge.all(
            {},
            function(err, res) {
                Assert.equal(err, null);
                next();
            }
        );
    });

    it("should successfully execute GET /admin/application_charges/:id.json (one)",  function(next) {
        client.application_charge.one(
            {
                id: created_test_charge_id,
                fields: "id,name,price,confirmation_url"
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.application_charge.id, created_test_charge_id);
                Assert.ok(res.application_charge.name);
                Assert.ok(res.application_charge.price);
                Assert.ok(res.application_charge.confirmation_url);
                Assert.ifError(res.application_charge.status);
                next();
            }
        );
    });

/*
    it("should successfully execute POST /admin/application_charges/:id/activate.json (activate)",  function(next) {
        client.application_charge.activate(
            {
                id: "Number",
                application_charge: "Object"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });*/

});
