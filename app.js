const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const port = 3000;
require('dotenv').config();

console.log(process.env);

//express app
const app = express();

//connect to mongodb
const dbURI = process.env.MONGODB_URL;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

//set engine view
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//routes
//index page
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

//redirects to about page
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

//error page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
