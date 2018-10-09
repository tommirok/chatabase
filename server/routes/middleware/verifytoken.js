var jwt = require("jsonwebtoken")
var secret = "tWbln76jYM"
function verifyToken(req, res, next) {
	var token = req.headers["x-access-token"]
	console.log(token)

	if (!token)
		return res.status(403).send({ auth: false, message: "No token provided." })
	jwt.verify(token, secret, function (err, decoded) {
		if (err)
			return res.status(500).send({ auth: false, message: "Failed to authenticate token." })
		// if everything good, save to request for use in other routes

		console.log(decoded)
		req.userName = decoded.username
		req.userId = decoded.userid
		next()
	})
}
module.exports = verifyToken


