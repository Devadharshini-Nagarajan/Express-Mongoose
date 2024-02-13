const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Mail already exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              err: err,
            });
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            newUser
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                  user: result,
                });
              })
              .catch((err) => {
                next(err);
              });
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth failed",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(404).json({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
            });
          }

          res.status(404).json({
            message: "Auth failed",
          });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.user_delete = (req, res, next) => {
  const id = req.params.userId;
  User.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};
