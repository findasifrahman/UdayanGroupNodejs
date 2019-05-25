var app = require('express')();

var cors = require('cors');
app.use(cors());
var productmodel = require('../models/productmodels');

app.get("/",function(req,res,next){
    productmodel.findAll().then(result => {
           res.json(result)
           //console.log(result)
       }).catch(err  => {next(err);console.log(err)});   
})
app.get("/getbyid",function(req,res,next){
    console.log(req.query.id);
    productmodel.findOne({
        where: {
           Id: req.query.id
        }
     }).then(result => {
           res.json(result)
           //console.log(result)
       }).catch(err  => {next(err);console.log(err)});   
})
app.get("/getbygroup",function(req,res,next){
    console.log(req.query.group);
    productmodel.findAll({
        where: {
           productgroup: req.query.group
        }
     }).then(result => {
           res.json(result)
           //console.log(result)
       }).catch(err  => {next(err);console.log(err)});   
})
app.post('/', function(req, res,next){
    console.log("inside add");
    console.log(req.body);
    let { productname,producttitle,productgroup,productmeta,productseo,description,offer,otherinfo,
        price,image1,image2,image3,image4 } = req.body;
    productmodel.create({
        productname,producttitle,productgroup,productmeta,productseo,description,offer,otherinfo,
        price,image1,image2,image3,image4
    }
    ).then(result => res.status(200).send(result))
    .catch(err => {next(err);console.log(err);});
})
app.put('/', function(req, res,next){
    console.log("inside update");
    console.log(req.body.Id);
    console.log(req.body);

    let { Id,productname,producttitle,productgroup,productmeta,productseo,description,offer,otherinfo,
        price,image1,image2,image3,image4 } = req.body;
      // Insert into table
      productmodel.update({
        productname,producttitle,productgroup,productmeta,productseo,description,offer,otherinfo,
        price,image1,image2,image3,image4
      },{ where: { Id: req.body.Id } })
        .then(result => res.status(200).send(result))
        .catch(err => {next(err);console.log(err)});
})
app.delete('/', (req, res,next) => {
    console.log("inside delete");
    /*productgroupmodel.destroy({
        where: { Id: req.query.id }         
    }).then(result => res.status(200).send({"ok":"ok"}))
    .catch(err => {next(err);console.log(err)});*/
    productmodel.destroy({
        where: { Id: req.query.id }         
    }).then(result => {
        productmodel.findAll().then(result => {
            res.json(result)
            //console.log(result)
        })
        .catch(err  => {next(err);console.log(err)}); 
    })
    .catch(err => {next(err);console.log(err)});
});

module.exports = app;