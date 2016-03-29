module.exports = function(Temperature) {


    Temperature.observe('before save', function(ctx, next) {
        console.log('> before save triggered:', ctx.Model.modelName, ctx.instance ||
                    ctx.data);
        next();
    });

    /*
     Inject timestamp if timestamp not present in the temp reading
     */

    Temperature.observe('before save', function(ctx, next) {
        console.log('Injecting timestamp');
        var data = ctx.instance || ctx.data;
        data.timestamp = (new Date).getTime();

        console.log("before save was called",data);

        next();
    });

    Temperature.on("changed",function(instance){
        console.log("changed called", instance);
    });


    Temperature.on('set', function(inst) {
        console.log('set called!', inst.id);
        // => model with id 1 has been changed

    });


    Temperature.observe("after save", function(ctx, next){
        var data = ctx.instance || ctx.data;
        console.log("after save called %j %j %s", data, ctx.isNewInstance, data.hasOwnProperty('value'));

        if(!ctx.isNewInstance){
            console.log("value was changed");
            //do something
        }
        next();
    });
};
