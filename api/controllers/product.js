const Product = require("../models/product");
const mongoose = require("mongoose");


exports.product_get = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .then((docs) => {
      if (docs.length) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ message: "No products found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.product_post = (req, res, next) => {
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file?.path,
  });
  newProduct
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Added new product",
        product: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.product_get_id = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: "Fetched product",
          product: doc,
        });
      } else {
        res.status(404).json({ error: "No product found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.product_patch_id = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = req.body;
  Product.findByIdAndUpdate(id, updateOps, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(500).json({ error: "No such product" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.product_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};
