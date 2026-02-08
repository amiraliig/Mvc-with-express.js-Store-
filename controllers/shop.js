const Product = require('../models/product')
const Cart = require('../models/cart')
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows, field]) => {
        res.render('shop/product-list', {
            prods: rows,
            pageTitle: "All Products",
            path: '/products'
        })
    })
}

exports.getIndex = (req, res, next) => {

    Product.fetchAll().then(([rows, field]) => {
        res.render('shop/product-list', {
            prods: rows,
            pageTitle: "All Products",
            path: '/products'
        })
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

    // Product.fetchAll((products) => {
    //     const product = products.find((p) => String(p.id) === String(prodId));

    //     if (!product) {
    //         return res.status(404).render('404', {
    //             pageTitle: 'Product not found'
    //         });
    //     }

    //     res.render('shop/product-detail', {
    //         pageTitle: product.title,
    //         product: product,
    //         path: '/products'
    //     });
    // });
    Product.fetchProductById(prodId, (product) => {
        if (!product) {
            return res.status(404).render('404', {
                pageTitle: 'Product not found'
            });
        }

        res.render('shop/product-detail', {
            pageTitle: product.title,
            product: product,
            path: '/products'
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