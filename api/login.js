var app = require('express')();
const jwt = require('jsonwebtoken');
var cors = require('cors');
app.use(cors());

app.post('/', function(req, res,next){
    console.log("inside login");
    console.log(req.body);
    var user = req.body.username;
    var pass = req.body.password;
    var result = {};
    if(user == "asif" && pass == "123"){
        console.log("milse");
        const payload = { user: user,role:'admin' };
        const options = { expiresIn: '1h', issuer: 'localhost:8086' };
        const secret = 'mytoken@asif';
        const token = jwt.sign(payload, secret, options);

        // console.log('TOKEN', token);
        result.token = token;
        result.status = 200;
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

module.exports.validateTokenAdmin = (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    console.log('validating');
    console.log(req.headers.authorization.split(' ')[1]);

    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '1h',
        issuer: 'localhost:8086'
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us

        result = jwt.verify(token, 'mytoken@asif', options);
        console.log('validating');
        console.log(result.role);
        if(result.role != "admin"){
          result = { 
            error: `Role Mismatch.`,
            status: 401
          };
          res.status(401).send(result);
          return;
        }
        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        result = { 
            error: `Authentication error. signature mismatch.`,
            status: 401
          };
          res.status(401).send(result);
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
      }
    } else {
      result = { 
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }

  module.exports.validateTokenUser = (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    console.log('validating');
    console.log(req.headers.authorization.split(' ')[1]);

    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '1h',
        issuer: 'localhost:8086'
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us

        result = jwt.verify(token, 'mytoken@asif', options);
        console.log('validating');
        console.log(result.role);
        if(result.role != "user"){
          result = { 
            error: `Role Mismatch.`,
            status: 401
          };
          res.status(401).send(result);
        }
        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        result = { 
            error: `Authentication error. signature mismatch.`,
            status: 401
          };
          res.status(401).send(result);
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
      }
    } else {
      result = { 
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }