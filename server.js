const responses = require("./routes/route");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/allinputs", responses);
app.use(express.urlencoded({ extended: true }));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGO_URI, options, function (err) {
  if (!err) {
    console.log("Mongodb connected...");
  } else {
    console.log(err);
  }
});

//for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//server
app.listen(port, function () {
  console.log("Express server launched...");
});
