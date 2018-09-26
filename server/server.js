
const express = require('express');
const routes = require('./routes/index');
const userRoute = require("./routes/user")
const bodyParser = require('body-parser')

let app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes);

app.use("/user", userRoute);

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

