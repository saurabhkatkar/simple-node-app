var express = require("express");
var bodyParser = require("body-parser");

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/register");

// var db = mongoose.connection;
// db.on("error", console.log.bind(console, "failed to connect mongodb"));
// db.once("open", function(callback) {
//   console.log("connected to mongodb");
// });

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post("/sign_up", function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;

  var data = {
    name: name,
    email: email,
    phone: phone,
    time: new Date(),
    ua: req.get("user-agent")
  };

  db.collection("details").insertOne(data, function(err, collection) {
    if (err) {
      console.log(
        "failed to insert",
        name,
        email,
        phone,
        req.get("user-agent")
      );
      console.error("failed to insert error", err);
      throw err;
    }
    console.log("inserted", name, email, phone, req.get("user-agent"));
  });

  return res.redirect("success.html");
});

const PORT = 4000;

app
  .get("/", function(req, res) {
    res.set({
      "Access-control-Allow-Origin": "*"
    });
    return res.redirect("index.html");
  })
  .listen(PORT);

console.log("server listening at port", PORT);
