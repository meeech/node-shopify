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
  //You are responsible for getting the token yourself 
  //I use everyauth for oauth authentication.
  ,token: "ccb5ce310b83fc919c26195546118126"
});

shopify.products.count({ published_status: 'any'}, function(err, res) {
  if(err) { throw new Error(err); }
  console.log("Result:",res);
});

shopify.products.all({limit:1}, function(err, res) {
  if(err) { throw new Error(err); }
  console.log("Result:",res);
});

shopify.products.get({
  id:22133662
  ,fields: "title,vendor,handle,id"
}, function(err, res) {
  if(err) { throw new Error(err); }
  console.log("Result:",res);
});
