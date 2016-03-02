module.exports = function(Message) {
    Message.getmail = function(user, limit, cb) {
        Message.find({"where": {"to": user}, "limit": limit}, function(err, messages){
            if(err)
                cb(err);
            else
                cb(null, messages);
        });
    };


    Message.remoteMethod(
        'getmail',
        {
            accepts: [{arg: 'user', type: 'string'},{arg: 'limit', type: 'number'}],
            returns: {arg: 'messages', type: 'string'}
        }
    );
};
