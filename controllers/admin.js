const path = require('path')
const Product = require('../models/product')
const fs = require('fs')
exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}
exports.postAddProducts = (req, res, next) => {

    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(title, imageUrl, price, description)
    product.save()
    res.redirect('/')
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productsCss: true,
        })
    })

}
exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    const editMode = req.query.edit
    Product.fetchProductById(productId, (product) => {
        res.render('admin/edit-product', {
            pageTitle: product.title,
            product: product,
            editing: editMode,
            path: "/admin"
        })
    })

}

exports.postEditProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.editProduct(productId, { title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description }, () => {
        res.redirect('/')
    })

}
exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId
    console.log(productId)
    Product.deleteProduct(productId, () => {
        res.redirect('/')
    })
}
