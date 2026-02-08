const Product = require('../models/product')
const Cart = require('../models/cart')
const { where } = require('sequelize')
exports.getProducts = (req, res, next) => {

    Product.findAll().then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: "All Products",
            path: '/products'
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.getIndex = (req, res, next) => {

    Product.findAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: "All Products",
            path: '/'
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}
exports.getOrders = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

exports.getChechout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}
exports.getProductDetails = (req, res, next) => {
    const prodId = req.params.id;
    console.log(prodId)


    Product.fetchProductById(prodId).then(([product]) => {
        console.log(product)
        res.render('shop/product-detail', {
            pageTitle: product[0].title,
            product: product[0],
            path: '/products'
        });
    }).catch(err => {
        return res.status(404).render('404', {
            pageTitle: 'Product not found',
            path: "/"
        });
    })

};

exports.postCart = (req, res, next) => {
    Product.fetchProductById(req.body.producId, (product) => {
        Cart.addToCart(req.body.productId, (m) => {
            console.log(m.massage);
            console.log(product)
            return res.redirect(303, '/');

        }, 20);

    })


};
exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        res.render('shop/cart', {
            pageTitle: "Your Cart",
            path: '/cart',
            cartProducts: cart
        })
    })
}

exports.cartDeleteItem = (req, res, next) => {
    const productId = req.body.productId
    Cart.ProductDeleteItem(productId, () => {
        res.redirect('/cart')
    })
}