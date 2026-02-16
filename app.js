const path = require('path');
const express = require("express")
const bodyParser = require('body-parser');
const mongoConnect = require("./utils/database").mongoConnect
const app = express()



const errorController = require('./controllers/error');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views')


app.use('/admin', adminRoutes)

app.use(shopRoutes)


app.use(errorController.get404);
mongoConnect(() => {
 app.listen(3000)
})