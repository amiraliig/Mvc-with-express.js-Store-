
const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')
const getProductsFromFile = (cb) => {
    const p = path.join(
        path.dirname(process.mainModule.filename),
        "data",
        "products.json"
    )
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent))
        }

    })
}

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
module.exports = class Products {

    constructor(title, imageUrl, price, description) {
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }
    save() {
        this.id = randomUUID()

        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })

        })


    }
    static fetchAll(cb) {
        getProductsFromFile(cb)

    }
    static fetchProductById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(product => {
                return product.id == id
            })

            cb(product)
        })
    }
    static editProduct(productId, newValues, cb) {
        getProductsFromFile((products) => {
            let productIndex = products.findIndex(product => {
                return product.id == productId
            })
            if (productIndex === -1) return;
            const updatedProducts = products
            updatedProducts[productIndex] = {
                ...products[productIndex],
                ...newValues,
                id: productId
            };
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                console.log(err)
            })

        })
        cb()
    }
    static deleteProduct(productId, cb) {
        getProductsFromFile((products) => {
            const updatedProducts = products.filter(product => {
                return product.id != productId
            })
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (err) console.log(err)
                cb()
            })
        })
    }
}