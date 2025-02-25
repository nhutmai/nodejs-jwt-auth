const express = require('express');
const router = express.Router();
const userRouter = require("./users");
const productRouter = require("./products");
const borrowRouter = require("./borrow");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/borrow", borrowRouter);

module.exports = router;