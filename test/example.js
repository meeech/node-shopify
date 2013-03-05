/** section: shopify, internal
 *  Example
 * 
 *  Shopify API usage example.
 * 
 **/

var Client = require("./../index");

if(process.env['SHOPIFY_HOST'] === undefined) {
    require('./../env');
}

var shopify = new Client({
  debug: true
  ,version: "1.0.0"
  ,host: process.env['SHOPIFY_HOST']
  //You are responsible for getting the token yourself 
  //I use everyauth for oauth authentication.
  ,token: process.env['SHOPIFY_TOKEN']
});

shopify.products.count({ published_status: 'any'}, function(err, res) {
  if(err) { throw new Error(err); }
  console.log("Result:",res);
});

shopify.products.all({limit:1}, function(err, res) {
  if(err) { throw new Error(err); }
  console.log("Result:",res);
});

shopify.products.one({
  id:22133662
  ,fields: "title,vendor,handle,id"
}, function(err, res) {
  if(err) { throw new Error(err); }
  console.log("Result:",res);
});

shopify.products.update({
  id: 22133662
  ,product: {
    published: false
  }
}, function(err, res) {
  if(err) { throw new Error(err); }
  console.log(res);
});
