const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.order_get_all = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .then((docs) => {
      if (docs.length) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ message: "No orders found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.order_post = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
      const newOrder = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      newOrder
        .save()
        .then((result) => {
          res.status(201).json({
            message: "Made an order",
            product: result,
          });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      res.status(404).json({ message: "Invalid product ID", error: err });
    });
};

exports.order_get_id = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .populate("product")
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: "Fetched order",
          product: doc,
        });
      } else {
        res.status(404).json({ error: "No order found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.order_patch_id = (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = req.body;
  Order.findByIdAndUpdate(id, updateOps, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(500).json({ error: "No such order" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.order_delete = (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};
