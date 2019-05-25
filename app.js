var express = require("express");
var app = express(); // express instance

var bodyparser = require("body-parser");
var dbcontext = require('./dbcontext');
var blogrouter = require('./api/blogapi');
var commentapi = require('./api/commentapi');
var productgroup = require('./api/productgroupapi');
var products = require('./api/productsapi');
var fileupload = require('./api/fileupload');
var login = require('./api/login');
//var cors = require('cors');
//app.use(cors);


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use('/api/blog',blogrouter);
app.use('/api/comment',commentapi);
app.use('/api/productgroup',productgroup);
app.use('/api/product',products);
app.use('/picture',fileupload);
app.use('/api/login',login);
//CORS middleware
/*var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}*/
//app.use(allowCrossDomain);
app.use('/api/uploads',express.static(__dirname + '/api/uploads'));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!!');
});

/*app.use(function (req, res, next) {
//console.error(err.stack); 404
    res.status(500).send('SORRY!! wrong UPL');
});*/


app.listen(8086,function(){
    //console.log(path.join(__dirname,'uploads'));
    console.log("listening to port 8086");
})