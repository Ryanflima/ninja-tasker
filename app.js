// packages
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const routes = require("./routes");

// starting express app
const app = express();

//setting view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing manager
app.use(routes);

db.sequelize.sync().then(function() {
  // server listening for request
  app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log("server is liT!!!!!!");
  });
});
