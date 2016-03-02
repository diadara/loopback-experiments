var fs = require('fs'),
    _ = require('lodash'),
    loopback = require('loopback'),
    path = require('path'),
    async = require('async'),
    debug = require('debug')("seed-data");


module.exports = function(app, next) {
    debug("From the bootscript");
    var Message = loopback.getModel("Message");
    fs.readFile(path.join(path.dirname(__filename),  "./messages.json"), "utf8", function(err, data){
        if(err) throw err;
        var messages = JSON.parse(data);
        debug("read ", messages.length, "messages");

        async.map(messages, function(message, cb){
            Message.upsert(message,cb);
        }, function(err, result){
            debug(err,result);
            debug("finished seeding messages");
        });
    });
    process.nextTick(next);
}
