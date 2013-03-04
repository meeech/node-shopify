# JavaScript Shopify API for Node.JS

A Node.JS module, which provides an object oriented wrapper for the Shopify API.

## Installation

  Install with the Node.JS package manager [npm](http://npmjs.org/):

      $ npm install shopify-api

or

  Install via git clone:

      $ git clone git://github.com/meeech/node-shopify.git
      $ cd node-shopify
      $ npm install

## Documentation

You can find the docs for the API of this client at [http://meeech.github.com/node-shopify/](http://meeech.github.com/node-shopify/)

Additionally, the [official Shopify documentation](http://api.shopify.com/)
is a very useful resource.

This module doesn't handle authentication. For that, I use [everyauth](https://github.com/bnoguchi/everyauth) to fetch the token for making requests.

## Example

Fetch all unpublished products.

    var ShopifyApi = require("shopify");

    var shopify = new ShopifyApi({
        // required
        version: "1.0.0",
        host: "SHOPNAME.myshopify.com",
        token: "authtoken",
        // optional
        timeout: 5000
    });
    
    shopify.products.all({
        limit: 5
    }, function(err, res) {
        console.log(res);
    });

## Authentication

This module doesn't handle authentication. For that, I use [everyauth](https://github.com/bnoguchi/everyauth) to fetch the token for making requests.

## Implemented Shopify APIs

* Products: 100%

## Running the Tests

The unit tests are based on the [mocha](http://visionmedia.github.com/mocha/)
module, which may be installed via npm. To run the tests make sure that the
npm dependencies are installed by running `npm install` from the project directory.

Before running unit tests:

    npm install mocha -g

At the moment, test classes can only be run separately. This will e.g. run the Products Api test:

    mocha api/v1.0.0/productsTest.js

Note that a connection to the internet is required to run the tests.

## CREDITS

Based off work of @mikedeboer on the node-github api module [http://github.com/mikedeboer/node-github](http://github.com/mikedeboer/node-github)

## LICENSE

MIT license. See the LICENSE file for details.
