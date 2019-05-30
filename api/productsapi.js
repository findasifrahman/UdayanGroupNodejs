var app = require('express')();
var validatetoken = require('./login').validateToken;

var cors = require('cors');
app.use(cors());
var productmodel = require('../models/productmodels');

app.get("/",function(req,res,next){
    productmodel.findAll().then(result => {
           res.json(result)
           //console.log(result)
       }).catch(err  => {res.status(400).send(err);console.log(err)});   
})
app.get("/getbyid",validatetoken,function(req,res,next){
    console.log(req.query.id);
    productmodel.findOne({
        where: {
           id: req.query.id
        }
     }).then(result => {
           res.json(result)
           //console.log(result)
       }).catch(err  => {res.status(400).send(err);console.log(err)});   
})
app.get("/getbygroup",function(req,res,next){
    console.log(req.query.group);
    productmodel.findAll({
        where: {
            productgroupId: req.query.group
        }
     }).then(result => {
           res.json(result)
           //console.log(result)
       }).catch(err  => {console.log(err);res.status(400).send(err)});   
})
app.post('/',validatetoken, function(req, res,next){
    console.log("inside add");
    console.log(req.body);
    let { productname,producttitle,productgroupId,productmeta,productseo,description,offer,otherinfo,
        price,image1,image2,image3,image4 } = req.body;
    productmodel.create({
        productname,producttitle,productgroupId,productmeta,productseo,description,offer,otherinfo,
        price,image1,image2,image3,image4
    }
    ).then(result => res.status(200).send(result))
    .catch(err => {res.status(400).send(err);console.log(err);});
})
app.put('/',validatetoken, function(req, res,next){
    console.log("inside update");
    console.log(req.body.Id);
    console.log(req.body);

    let { id,productname,producttitle,productgroupId,productmeta,productseo,description,offer,otherinfo,
        price,image1,image2,image3,image4 } = req.body;
      // Insert into table
      productmodel.update({
        productname,producttitle,productgroupId,productmeta,productseo,description,offer,otherinfo,
        price,image1,image2,image3,image4
      },{ where: { id: req.body.Id } })
        .then(result => res.status(200).send(result))
        .catch(err => {res.status(400).send(err);console.log(err)});
})
app.delete('/',validatetoken, (req, res,next) => {
    console.log("inside delete");

    productmodel.destroy({
        where: { id: req.query.id }         
    }).then(result => {
        productmodel.findAll().then(result => {
            res.json(result)
            //console.log(result)
        })
        .catch(err  => {res.status(400).send(err);;console.log(err)}); 
    })
    .catch(err => {res.status(400).send(err);console.log(err)});
});

module.exports = app;