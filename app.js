const path = require('path');
const express = require("express")
const bodyParser = require('body-parser');
const session = require("express-session")
const MongoDbStore = require("connect-mongodb-session")(session)
const bcrypt = require("bcrypt")
const app = express()
const store = new MongoDbStore({
    uri: "mongodb://admin:admin123@localhost:27017/?authSource=admin",
    collection: 'session',

})
const User = require("./models/user")
const mongoose = require("mongoose")

const errorController = require('./controllers/error');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'My secret',
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use((req, res, next) => {
    if (!req.session?.userId) {
        return next();
    }

    User.findById(req.session.userId)
        .then(user => {
            if (user) req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
            next();
        });
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth')

app.set('view engine', 'ejs');
app.set('views', 'views')


app.use('/admin', adminRoutes)

app.use(shopRoutes)

app.use(authRoutes)

app.use(errorController.get404);

mongoose.connect("mongodb://admin:admin123@localhost:27017/?authSource=admin")
    .then(() => {
        app.listen(3000)
        User.findOne()
            .then(async (user) => {
                if (!user) {
                    const hash = await bcrypt.hash("123", 12);
                    const user = new User({
                        name: "Amirali",
                        email: "test@gmail.com",
                        password: hash,
                        cart: {
                            items: []
                        }
                    })
                    user.save()
                }
            })

    })
    .catch((err) => {
        console.log(err)
    })
