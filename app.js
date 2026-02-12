const path = require('path');
const express = require("express")
const bodyParser = require('body-parser');
const session = require("express-session");
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')
const app = express()



const errorController = require('./controllers/error');
const sequelize = require('./utils/database')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user
        next()
    }).catch(err => console.log(err))
})

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views')
// app.set(cartCountMiddleware)
app.use(session({
    secret: "a-very-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,

    }
}));
app.use('/admin', adminRoutes)

app.use(shopRoutes)


app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product);

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

User.hasMany(Order)
Order.belongsTo(User, { allowNull: false });

Product.belongsToMany(Order, { through: OrderItem })
Order.belongsToMany(Product, { through: OrderItem })

sequelize.sync().then(() => {
    return User.findByPk(1)
}).then((user) => {
    if (!user) {
        return User.create({ name: "amirali", email: "amirali@example.com" })
    }
    return user
}).then(user => {
    user.getCart().then(cart => {
        if (cart) return user
        return user.createCart().then(() => user)
    })
})
    .then(retsult => {
       
        app.listen(3000, () => {
            console.log("express runed on localhost:3000")
        })
    }).catch(err => {
        console.log(err)
    }
    )
