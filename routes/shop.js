const path = require('path');
const express = require('express');
const shopConroller = require("../controllers/shop")
const isAuth = require('../middleware/is-auth')
const router = express.Router()

router.get("/", shopConroller.getIndex)
router.get("/products", shopConroller.getProducts)
router.get("/cart", isAuth, shopConroller.getCart)
router.get("/checkout", isAuth, shopConroller.getChechout);
router.get('/orders', isAuth, shopConroller.getOrders)
router.get("/products/:id", shopConroller.getProductDetails)
router.post('/cart', isAuth, shopConroller.postCart)
router.get('/cart', isAuth, shopConroller.getCart)
router.post('/cart-delete-item/', isAuth, shopConroller.cartDeleteItem)
router.post('/create-order', isAuth, shopConroller.createOrder)

module.exports = router;