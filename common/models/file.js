var CONTAINERS_URL = '/api/containers';

/*
Using a custom function to get the file name to save in
*/

function createFileName(originalName, req, res) {
    console.log("modifiing name of", originalName);
    var d = new Date;
    return "modified-file-name-"+  originalName.originalFilename;
}



module.exports = function(File) {
 File.upload = function (ctx,options,cb) {
     if(!options) options = {};
     options.getFilename = createFileName;
     ctx.req.params.container = 'campaign';
        File.app.models.container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
            if(err) {
                cb(err);
            } else {
                var fileInfo = fileObj.files.file[0];
                File.create({
                    name: fileInfo.name,
                    originalName: fileInfo.name,
                    type: fileInfo.type,
                    container: fileInfo.container,
                    url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
                },function (err,obj) {
                    if (err !== null) {
                        cb(err);
                    } else {
                        cb(null, obj);
                    }
                });
            }
        });
    };

    File.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source:'context' } },
                { arg: 'options', type: 'object', http:{ source: 'query'} }
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {verb: 'post'}
        }
    );
};
