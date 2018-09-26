const express = require('express')
const router = express.Router()
const Models = require('../models');
const JWT = require("jsonwebtoken")
const User = Models.User;
const bcrypt = require("bcryptjs")
// CREATE USER ==>>
router.post('/', function (req, res, next) {
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
        var token = JWT.sign({ username: user.username, userid: user.id }, "tWbln76jYM", { expiresIn: 86400 })
        userToAdd = user
        res.send(200, {token: token, auth: true, username: user.username, userId: user.id} );
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
  // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
  var userToCheck = req.body;
  res.sendStatus(200);
});

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