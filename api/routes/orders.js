const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const OrderController = require("../controllers/orders");

router.get("/", checkAuth, OrderController.order_get_all);

router.post("/", checkAuth, OrderController.order_post);

router.get("/:orderId", checkAuth, OrderController.order_get_id);

router.patch("/:orderId", checkAuth, OrderController.order_patch_id);

router.delete("/:orderId", checkAuth, OrderController.order_delete);

module.exports = router;
