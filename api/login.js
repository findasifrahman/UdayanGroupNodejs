var app = require('express')();
const jwt = require('jsonwebtoken');
var cors = require('cors');
app.use(cors());

app.post('/', function(req, res,next){
    console.log("inside login");
    console.log(req.body);
    var user = req.body.username;
    var pass = req.body.password;

    if(user == "asif" && pass == "123"){
        console.log("milse");
        const payload = { user: user };
        const options = { expiresIn: '2d', issuer: 'localhost:8086' };
        const secret = 'mytoken@asif';
        const token = jwt.sign(payload, secret, options);

        // console.log('TOKEN', token);
        result.token = token;
        result.status = status;
        result.result = user;
        res.status(200).send(result);
    }
    else{
        status = 401;
        result.status = status;
        result.error = `Authentication error`;
        res.status(401).send(result);
    }
})

module.exports = app;