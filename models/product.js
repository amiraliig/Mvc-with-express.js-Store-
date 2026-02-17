const mongoose = require("mongoose")
const Schema = mongoose.Schema

const proudctSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        rer: 'User'
    }
})

module.exports = mongoose.model("Product", proudctSchema)



// const getDb = require('../utils/database').getDb
// const { ObjectId } = require("mongodb");

// class Product {

//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title,
//             this.price = price,
//             this.description = description,
//             this.imageUrl = imageUrl,
//             this.userId = userId
//     }
//     save() {
//         const db = getDb();
//         return db.collection('products')
//             .insertOne(this)
//             .then(result => {
//                 console.log(result)
//                 return result
//             })
//             .catch(err => {
//                 console.log(err)
//             })

//     }
//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products')
//             .find()
//             .toArray()
//     }
//     static getProductDetails(productId) {
//         const db = getDb();
//         return db.collection('products')
//             .find({ _id: new ObjectId(productId) })
//             .toArray()
//     }
//     static deleteProduct(productId) {
//         const db = getDb();
//         return db.collection('products')
//             .deleteOne({ _id: new ObjectId(productId) })
//             .then(() => {
//                 db.collection("orders").updateMany(
//                     { "items.productId": productId },
//                     { $pull: { items: { productId: productId } } }
//                 )
//             })
//     }
//     static updateById(productId, product) {
//         const db = getDb();
//         console.log(product)
//         return db.collection('products')
//             .updateOne({ _id: new ObjectId(productId) },
//                 {
//                     $set: {
//                         title: product.updatedTitle,
//                         price: product.updatedPrice,
//                         description: product.updatedDescription,
//                         imageUrl: product.updatedImageUrl
//                     }
//                 })
//     }
// }

// module.exports = Product;