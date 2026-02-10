const path = require('path')
const Product = require('../models/product')
const fs = require('fs')
const Cart = require("../models/cart");
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
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        res.redirect('/admin/products')
    }).catch(err => console.log(err));

}
exports.getProducts = (req, res, next) => {
    req.user.getProducts()
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
    req.user.getProducts({ where: { id: productId } })
        .then(products => {
            const product = products[0];
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
    req.user.getProducts({ where: { id: productId } }).then(products => {
        const product = products[0];
        if (!product) {
            return res.redirect('/');
        }
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;
        return product.save()
    }).then(() => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    })


}
exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.findByPk(productId).then(product => {
        if (!product) {
            return res.redirect('/')
        }
        return product.destroy();
    }).then(() => {
        return res.redirect('/admin/products')
    }).catch(err => {
        console.log(err)
    })

}
