//Rename this file to env.js
//Sets up process.env values for running tests and example so we don't have to
//commit to repo
process.env['SHOPIFY_HOST'] = "SHOP-NAME.myshopify.com";
//This is the token you would get back from authenticating against an app,
//or you can also use the Password from a Private Application, but then things
//like Application Charge won't work. 
process.env['SHOPIFY_TOKEN'] = "yourauthtokenhere";

//Used for testing.
process.env['SHOP_USERNAME'] = "SHOPIFY_HOST_USERNAME";
process.env['SHOP_PASSWORD'] = "SHOPIFY_HOST_PASSWORD";
