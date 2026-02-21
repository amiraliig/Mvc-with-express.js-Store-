const bcrypt = require("bcrypt")
const User = require("../models/user")
exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render("auth/login", {
        path: '/login',
        pageTitle: 'Login page',
        isLoggedIn: req.isLoggedIn

    })
}
exports.postLogin = async (req, res, next) => {

    const { email, password } = req.body
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        return res.status(401).send("Invalid email")
    }
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(401).send("Invalid credentials");
    req.session.userId = user._id.toString();
    res.redirect("/")
}
exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect("/")
    })
}