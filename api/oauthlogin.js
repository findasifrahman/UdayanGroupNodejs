var app = require('express')();
var passport = require('passport');
const jwt = require('jsonwebtoken');
var cors = require('cors');
app.use(cors());

app.get('/',passport.authenticate('google',{
    scope:["profile"]
}))

app.get('/redirect',passport.authenticate('google'),(req,res)=>{
    console.log(req.query);
    var result = {};
    const payload = { user: req.query.code,role:'user' };
    const options = { expiresIn: '1h', issuer: 'localhost:8086' };
    const secret = 'mytoken@asif';
    const token = jwt.sign(payload, secret, options);

    // console.log('TOKEN', token);
    result.token = token;
    result.status = 200;
    result.result = req.query.code;
     res.redirect('http://localhost:4200/oauthlogin?result=' + result.token);
    //res.status(200).send(result);

})

module.exports = app;