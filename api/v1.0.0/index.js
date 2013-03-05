/**
 *  class Shopify
 *
 *  A Node.JS module, which provides an object oriented wrapper for the Shopify API.
 *
 * Copyright 2013 Mitchell Amihod
 * 
 * Author: Mitchell Amihod <mitchell@amihod.com>
 **/

"use strict";

var Fs = require("fs");
var Util = require("./../../util");
var error = require("./../../error");

var ShopifyHandler = module.exports = function(client) {
    this.client = client;
    this.routes = JSON.parse(Fs.readFileSync(__dirname + "/routes.json", "utf8"));
};

var proto = {
    sendError: function(err, block, msg, callback) {
        Util.log(err, block, msg.user, "error");
        if (typeof err == "string")
            err = new error.InternalServerError(err);
        if (callback)
            callback(err);
    }
};

["products", "application_charge", "recurring_application_charge"].forEach(function(api) {
    Util.extend(proto, require("./" + api));
});

ShopifyHandler.prototype = proto;
