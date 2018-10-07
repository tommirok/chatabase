var express = require("express")
var router = express.Router()
var Models = require("../models")
var verifyToken = require("./middleware/verifytoken")
const Topic = Models.Topic
const Message = Models.Message
// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
//router.use(verifyToken)
router.get("/", function (req, res, next) {
	// Hae kaikki aihealueet tässä (Vinkki: findAll)
	Topic.findAll().then(topics => {
		res.send(200, { topics })
	}).catch(err => {
		console.log(err)
	})
	console.log(req.body)
})

// GET /topics/:id
router.get("/:id", function (req, res, next) {
	// Hae aihealue tällä id:llä tässä (Vinkki: findOne)
	var topicId = req.params.id
	console.log(topicId)
	Topic.findOne({
		where: { id: topicId }
	}).then(topic => {
		res.send(200, { topic })
	})
		.catch(err => {
			console.log(err)

		})
})

// POST /topics
router.post("/", function (req, res, next) {
	// Lisää tämä aihealue
	var topicToAdd = req.body
	console.log(topicToAdd)
	if (!topicToAdd.name) {
		res.send(400, { message: "parameter [name] not present" })
		return
	}
	Topic.findOne({
		where: { name: topicToAdd.name }
	})
		.then((e) => {
			if (!e) {
				Topic.create(topicToAdd)
					.then(topic => {
						res.send(200, { topic })
					})
					.catch(err => {
						console.log(err)

					})
			} else {
				res.send(400, { message: `topic with name ${topicToAdd.name}  already exists` })
			}
		})
		.catch(err => {
			console.log(err)
		})

	// Palauta vastauksena lisätty aihealue

})

// POST /topics/:id/message
router.post("/:id/message", function (req, res, next) {
	// Lisää tällä id:llä varustettuun aihealueeseen...
	var topicId = req.params.id
	// ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
	var messageToAdd = req.body
	if (topicId && messageToAdd) {
		messageToAdd.TopicId = topicId
		console.log(messageToAdd)
		Topic.findOne({
			where: { id: topicId }
		})
			.then(e => {
				if (e) {
					Message.create(messageToAdd)
						.then(msg => {
							res.send(200, { msg })
						})
						.catch(err => {
							console.log(err)

						})
				} else {
					res.send(400, { message: "no topic for present id" })
				}
			})
			.catch(err => {
				console.log(err)
			})
	} else {
		res.send(400, { message: "topicId not present" })
	}
	// Palauta vastauksena lisätty viesti

})

module.exports = router