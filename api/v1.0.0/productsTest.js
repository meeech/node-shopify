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

describe("[products]", function() {
    var client;
    var token = "c286e38330e15246a640c2cf32a45ea45d93b2ba";

    beforeEach(function() {
        client = new Client({
            version: "1.0.0"
        });
        client.authenticate({
            type: "oauth",
            token: token
        });
    });

    it("should successfully execute GET /admin/products.json (all)",  function(next) {
        client.products.all(
            {
                limit: "Number",
                page: "Number",
                since_id: "Number",
                vendor: "String",
                handle: "String",
                product_type: "String",
                collection_id: "Number",
                created_at_min: "Date",
                created_at_max: "Date",
                updated_at_min: "Date",
                updated_at_max: "Date",
                published_at_min: "Date",
                published_at_max: "Date",
                published_status: "String",
                fields: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /admin/products/:id.json (get)",  function(next) {
        client.products.get(
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

    it("should successfully execute GET /admin/products/count.json (count)",  function(next) {
        client.products.count(
            {
                vendor: "String",
                product_type: "String",
                collection_id: "Number",
                created_at_min: "Date",
                created_at_max: "Date",
                updated_at_min: "Date",
                updated_at_max: "Date",
                published_at_min: "Date",
                published_at_max: "Date",
                published_status: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });
});
