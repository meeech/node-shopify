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

describe("[<%sectionName%>]", function() {
    var client;

    beforeEach(function() {
        client = new Client({
            version: "<%version%>"
            ,host: "klocko-and-sons3230.myshopify.com"
            ,token: "ccb5ce310b83fc919c26195546118126"
            
        });
    });

<%testBody%>
});
