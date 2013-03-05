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

describe("[<%sectionName%>]", function() {
    var client;

    beforeEach(function() {
        client = new Client({
            version: "<%version%>"
            ,host: process.env['SHOPIFY_HOST']
            ,token: process.env['SHOPIFY_TOKEN']
            
        });
    });

<%testBody%>
});
