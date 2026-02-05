const { count } = require('console');
const fs = require('fs')
const path = require('path');
const Products = require('./product.js')
const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json")
const getCartFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb({ items: [] });
        } try {
            const data = JSON.parse(fileContent);
            if (!data || !Array.isArray(data.items)) {
                return cb({ items: [] });
            }

            cb(data);
        } catch (error) {
            cb({ items: [] });
        }
    });
};
module.exports = class Cart {
    constructor() {

    }
    static addToCart(productId, cb, price) {
        getCartFromFile(cart => {

            if (cart.items.find(item => {
                return item.id == productId
            })) {
                cart.items = cart.items.map(item => {
                    if (item.id == productId) {
                        const newQty = item.qty + 1
                        return { ...item, qty: newQty, price: price * newQty }
                    } else {
                        return item
                    }

                });
                fs.writeFile(p, JSON.stringify(cart), (err) => {
                    if (err) {
                        cb({ massage: "Product could not be added to cart.", count: cart.items.length })
                    } else {
                        cb({ massage: "Product + 1", count: cart.items.length })
                    }
                })


            } else {
                let newCart = cart;
                newCart.items.push({ id: productId, qty: 1, price: price })
                fs.writeFile(p, JSON.stringify(newCart), (err) => {
                    if (err) {
                        cb({ massage: "Product could not be added to cart.", count: cart.items.length })
                    } else {
                        cb({ massage: "Product added to cart", count: cart.items.length })
                    }
                })


            }

        })
    }
    static cartCount(cb) {
        getCartFromFile(cart => {
            cb(cart.items.length)
        })
    }
    static deleteProduct(productId) {
        getCartFromFile(cart => {
            const updatedCart = cart.items.filter((product) => {
                return product.id != productId
            })
            fs.writeFile(p, JSON.stringify({ items: updatedCart }), (err) => {
                if (err) console.log(err)
            })
        })
    }
    static getCart(cb) {
        let cartProducts = []

        getCartFromFile((cart) => {
            Products.fetchAll((allProducts) => {
                for (const product of allProducts) {
                    const cartProductData = cart.items.find((prod) => prod.id == product.id)
                    if (cartProductData) {
                        cartProducts.push({ productData: product, qty: cartProductData.qty })
                    }
                }
                cb(cartProducts)
            })

        })
    }
    static ProductDeleteItem(productId, cb) {
        getCartFromFile((cart) => {
            const productIndex = cart.items.findIndex(prod => {
                return prod.id == productId
            })
            if (productIndex === -1) return cb?.(null);
            let updatedCart;
            if (cart.items[productIndex].qty > 1) {
                const updatedProductQty = cart.items[productIndex].qty - 1
                updatedCart = cart.items.map(product => {
                    if (product.id == productId) {
                        return { ...product, qty: updatedProductQty, price: cart.items[productIndex].price * updatedProductQty }
                    }
                    return product
                })
            } else {
                updatedCart = cart.items.filter((product) => {
                    return product.id != productId
                })
            }
            fs.writeFile(p, JSON.stringify({ items: updatedCart }), (err) => {
                if (!err) {
                    cb()
                }
            })
        })
    }

}