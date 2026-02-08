const db = require("../utils/database")
module.exports = class Products {

    constructor(title, imageUrl, price, description) {
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }
    save() {
        return db.execute("INSERT INTO products (title,price,imageUrl,description) VALUE (?,?,?,?)",
            [this.title, this.price, this.imageUrl, this.description])
    }
    static fetchAll(cb) {
        return db.execute("SELECT * FROM products")
    }
    static fetchProductById(id, cb) {

    }
    static editProduct(productId, newValues, cb) {


    }
    static deleteProduct(productId, cb) {


    }
}