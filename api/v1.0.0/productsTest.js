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

describe("[products]", function() {
    var client;
    var created_product_id; //Set when when we test create product

    beforeEach(function() {
        client = new Client({
            version: "1.0.0"
            ,host: process.env['SHOPIFY_HOST']
            ,token: process.env['SHOPIFY_TOKEN']
            
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

    it("should successfully execute GET /admin/products/count.json (count)",  function(next) {
        client.products.count({},
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.count, 5);
                next();
            }
        );
    });

    it("should successfully execute POST /admin/products.json (create)",  function(next) {
        var title = "Test Product From API"
            ,product_type = "Product Type"
            ;
            
        client.products.create(
            {
                //The absolute minimum to create a product
                product: {
                    title: title
                    ,product_type:product_type
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.product.title, title);
                Assert.equal(res.product.product_type, product_type);
                Assert.ok(res.product.id);
                created_product_id = res.product.id;
                console.log("\nCreated product id: ", res.product.id);
                next();
            }
        );
    });


    it("should successfully execute GET /admin/products/:id.json (one)",  function(next) {
        client.products.one(
            {
                id: created_product_id
                ,fields: "title,handle,id"
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.ok(res.product.title);
                next();
            }
        );
    });

    it("should successfully execute PUT /admin/products/:id.json (update)",  function(next) {
        client.products.update(
            {
                id: created_product_id
                ,product: {
                    published: false 
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.product.published_at, null);
                next();
            }
        );
    });

    it("should successfully execute DELETE /admin/products/:id.json (remove)",  function(next) {
        client.products.remove(
            {
                id: created_product_id
            },
            function(err, res) {
                Assert.equal(err, null);
                console.log("\nDeleted product id: ", created_product_id);
                created_product_id = null;
                next();
            }
        );
    });
  
    
});
