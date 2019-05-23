var app = require('express')();
var cors = require('cors');
app.use(cors());

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');


app.post('/', function(req, res,next){
    console.log("inside upload");

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = console.log(path.join(__dirname,'uploads')) + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      })
    })

})

module.exports = app;