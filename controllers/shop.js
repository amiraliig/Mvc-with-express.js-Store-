const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: "All Products",
            path: '/products'
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
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

exports.postCart = (req, res,next)=>{
    console.log(req.body.productId)
    res.redirect('/')
}