const path = require('path');
const express = require("express")
const bodyParser = require('body-parser');
const session = require("express-session");
const db = require("./utils/database")
const app = express()



const errorController = require('./controllers/error');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
db.execute("SELECT * FROM products").then(result =>{
    console.log(result)
}).catch(err =>{
    console.log(err)
})
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

app.listen(3000, () => {
    console.log("express runed on localhost:3001")
})