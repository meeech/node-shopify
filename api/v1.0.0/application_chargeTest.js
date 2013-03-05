/*
 * Copyright 2012 Cloud9 IDE, Inc.
 *
 * This product includes software developed by
 * Cloud9 IDE, Inc (http://c9.io).
 *
 * Author: Mike de Boer <info@mikedeboer.nl>
 */

"use strict";

var Assert = require("assert");
var Client = require("./../../index");
if(process.env['SHOPIFY_HOST'] === undefined) {
    require('./../../env');
}

describe("[application_charge]", function() {
    var client;

    beforeEach(function() {
        client = new Client({
            version: "1.0.0"
            ,host: process.env['SHOPIFY_HOST']
            ,token: process.env['SHOPIFY_TOKEN']
            
        });
    });

    it("should successfully execute GET /admin/application_charges.json (all)",  function(next) {
        client.application_charge.all(
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

    it("should successfully execute GET /admin/application_charges/:id.json (one)",  function(next) {
        client.application_charge.one(
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

    it("should successfully execute POST /admin/application_charges.json (create)",  function(next) {
        client.application_charge.create(
            {
                application_charge: "Object"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

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
    });
});
