const { count } = require('console');
const fs = require('fs')
const path = require('path')
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

}