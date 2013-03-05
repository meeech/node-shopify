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

describe("[recurring_application_charge]", function() {
    var client;
    var created_test_charge_id;

    beforeEach(function() {
        client = new Client({
            version: "1.0.0"
            ,host: process.env['SHOPIFY_HOST']
            ,token: process.env['SHOPIFY_TOKEN']
            
        });
    });

    it("should successfully execute POST /admin/recurring_application_charges.json (create)",  function(next) {
        client.recurring_application_charge.create(
            {
                recurring_application_charge: {
                    name: "Test Application Recurring Charge"
                    ,price: "10.00"
                    ,test: true
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.ok(res.recurring_application_charge);
                Assert.ok(created_test_charge_id = res.recurring_application_charge.id);

                next();
            }
        );
    });

    it("should successfully execute GET /admin/recurring_application_charges.json (all)",  function(next) {
        client.recurring_application_charge.all(
            {},
            function(err, res) {
                Assert.equal(err, null);
                Assert.ok(res.recurring_application_charges);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /admin/recurring_application_charges/:id.json (one)",  function(next) {
        client.recurring_application_charge.one(
            {
                id: created_test_charge_id,
                fields: "id,name,price,confirmation_url"
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.recurring_application_charge.id, created_test_charge_id);
                Assert.ok(res.recurring_application_charge.name);
                Assert.ok(res.recurring_application_charge.price);
                Assert.ok(res.recurring_application_charge.confirmation_url);
                Assert.ifError(res.recurring_application_charge.status);

                next();
            }
        );
    });

    it("should successfully execute POST /admin/recurring_application_charges/:id/activate.json (activate)",  function(next) {
        client.recurring_application_charge.activate(
            {
                id: created_test_charge_id
            },
            function(err, res) {
                Assert.equal(err.code, 422);

                next();
            }
        );
    });

    it("should successfully execute DELETE /admin/recurring_application_charges/:id.json (cancel)",  function(next) {
        client.recurring_application_charge.cancel(
            {
                id: created_test_charge_id
            },
            function(err, res) {
                Assert.equal(err.code, 422);

                next();
            }
        );
    });
});
