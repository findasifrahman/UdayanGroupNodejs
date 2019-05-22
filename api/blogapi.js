var app = require('express')();
var multer  = require('multer')();

var cors = require('cors');
app.use(cors);
var blogpostmodel = require('../models/blogpost');
var commentmodel = require('../models/comment');

app.get("/",function(req,res,next){
    blogpostmodel.findAll({
        include: [blogpostmodel.coms ]    
      }).then(result => {
           res.json(result)
           console.log(result)
       })
       .catch(err  => {next(err);console.log(err)});   
})

app.post('/add', function(req, res,next){
    console.log("inside add");
    console.log(req.body.comments);
    let { title, author, description, created, userId,comments } = req.body;
    if(req.body.comments != null){
        return blogpostmodel.create({
            title,
            author,
            description,
            created,
            userId,
            comments,
        }, {
            include: [blogpostmodel.coms ]
        }
        )//.then(result => res.sendStatus(200))
        //.catch(err => {next(err);console.log(err);});
    }
    else{
        return blogpostmodel.create({
            title,
            author,
            description,
            created,
            userId
        }
        )//.then(result => res.sendStatus(200))
        //.catch(err => {next(err);console.log(err);}); 
    }
})
app.put('/update', function(req, res,next){
    console.log("inside add");
    console.log(req.query.Id);
    // update with foreign key delete then update
    
    //
    let { Id,title, author, description, created, userId } = req.body;
      // Insert into table
      blogpostmodel.update({
        Id,
        title,
        author,
        description,
        created,
        userId
      },{ where: { Id: req.body.Id } })
        .then(result => res.sendStatus(200))
        .catch(err => {next(err);console.log(err)});
})
app.delete('/delete', (req, res,next) => {
    // to delete ascociated record on postgres you have to set onDelete: CASCADE option in pgAdmin foreign ket field
    blogpostmodel.destroy({
        where: { Id: req.query.Id }         
    }).then(result => res.sendStatus(200))
    .catch(err => {next(err);console.log(err)});
});

module.exports = app;

