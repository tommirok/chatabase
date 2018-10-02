var express = require('express');
var router = express.Router();
var Models = require('../models');
const Topic = Models.Topic
// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
router.get('/', function (req, res, next) {
  // Hae kaikki aihealueet tässä (Vinkki: findAll)
  Topic.findAll().then(topics => {
    res.send(200, {topics});
  }).catch(err => {
    console.log(err)
  })
  console.log(req.body);
  
  
});

// GET /topics/:id
router.get('/:id', function (req, res, next) {
  // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
  var topicId = req.params.id;
  res.send(200);
});

// POST /topics
router.post('/', function (req, res, next) {
  // Lisää tämä aihealue
  var topicToAdd = req.body;
  // Palauta vastauksena lisätty aihealue
  res.send(200);
});

// POST /topics/:id/message
router.post('/:id/message', function (req, res, next) {
  // Lisää tällä id:llä varustettuun aihealueeseen...
  var topicId = req.params.id;
  // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
  var messageToAdd = req.body;
  // Palauta vastauksena lisätty viesti
  res.send(200);
});

module.exports = router;