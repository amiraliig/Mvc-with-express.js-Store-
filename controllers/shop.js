const Product = require('../models/product')
const Order = require('../models/order')
exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
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

    Product.find().then(products => {
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
    Product.findById(prodId).then((product) => {

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
    req.user.populate("cart.items.productId")
        .then((user) => {
            res.render('shop/cart', {

                pageTitle: "Your Cart",
                path: '/cart',
                cartProducts: user.cart.items
            })
            console.log(user.cart.items)
        })
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
exports.createOrder = async (req, res, next) => {
    try {
        const user = await req.user.populate("cart.items.productId");

        console.log("populated sample:", user.cart.items[0]?.productId);

        const items = user.cart.items.map(item => ({
            product: {
                productId: item.productId._id,
                title: item.productId.title,
                price: item.productId.price
            },
            quantity: item.quantity
        }));

        console.log(items);

        const newOrder = new Order({
            user: { userId: user._id },
            items
        });

        await newOrder.save();
        await req.user.clearCart()
        res.redirect("/orders");

    } catch (err) {
        next(err);
    }
};

exports.getOrders = (req, res, next) => {
    Order.find({
        "user.userId": req.user._id
    })
        .lean()
        .then(orders => {
            const normalizedOrders = orders.map(order => {
                const items = (order.items || []).map(item => {
                    const price = item.product?.price ?? item.price ?? 0;
                    const title = item.product?.title ?? item.title ?? "";
                    const quantity = item.quantity ?? 0;
                    return {
                        ...item,
                        title,
                        price,
                        quantity,
                        lineTotal: quantity * price
                    };
                });

                const totalPrice = items.reduce((sum, item) => sum + item.lineTotal, 0);

                return {
                    ...order,
                    items,
                    totalPrice
                };
            });

            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders: normalizedOrders
            });
        })
        .catch(err => next(err));
};
