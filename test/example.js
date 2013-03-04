/** section: shopify, internal
 *  Example
 * 
 *  Shopify API usage example.
 * 
 **/

var Client = require("./../index");

var shopify = new Client({
    debug: true
    ,version: "1.0.0"
    ,host: "klocko-and-sons3230.myshopify.com"
});

//You are responsible for getting the token yourself. 
//I use everyauth for oauth authentication.
shopify.authenticate({
  type: "oauth"
  ,token: "ccb5ce310b83fc919c26195546118126"
});

shopify.products.count({}, function(err, res) {
  if(err) {
    console.log("Error:",err);
    return;
  }
  console.log("Result:",res);
});

shopify.products.get({limit:3}, function(err, res) {
  if(err) {
    console.log("Error:",err);
    return;
  }
  console.log("Result:",res);
});
