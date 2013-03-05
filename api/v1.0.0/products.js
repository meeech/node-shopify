/**
 *  mixin products
 *
 *  Copyright 2012 Cloud9 IDE, Inc.
 *
 *  This product includes software developed by
 *  Cloud9 IDE, Inc (http://c9.io).
 *
 *  Author: Mike de Boer <info@mikedeboer.nl>
 **/

"use strict";

var error = require("./../../error");
var Util = require("./../../util");

var products = module.exports = {
    products: {}
};

(function() {
    /** section: shopify
     *  products#all(msg, callback) -> null
     *      - msg (Object): Object that contains the parameters and their values to be sent to the server.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     * 
     *  ##### Params on the `msg` object:
     * 
     *  - limit (Number): Optional. Amount of results (default: 50) (maximum: 250) Validation rule: ` ^[0-9]+$ `.
     *  - page (Number): Optional. Page to show (default: 1) Validation rule: ` ^[0-9]+$ `.
     *  - since_id (Number): Optional. Restrict results to after the specified ID Validation rule: ` ^[0-9]+$ `.
     *  - vendor (String): Optional. Filter by product vendor 
     *  - handle (String): Optional. Filter by handle 
     *  - product_type (String): Optional. Filter by product type 
     *  - collection_id (Number): Optional. Filter by collection ID Validation rule: ` ^[0-9]+$ `.
     *  - created_at_min (Date): Optional. Show item created after date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - created_at_max (Date): Optional. Show item created before date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - updated_at_min (Date): Optional. Show item last updated after date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - updated_at_max (Date): Optional. Show item last updated before date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - published_at_min (Date): Optional. Show item published after date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - published_at_max (Date): Optional. Show item published before date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - published_status (String): Optional. Filter by published_status published|unpublished|any (default: any) Validation rule: ` ^(published|unpublished|any)$ `.
     *  - fields (String): Optional. Comma-seperated list of fields to include in the response 
     **/
    this.all = function(msg, block, callback) {
        var self = this;
        this.client.httpSend(msg, block, function(err, res) {
            if (err)
                return self.sendError(err, null, msg, callback);

            var ret;
            try {
                ret = res.data && JSON.parse(res.data);
            }
            catch (ex) {
                if (callback)
                    callback(new error.InternalServerError(ex.message), res);
                return;
            }
            
            if (!ret)
                ret = {};
            if (!ret.meta)
                ret.meta = {};
            ["x-shopify-shop-api-call-limit"].forEach(function(header) {
                if (res.headers[header])
                    ret.meta[header] = res.headers[header];
            });
            
            if (callback)
                callback(null, ret);
        });
    };

    /** section: shopify
     *  products#one(msg, callback) -> null
     *      - msg (Object): Object that contains the parameters and their values to be sent to the server.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     * 
     *  ##### Params on the `msg` object:
     * 
     *  - id (Number): Required. ID of item.  Validation rule: ` ^[0-9]+$ `.
     *  - fields (String): Optional. Comma-seperated list of fields to include in the response 
     **/
    this.one = function(msg, block, callback) {
        var self = this;
        this.client.httpSend(msg, block, function(err, res) {
            if (err)
                return self.sendError(err, null, msg, callback);

            var ret;
            try {
                ret = res.data && JSON.parse(res.data);
            }
            catch (ex) {
                if (callback)
                    callback(new error.InternalServerError(ex.message), res);
                return;
            }
            
            if (!ret)
                ret = {};
            if (!ret.meta)
                ret.meta = {};
            ["x-shopify-shop-api-call-limit"].forEach(function(header) {
                if (res.headers[header])
                    ret.meta[header] = res.headers[header];
            });
            
            if (callback)
                callback(null, ret);
        });
    };

    /** section: shopify
     *  products#count(msg, callback) -> null
     *      - msg (Object): Object that contains the parameters and their values to be sent to the server.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     * 
     *  ##### Params on the `msg` object:
     * 
     *  - vendor (String): Optional. Filter by product vendor 
     *  - product_type (String): Optional. Filter by product type 
     *  - collection_id (Number): Optional. Filter by collection ID Validation rule: ` ^[0-9]+$ `.
     *  - created_at_min (Date): Optional. Show item created after date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - created_at_max (Date): Optional. Show item created before date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - updated_at_min (Date): Optional. Show item last updated after date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - updated_at_max (Date): Optional. Show item last updated before date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - published_at_min (Date): Optional. Show item published after date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - published_at_max (Date): Optional. Show item published before date (format: 2008-01-01 03:00 (Assumes UTC) or 2008-01-10T11:00:00-05:00) 
     *  - published_status (String): Optional. Filter by published_status published|unpublished|any (default: any) Validation rule: ` ^(published|unpublished|any)$ `.
     **/
    this.count = function(msg, block, callback) {
        var self = this;
        this.client.httpSend(msg, block, function(err, res) {
            if (err)
                return self.sendError(err, null, msg, callback);

            var ret;
            try {
                ret = res.data && JSON.parse(res.data);
            }
            catch (ex) {
                if (callback)
                    callback(new error.InternalServerError(ex.message), res);
                return;
            }
            
            if (!ret)
                ret = {};
            if (!ret.meta)
                ret.meta = {};
            ["x-shopify-shop-api-call-limit"].forEach(function(header) {
                if (res.headers[header])
                    ret.meta[header] = res.headers[header];
            });
            
            if (callback)
                callback(null, ret);
        });
    };

    /** section: shopify
     *  products#create(msg, callback) -> null
     *      - msg (Object): Object that contains the parameters and their values to be sent to the server.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     * 
     *  ##### Params on the `msg` object:
     * 
     *  - product (Object): Required. Product object 
     **/
    this.create = function(msg, block, callback) {
        var self = this;
        this.client.httpSend(msg, block, function(err, res) {
            if (err)
                return self.sendError(err, null, msg, callback);

            var ret;
            try {
                ret = res.data && JSON.parse(res.data);
            }
            catch (ex) {
                if (callback)
                    callback(new error.InternalServerError(ex.message), res);
                return;
            }
            
            if (!ret)
                ret = {};
            if (!ret.meta)
                ret.meta = {};
            ["x-shopify-shop-api-call-limit"].forEach(function(header) {
                if (res.headers[header])
                    ret.meta[header] = res.headers[header];
            });
            
            if (callback)
                callback(null, ret);
        });
    };

    /** section: shopify
     *  products#update(msg, callback) -> null
     *      - msg (Object): Object that contains the parameters and their values to be sent to the server.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     * 
     *  ##### Params on the `msg` object:
     * 
     *  - id (Number): Required. ID of item.  Validation rule: ` ^[0-9]+$ `.
     *  - product (Object): Required. Product object 
     **/
    this.update = function(msg, block, callback) {
        var self = this;
        this.client.httpSend(msg, block, function(err, res) {
            if (err)
                return self.sendError(err, null, msg, callback);

            var ret;
            try {
                ret = res.data && JSON.parse(res.data);
            }
            catch (ex) {
                if (callback)
                    callback(new error.InternalServerError(ex.message), res);
                return;
            }
            
            if (!ret)
                ret = {};
            if (!ret.meta)
                ret.meta = {};
            ["x-shopify-shop-api-call-limit"].forEach(function(header) {
                if (res.headers[header])
                    ret.meta[header] = res.headers[header];
            });
            
            if (callback)
                callback(null, ret);
        });
    };

    /** section: shopify
     *  products#remove(msg, callback) -> null
     *      - msg (Object): Object that contains the parameters and their values to be sent to the server.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     * 
     *  ##### Params on the `msg` object:
     * 
     *  - id (Number): Required. ID of item.  Validation rule: ` ^[0-9]+$ `.
     **/
    this.remove = function(msg, block, callback) {
        var self = this;
        this.client.httpSend(msg, block, function(err, res) {
            if (err)
                return self.sendError(err, null, msg, callback);

            var ret;
            try {
                ret = res.data && JSON.parse(res.data);
            }
            catch (ex) {
                if (callback)
                    callback(new error.InternalServerError(ex.message), res);
                return;
            }
            
            if (!ret)
                ret = {};
            if (!ret.meta)
                ret.meta = {};
            ["x-shopify-shop-api-call-limit"].forEach(function(header) {
                if (res.headers[header])
                    ret.meta[header] = res.headers[header];
            });
            
            if (callback)
                callback(null, ret);
        });
    };

}).call(products.products);
