const express = require("express");
const router = express.Router();
const multer = require("multer");

const checkAuth = require("../middleware/checkAuth");
const ProductController = require("../controllers/product");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limit: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", ProductController.product_get);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductController.product_post
);

router.get("/:productId", ProductController.product_get_id);

router.patch("/:productId", checkAuth, ProductController.product_patch_id);

router.delete("/:productId", checkAuth, ProductController.product_delete);

module.exports = router;
