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
    // User.findById("6992d3808376a85d16c85e1e")
    //     .then(user => {
    //         req.user = user;

    //     }).catch(err => {
    //         console.log(err)
    //     }).finally(() => {
    //         next()
    //     })
    next()
})

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views')


app.use('/admin', adminRoutes)

app.use(shopRoutes)


app.use(errorController.get404);

mongoose.connect("mongodb://admin:admin123@localhost:27017/?authSource=admin")
.then(()=>{
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})
