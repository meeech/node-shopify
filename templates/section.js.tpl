/**
 *  mixin <%sectionName%>
 *
 * Copyright 2013 Mitchell Amihod
 * 
 * Author: Mitchell Amihod <mitchell@amihod.com>
 **/

"use strict";

var error = require("./../../error");
var Util = require("./../../util");

var <%sectionName%> = module.exports = {
    <%sectionName%>: {}
};

(function() {
<%sectionBody%>
}).call(<%sectionName%>.<%sectionName%>);
