var app = require('express')();

var cors = require('cors');
app.use(cors());
var productgroupmodel = require('../models/productgroup');


app.get("/",function(req,res,next){
    productgroupmodel.findAll().then(result => {
           res.json(result)
           console.log(result)
       })
       .catch(err  => {next(err);console.log(err)});   
})
app.get("/getbyid",function(req,res,next){
    console.log(req.query.id);
    productgroupmodel.findOne({
        where: {
           Id: req.query.id
        }
     }).then(result => {
           res.json(result)
           console.log(result)
       })
       .catch(err  => {next(err);console.log(err)});   
})
app.post('/', function(req, res,next){
    console.log("inside add");
    console.log(req.body);
    let { groupname } = req.body;
    productgroupmodel.create({
        groupname,
    }
    ).then(result => res.status(200).send(result))
    .catch(err => {next(err);console.log(err);});
})
app.put('/', function(req, res,next){
    console.log("inside update");
    console.log(req.query.id);

    let { groupname } = req.body;
      // Insert into table
      productgroupmodel.update({
        groupname
      },{ where: { Id: req.body.id } })
        .then(result => res.status(200).send(result))
        .catch(err => {next(err);console.log(err)});
})
app.delete('/', (req, res,next) => {
    console.log("inside delete");
    /*productgroupmodel.destroy({
        where: { Id: req.query.id }         
    }).then(result => res.status(200).send({"ok":"ok"}))
    .catch(err => {next(err);console.log(err)});*/
    productgroupmodel.destroy({
        where: { Id: req.query.id }         
    }).then(result => {
        productgroupmodel.findAll().then(result => {
            res.json(result)
            console.log(result)
        })
        .catch(err  => {next(err);console.log(err)}); 
    })
    .catch(err => {next(err);console.log(err)});
});

module.exports = app;