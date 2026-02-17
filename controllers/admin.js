const path = require('path')
const Product = require('../models/product')
const fs = require('fs')
const product = require('../models/product')

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
    const newProduct = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl
    })
    newProduct.save()
        .then(result => {
            res.redirect('/admin/products')
        }).catch(err => console.log(err));

}
exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Shop',
                path: '/admin/products',
                hasProducts: products.length > 0,
                activeShop: true,
                productsCss: true,
            })
        })
        .catch(err =>
            console.log(err)
        )


}
exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    const editMode = req.query.edit
    Product.findById(productId)
        .then(product => {
            res.render('admin/edit-product', {
                pageTitle: product.title,
                product: product,
                editing: editMode,
                path: "/admin"
            })
        })
        .catch(err => {
            console.log(err)
        })

}

exports.postEditProduct = (req, res, next) => {
    const productId = req.params.productId
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findById(productId).then(product => {
        product.title = updatedTitle
        product.price = updatedPrice
        product.description = updatedDescription
        product.imageUrl = updatedImageUrl
        return product.save()
    })
        .then(() => {
            return res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        })
    // Product.updateById(productId, { updatedTitle, updatedPrice, updatedDescription, updatedImageUrl })

}
exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.findByIdAndDelete(productId).then(() => {
        return res.redirect('/admin/products')
    }).catch(err => {
        console.log(err)
    })

}

