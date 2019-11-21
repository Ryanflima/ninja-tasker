const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");
const authenticate = require("../config/middleware/isAuthenticated");

// ROUTES: task
// GET home
routes.get("/home", authenticate, function(req, res) {
  db.Tasks.findAll({
    where: { userID: req.user.id }
  }).then(function(results) {
    // console.log(results);
    res.render("home.ejs", { list: results, user: req.user });
  });
});

// POST /ninja
routes.post("/ninja", function(req, res) {
  // console.log(req.body.taskItem);
  db.Tasks.create({
    todo: req.body.taskItem,
    userID: req.user.id
  }).then(function(results) {
    // console.log(results);
    res.redirect("/home");
  });
});

routes.delete("/delete/:index", function(req, res) {
  console.log(req.params.index);
  db.Tasks.destroy({
    where: { id: req.params.index }
  }).then(function(results) {
    // console.log(results);
    res.redirect("/home");
  });
});

// ROUTES: users

// GET login
routes.get("/user/login", function(req, res) {
  res.render("login.ejs");
});

// POST login
routes.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/user/login"
  })
);

// GET signup
routes.get("/user/signup", function(req, res) {
  res.render("registration.ejs");
});

// POST signup
routes.post(
  "/user/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/user/signup"
  })
);

// GET profile
routes.get("/profile", authenticate, function(req, res) {
  res.render("profile.ejs", { user: req.user });
});

// GET logout
routes.get("/logout", function(req, res) {
  req.logOut();
  res.redirect("/home");
});

module.exports = routes;
