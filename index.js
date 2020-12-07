// Starting point of the application

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// DB SETUP
mongoose.connect("mongodb://localhost:auth/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// APPLICATION SETUP

// These are middlewares in express.

// Any incoming request would be passed into these

// App.use() registers them as middleware

// A logging framework for logging incoming requests
app.use(morgan("combined"));

// Used to parse incoming requests to JSON
app.use(bodyParser.json({ type: "*/*" }));

router(app);

// SERVER SETUP
const port = process.env.PORT || 3090;
const server = http.createServer(app); //create http server that can receive requests and forward anything coming from it into the express application
server.listen(port);
console.log("Server listening on:", port);
