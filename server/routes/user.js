const express = require('express')
const router = express.Router()
const Models = require('../models');
const JWT = require("jsonwebtoken")
const User = Models.User;
const bcrypt = require("bcryptjs")
const secret = "tWbln76jYM"
// CREATE USER ==>>
router.post('/', function (req, res, next) {
  console.log(req.body)
  var userToAdd = req.body;
  var hashedPassWord = bcrypt.hashSync(userToAdd.password, 9)
  console.log(hashedPassWord);
  
  User.findOne({
    where: {
      username: userToAdd.username
    }
  })
  .then(e => {
    if (e === null){
      User.create({ 
        username: userToAdd.username,
        password: hashedPassWord
      })
      .then(user => {
        var token = JWT.sign({ username: user.username, userid: user.id }, secret, { expiresIn: 86400 })
        userToAdd = user      
        res.send({status: 200, user:{token: token, auth: true, userData: user}} );
      })
      .catch(err => {
          console.log(err);
        })
    }else {
      res.send({ status: 404, message: "username allready exist" });
    }
  })
  .catch(e => console.log(e)
  )
});
//  <<== CREATE USER 

// AUTHENTICATE ==>>
router.post('/authenticate', function (req, res, next) {
  const userToCheck = req.body;
  console.log(userToCheck);
  
  User.findOne({
    where: {
      username: userToCheck.username
    }
  }).then(user => {
    // user not found
    if(!user) return res.send(404,'No user found.');

    // if no match then return auth: false and token: null
    const ismatch = bcrypt.compareSync(userToCheck.password, user.password);
   if (!ismatch) return res.sendStatus(401, {auth: false, token:null})

   // if password is ok, sign and return token to logging user
    var token = JWT.sign({ username: user.username, userid: user.id }, secret, { expiresIn: 86400 })
    userToAdd = user
    res.send(200, { token: token, auth: true, username: user.username, userId: user.id });
  })
  .catch(err => {
    return res.send(500, {message: 'Error on the server.', error: err});
  })
  
});
// AUTHENTICATE <<====


// GET /users/logged-in
router.get('/logged-in', function (req, res, next) {
  var loggedInId = req.session.userId ? req.session.userId : null;

  if (loggedInId == null) {
    res.json({});
  } else {
    // Hae käyttäjä loggedInId-muuttujan arvon perusteella (Vinkki: findOne)
  }

  res.send(200);
});

// GET /users/logout
router.get('/logout', function (req, res, next) {
  req.session.userId = null;

  res.send(200);
});

module.exports = router;