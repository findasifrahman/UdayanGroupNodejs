var app = require('express')();
var validatetoken = require('./login').validateTokenAdmin;
var cors = require('cors');
app.use(cors());
var productgroupmodel = require('../models/productgroup');
var productmodels = require('../models/productmodels');


app.get("/",function(req,res,next){
    productgroupmodel.findAll({include: [productgroupmodel.products]}).then(result => {
           res.json(result)
           console.log(result)
       })
       .catch(err  => { res.status(400).send(err);console.log(err)});   
})
app.get("/getbyid",function(req,res,next){
    console.log(req.query.id);
    productgroupmodel.findOne({
        where: {
           id: req.query.id
        }
     }).then(result => {
           res.json(result)
           //console.log(result)
       })
       .catch(err  => {res.status(400).send(err);;console.log(err)});   
})
app.post('/',validatetoken, function(req, res,next){
    console.log("inside add");
    console.log(req.body);
    let { groupname } = req.body;
    productgroupmodel.create({
        groupname,
    }
    ).then(result => res.status(200).send(result))
    .catch(err => {res.status(400).send(err);console.log(err);});
})
app.put('/',validatetoken, function(req, res,next){
    console.log("inside update");
    console.log(req.body.Id);

    let { id,groupname } = req.body;
      // Insert into table
      productgroupmodel.update({
        groupname
      },{ where: { id: req.body.Id } })
        .then(result => res.status(200).send(result))
        .catch(err => {res.status(400).send(err);console.log(err)});
})
app.delete('/',validatetoken, (req, res,next) => {
    console.log("inside delete");
    /*productgroupmodel.destroy({
        where: { Id: req.query.id }         
    }).then(result => res.status(200).send({"ok":"ok"}))
    .catch(err => {next(err);console.log(err)});*/
    productgroupmodel.destroy({
        where: { id: req.query.id }         
    }).then(result => {
        productgroupmodel.findAll().then(result => {
            res.json(result)
            //console.log(result)
        })
        .catch(err  => {res.status(400).send(err);console.log(err)}); 
    })
    .catch(err => {res.status(400).send(err);console.log(err)});
});

module.exports = app;