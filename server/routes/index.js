const express = require("express")
const router = express.Router()
var secret = "tWbln76jYM"
router.get("/me", function (req, res, next) {
	var token = req.headers["x-access-token"]
	if (!token) return res.status(401).send({ auth: false, message: "No token provided." })

	jwt.verify(token, secret, function (err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: "Failed to authenticate token." })

		User.findById(decoded.id,
			{ password: 0 }, // projection
			function (err, user) {
				if (err) return res.status(500).send("There was a problem finding the user.")
				if (!user) return res.status(404).send("No user found.")
				// res.status(200).send(user); Comment this out!
				next(user) // add this line
			})
	})
})
// add the middleware function
router.use(function (user, req, res, next) {
	res.status(200).send(user)
})
router.get("/", function (req, res, next) {
	res.send("now then")
})

module.exports = router