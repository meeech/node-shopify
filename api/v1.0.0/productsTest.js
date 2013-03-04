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

    beforeEach(function() {
        client = new Client({
            version: "1.0.0"
            ,host: "klocko-and-sons3230.myshopify.com"
            ,token: "ccb5ce310b83fc919c26195546118126"
            
        });
    });

    it("should successfully execute GET /admin/products.json (all)",  function(next) {
        var limit = 5;
        client.products.all(
            {
              limit: limit
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.products.length, limit);
                next();
            }
        );
    });

    it("should successfully execute GET /admin/products/:id.json (one)",  function(next) {
        client.products.one(
            {
                id: "22133662"
                ,fields: "title,handle,id"
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.product.title, 'all-content');
                Assert.equal(res.product.handle, 'all-content');
                next();
            }
        );
    });

    it("should successfully execute GET /admin/products/count.json (count)",  function(next) {
        client.products.count({},
            function(err, res) {
                Assert.equal(err, null);
                Assert.notEqual(res.count, undefined);
                next();
            }
        );
    });
});
