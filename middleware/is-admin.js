const User = require("../models/user")
module.exports = (req, res, next) => {
    User.findById(req.session.userId)
        .then(user => {
            if (user.role !== "admin") {
                res.redirect('/')
            }
        })
    next()
}