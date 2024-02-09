const mongoose = require("mongoose");

// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection
// and defines the shape of the documents within that collection
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

// Models are fancy constructors compiled from Schema definitions.
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB database.
module.exports = mongoose.model("Product", productSchema);
