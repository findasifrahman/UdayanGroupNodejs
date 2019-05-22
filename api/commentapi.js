var app = require('express')();
//var blogpostmodel = require('../models/blogpost');
var commentmodel = require('../models/comment');

app.get("/",function(req,res,next){
    commentmodel.findAll().then(result => {
           res.json(result)
           console.log(result)
       })
       .catch(err  => {next(err);console.log(err)});   
})

app.post('/add', function(req, res,next){
    console.log("inside add");
    console.log(req.body);
    let { postId,created, userId,comment } = req.body;
    commentmodel.create({
        postId,
        comment,
        created,
        userId
    }
    ).then(result => res.sendStatus(200))
    .catch(err => {next(err);console.log(err);});
})
app.put('/update', function(req, res,next){
    console.log("inside add");
    console.log(req.query.Id);

    let { postId,created, userId,comment } = req.body;
      // Insert into table
      commentmodel.update({
        postId,
        comment,
        created,
        userId
      },{ where: { Id: req.body.Id } })
        .then(result => res.sendStatus(200))
        .catch(err => {next(err);console.log(err)});
})
app.delete('/delete', (req, res,next) => {
   commentmodel.destroy({
        where: { Id: req.query.Id }         
    }).then(result => res.sendStatus(200))
    .catch(err => {next(err);console.log(err)});
});

module.exports = app;

