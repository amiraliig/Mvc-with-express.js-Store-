
const fs = require('fs')
const path = require('path')

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
    static #counter = 2;
    constructor(title, imageUrl, price, description) {
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }
    save() {
        this.id = Products.#counter
        Products.#counter += 1;
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
    static fetchProductById(id,cb){
        getProductsFromFile((products)=>{
            const product = products.find(product =>{
                return product.id == id
            })
            cb(product)
        })
    }           
}