const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId, required: true, ref: "Product"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})
userSchema.methods.addToCart = function (productId) {
    const items = this.cart?.items || []
    const index = items.findIndex((i) => {
        return i.productId.toString() == productId.toString()
    })
    if (index >= 0) {
        items[index].quantity += 1
    } else {
        items.push({ productId: productId, quantity: 1 })
    }
    this.cart = { items };
    return this.save();
}


userSchema.methods.deleteFromCart = function (productId) {
    let items = this.cart?.items || [];
    console.log(productId + "!!!!!!!!!!!!")
    const index = items.findIndex(item => {
        console.log(item.productId.toString())
        return item.productId.toString() == productId
    }
    );

    if (index === -1) {
        return Promise.resolve("not found");
    }

    const quantity = items[index].quantity;

    if (quantity > 1) {
        items[index].quantity -= 1;
    } else {
        items = items.filter(item => item.productId.toString() !== productId.toString());
    }

    this.cart.items = items;
    return this.save()
}
userSchema.methods.clearCart = function () {
    this.cart = { items: [] }
    return this.save()
}
module.exports = mongoose.model("User", userSchema)


// const getDb = require("../utils/database").getDb
// const { ObjectId } = require("mongodb")
// class User {
//     constructor(name, email, cart, id) {
//         this.name = name,
//             this.email = email,
//             this.cart = cart || { items: [] }
//         if (id) this._id = new ObjectId(id);
//     }
//     save() {
//         const db = getDb()
//         return db.collection("users")
//             .insertOne(this)
//             .then(reslut => {
//                 console.log(reslut)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }
//     addToCart(productId) {
//         console.log("userId" + this._id)
//         const db = getDb();
//         const pId = new ObjectId(productId)
//         const items = this.cart?.items || []
//         const index = items.findIndex((i) => {
//             return i.productId.toString() == pId.toString()
//         })
//         if (index >= 0) {
//             items[index].quantity += 1
//         } else {
//             items.push({ productId: new ObjectId(productId), quantity: 1 })
//         }
//         this.cart = { items };
//         return db.collection("users")
//             .updateOne({ _id: new ObjectId(this._id) }, {
//                 $set: { "cart.items": items }
//             })
//     }
//     getCart() {
//         const db = getDb();
//         const productsId = this.cart.items.map(item => {
//             return item.productId
//         })
//         return db.collection("products").find({ _id: { $in: [...productsId] } }).toArray().then(products => {
//             return products = products.map(product => {
//                 return { ...product, quantity: this.cart.items.find(i => i.productId.toString() == product._id.toString()).quantity }
//             })
//         })
//     }
//     deleteFromCart(productId) {
//         const db = getDb();
//         let items = this.cart?.items || [];
//         console.log(productId + "!!!!!!!!!!!!")
//         const index = items.findIndex(item => {
//             console.log(item.productId.toString())
//             return item.productId.toString() == productId
//         }


//         );

//         if (index === -1) {
//             return Promise.resolve("not found");
//         }

//         const quantity = items[index].quantity;

//         if (quantity > 1) {
//             items[index].quantity -= 1;
//         } else {
//             items = items.filter(item => item.productId.toString() !== productId.toString());
//         }

//         this.cart.items = items;

//         return db.collection("users").updateOne(
//             { _id: this._id },
//             { $set: { "cart.items": items } }
//         );
//     }
//     addOrder() {
//         const db = getDb();
//         return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: this._id,
//                     name: this.name
//                 }
//             }
//             return db.collection("orders").insertOne(order)
//         }).then(() => {
//             this.cart = { items: [] };
//             db.collection('users')
//                 .updateOne({ _id: new ObjectId(this._id) }, {
//                     $set: { cart: { items: [] } }
//                 })
//         })
//     }
//     getOrder() {
//         const db = getDb()
//         return db.collection("orders")
//             .find({ "user._id": new ObjectId(this._id) })
//             .toArray()
//     }

//     static async findById(userId) {
//         const db = getDb();
//         const doc = await db.collection("users")
//             .findOne({ _id: new ObjectId(userId) })
//         if (!doc) return null
//         return new User(doc.name, doc.email, doc.cart, doc._id)
//     }

// }
// module.exports = User;