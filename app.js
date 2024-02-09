const express = require("express");
// for spinning up express app
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoute = require("./api/routes/products");
const ordersRoute = require("./api/routes/orders");
const usersRoute = require("./api/routes/users");

mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.MONGO_ATLAS_PW +
      "@express-mongo.nolywxo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => {
    console.log("Mongoose connection failed", err);
  });

// morgan acts as a funnel, takes api request log it and then pass for next things
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

// body parser to parse input request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to avoid cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/users", usersRoute);

// Custom - If api doesnt get into any of the routes specified abve it comes here
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error); // frwrd this err
});

// Even if api goes inside any route, it will be triggered if anywhere error was thrown
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
