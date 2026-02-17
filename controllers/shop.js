const Product = require('../models/product')

const { where } = require('sequelize')
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
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

    Product.fetchAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: "All Products",
            path: '/'
        })
    }).catch(err => {
        console.log(err)
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
    Product.getProductDetails(prodId).then((product) => {
        console.log(product)
        product = product[0]
        res.render('shop/product-detail', {
            pageTitle: product.title,
            product: product,
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
    const productId = req.body.productId

    req.user.addToCart(productId).then((result) => {
        console.log(result)
        res.redirect("/")
    })


};
exports.getCart = (req, res, next) => {


    req.user.getCart().then(products => {
        res.render('shop/cart', {

            pageTitle: "Your Cart",
            path: '/cart',
            cartProducts: products
        })
        console.log(products)
    }).catch(err => console.log(err))
        .catch(err => console.log(err))


}

exports.cartDeleteItem = (req, res, next) => {
    const productId = req.body.productId

    req.user.deleteFromCart(productId)
        .then((result) => {
            console.log(result)
            res.redirect('/cart')
        }).catch(() => {
            console.log(err)
        })
}
exports.createOrder = (req, res, next) => {
    req.user.addOrder().then(() => {
        res.redirect("/orders")
    })

}
exports.getOrders = (req, res, next) => {
    req.user.getOrder()
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};