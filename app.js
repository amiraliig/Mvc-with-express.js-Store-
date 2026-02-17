const path = require('path');
const express = require("express")
const bodyParser = require('body-parser');

const app = express()
const User = require("./models/user")
const mongoose = require("mongoose")

const errorController = require('./controllers/error');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.findById("69942bd8d1a72dd7b77fc14a")
        .then(user => {
            req.user = user;

        }).catch(err => {
            console.log(err)
        }).finally(() => {
            next()
        })

})

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views')


app.use('/admin', adminRoutes)

app.use(shopRoutes)


app.use(errorController.get404);

mongoose.connect("mongodb://admin:admin123@localhost:27017/?authSource=admin")
    .then(() => {
        app.listen(3000)
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: "Amirali",
                        email: "test@gmail.com",
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
