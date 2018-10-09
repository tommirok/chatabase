
const express = require("express")
const path = require("path")
const routes = require("./routes/index")
const bodyParser = require("body-parser")
const userRoute = require("./routes/user")
const topicsRoute = require("./routes/topics")
const messageRoutes = require("./routes/messages")
let app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use("public", express.static(path.join(__dirname, "../client/build")))
//app.use("build", express.static(path.join(__dirname, "../client/public")))

app.use("/", routes)

app.use("/user", userRoute)

app.use("/topics", topicsRoute)

app.use("/messages", messageRoutes)

app.use(express.static(path.join((__dirname, "../client/build"))))

app.get(/app.*/, function (req, res, next) {
	res.sendFile(path.resolve((__dirname, "../client/build/index.html")))
})
app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}`)
})

