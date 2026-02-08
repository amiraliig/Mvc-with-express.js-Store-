const path = require('path');
const express = require("express")
const bodyParser = require('body-parser');
const session = require("express-session");

const app = express()



const errorController = require('./controllers/error');
const sequelize = require('./utils/database')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));


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
sequelize.sync().then(retsult => {
    console.log(retsult)
    app.listen(3000, () => {
        console.log("express runed on localhost:3000")
    })
}).catch(err => {
    console.log(err)
}
)
