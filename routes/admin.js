const path = require('path');

const isAuth = require("../middleware/is-auth")
const isAdmin = require("../middleware/is-admin")
const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')

router.get('/add-product', isAuth, isAdmin, adminController.getAddProducts);

router.post('/add-product', isAuth, isAdmin, adminController.postAddProducts)

router.get('/products', isAuth, isAdmin, adminController.getProducts)

router.get('/editProduct/:productId', isAdmin, isAuth, adminController.getEditProduct)

router.post('/editProduct/:productId', isAdmin, isAuth, adminController.postEditProduct)

router.post('/deleteProduct/:productId', isAdmin, isAuth, adminController.deleteProduct)

module.exports = router