const Product = require('../models/product')
const Cart = require('../models/cart')
const { where } = require('sequelize')
exports.getProducts = (req, res, next) => {

    req.user.getProducts().then(products => {
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

    req.user.getProducts().then(products => {
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
    


    req.user.getProducts({ where: { id: prodId } }).then((product) => {
       
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

    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            if (!cart) {
                return req.user.createCart();
            }
            return cart
        })
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: productId } })
        }).then(products => {
            const product = products[0];
            const newQuantity = 1;
            if (products.length > 0) {
                return { product, newQuantity: product.cartItem.quantity + 1 }
            }
            return Product.findByPk(productId).then(product => {
                return { product, newQuantity }
            })

        }).then(({ product, newQuantity }) => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            })
        }).then(() => {
            res.redirect("/")
        })
        .catch(err => console.log(err))

};
exports.getCart = (req, res, next) => {

    req.user.getCart()
        .then(cart => cart.getProducts()
            .then(product =>

                res.render('shop/cart', {

                    pageTitle: "Your Cart",
                    path: '/cart',
                    cartProducts: product
                })
            )
            .catch(err => console.log(err))
            .catch(err => console.log(err)))

}

exports.cartDeleteItem = (req, res, next) => {
    const productId = req.body.productId
    // Cart.ProductDeleteItem(productId, () => {
    //     res.redirect('/cart')
    // })
    req.user.getCart().then(cart => {
        return cart.getProducts({ where: { id: productId } }).then(products => {
            if (products.length == 0) {
                return res.redirect('/')
            }
            const product = products[0];
            const currentQty = product.cartItem.quantity
            if (currentQty <= 1) {
                return product.cartItem.destroy()
            }
            product.cartItem.quantity = currentQty - 1
            return product.cartItem.save()
        })
    }).then(() => {
        res.redirect("/cart")
    }).catch(err => {
        console.log(err)
    })
}
exports.createOrder = (req, res, next) => {

    req.user.getCart().then(cart => {
        return cart.getProducts().then(products => {

            return req.user.createOrder().then(order => {
                const productForOrder = products.map(product => {
                    product.orderItem = {
                        quantity: product.cartItem.quantity
                    }
                    return product
                })
                return order.addProducts(productForOrder).then(() => cart)

            }).then((cart) => {
                return cart.setProducts([])
            }).then(() => {
                res.redirect("/")
            })
        })
    })
}
exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      return Promise.all(
        orders.map(order => {
          return order.getProducts().then(products => ({ order, products }));
        })
      );
    })
    .then(ordersWithProducts => {
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders: ordersWithProducts
      });
    })
    .catch(err => console.log(err));
};