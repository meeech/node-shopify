/** section: github, internal
 *  Example
 * 
 *  Github API usage example.
 * 
 *  Copyright 2012 Cloud9 IDE, Inc.
 *
 *  This product includes software developed by
 *  Cloud9 IDE, Inc (http://c9.io).
 *
 *  Author: Mike de Boer <mike@c9.io>
 **/

"use strict";

var Client = require("./../index");

var shopify = new Client({
    debug: true,
    version: "1.0.0"
});

shopify.authenticate({
  type: "oauth"
  ,token: "ccb5ce310b83fc919c26195546118126"
});

shopify.products.count({}, function(err, res) {
  console.log('-> Products Count');
  console.log("Error:",err);
  console.log("Result:",res);
});

shopify.products.count({}, function(err, res) {
  console.log('-> Products Count');
  console.log("Error:",err);
  console.log("Result:",res);
});

shopify.products.get({limit:10}, function(err, res) {
  console.log('-> Products Get');
  console.log("Error:",err);
  console.log("Result:",res);
});
/*
github.authenticate({
    type: "basic",
    username: "mikedeboer",
    password: "mysecretpass"
});

github.user.get({}, function(err, res) {
    console.log("GOT ERR?", err);
    console.log("GOT RES?", res);

    github.repos.getAll({}, function(err, res) {
        console.log("GOT ERR?", err);
        console.log("GOT RES?", res);
    });
});
*/