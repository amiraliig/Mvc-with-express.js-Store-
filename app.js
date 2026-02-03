const path = require('path');
const express = require("express")
const bodyParser = require('body-parser');

const app = express()

const products = [{ title: "test" }, { title: "test2" }]

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use('/admin', adminRoutes)

app.use(shopRoutes)


app.use(errorController.get404);

app.listen(3001, () => {
    console.log("express runed on localhost:3001")
})