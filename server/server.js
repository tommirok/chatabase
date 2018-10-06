
const express = require("express")
const routes = require("./routes/index")
const bodyParser = require("body-parser")
const userRoute = require("./routes/user")
const topicsRoute = require("./routes/topics")
const messageRoutes = require("./routes/messages")
let app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", routes)

app.use("/user", userRoute)

app.use("/topics", topicsRoute)

app.use("/messages", messageRoutes)

app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}`)
})

