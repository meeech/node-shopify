<%comment%>
    this.<%funcName%> = function(msg, block, callback) {
        var self = this;
        this.client.httpSend(msg, block, function(err, res) {
            if (err)
                return self.sendError(err, null, msg, callback);

            var ret;
            try {
                //@bug This is to work around a problem with Shopify API
                //API doesn't always return valid JSON, even with a 200 response
                //so detect, and modify. 
                if(res.statusCode === 200 && res.data === ' ') {
                    res.data = '{}';
                }

                ret = res.data && JSON.parse(res.data);
            }
            catch (ex) {
                if (callback)
                    callback(new error.InternalServerError(ex.message), res);
                return;
            }
<%afterRequest%>
            if (callback)
                callback(null, ret);
        });
    };
