const path = require('path');
const express = require('express');
const shopConroller = require("../controllers/shop")

const router = express.Router()

router.get("/", shopConroller.getIndex)
router.get("/products", shopConroller.getProducts)
router.get("/cart", shopConroller.getCart)
router.get("/checkout", shopConroller.getChechout);
router.get("/orders", shopConroller.getOrders)
router.get("/products/:id", shopConroller.getProductDetails)
router.post('/cart', shopConroller.postCart)
module.exports = router;