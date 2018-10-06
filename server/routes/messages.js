var express = require("express")
var router = express.Router()
var Models = require("../models")
const Message = Models.Message
const Reply = Models.Reply

// Huom! Kaikki polut alkavat polulla /messages
router.get("/", function (req, res, next) {
	Message.findAll()
		.then(messages => {
			res.send(200, { messages })
		})
		.catch(err => {
			console.log(err)
		})
})
// GET /messages/:id
router.get("/:id", function (req, res, next) {
	// Hae viesti tällä id:llä ja siihen liittyvät vastaukset tässä (Vinkki: findOne ja sopiva include)
	var messageId = req.params.id
	Message.findOne({
		where: { id: messageId},
		include: [{
			model: Reply,
			where: { MessageId: messageId },
			required: false
		}]
	})
		.then(msg => {
			if(!msg){
				res.send(400, {error: "message with present id not found"})
				return
			}
			res.send(200, {msg})
		})
		.catch(err => {
			res.send(400, { err })
		})
})
// POST /messages/:id/reply
router.post("/:id/reply", function (req, res, next) {
	// Lisää tällä id:llä varustettuun viestiin...
	var messageId = req.params.id
	// ...tämä vastaus (Vinkki: lisää ensin replyToAdd-objektiin kenttä MessageId, jonka arvo on messageId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
	var replyToAdd = req.body
	if (messageId && replyToAdd) {
		replyToAdd.MessageId = messageId
		console.log(replyToAdd)
		Reply.findOne({
			where: { id: messageId }
		})
			.then(e => {
				if (e) {
					Reply.create(replyToAdd)
						.then(rep => {
							res.send(200, { rep })
						})
						.catch(err => {
							console.log(err)

						})
				} else {
					res.send(400, { error: "no Reply found for present id" })
				}
			})
			.catch(err => {
				console.log(err)
			})
	} else {
		res.send(400, { error: "messageId not present" })
	}
	// Palauta vastauksena lisätty vastaus
})
module.exports = router
