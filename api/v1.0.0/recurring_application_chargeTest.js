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

    beforeEach(function() {
        client = new Client({
            version: "1.0.0"
            ,host: process.env['SHOPIFY_HOST']
            ,token: process.env['SHOPIFY_TOKEN']
            
        });
    });

    it("should successfully execute GET /admin/recurring_application_charges.json (all)",  function(next) {
        client.recurring_application_charge.all(
            {
                since_id: "Number",
                fields: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /admin/recurring_application_charges/:id.json (one)",  function(next) {
        client.recurring_application_charge.one(
            {
                id: "Number",
                fields: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute POST /admin/recurring_application_charges.json (create)",  function(next) {
        client.recurring_application_charge.create(
            {
                recurring_application_charge: "Object"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute POST /admin/recurring_application_charges/:id/activate.json (activate)",  function(next) {
        client.recurring_application_charge.activate(
            {
                id: "Number"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute DELETE /admin/recurring_application_charges/:id/activate.json (cancel)",  function(next) {
        client.recurring_application_charge.cancel(
            {
                id: "Number"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });
});
