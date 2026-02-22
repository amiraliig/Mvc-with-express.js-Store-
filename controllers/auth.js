const bcrypt = require("bcrypt")
const User = require("../models/user")
const resend = require("resend")

const resender = new resend.Resend('re_DyQn7vfj_PFaz8zkz1w2QpDoyw9htuny6')
exports.getSignup = (req, res, next) => {
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "Signup page",
        isLoggedIn: req.session?.userId
    })
}

exports.getLogin = (req, res, next) => {
    const errorMessage = req.flash('error')
    res.render("auth/login", {
        path: '/login',
        pageTitle: 'Login page',
        isLoggedIn: req.session?.userId,
        errorMessage: errorMessage.length > 0 ? errorMessage[0] : null

    })
}

exports.postSignup = async (req, res, next) => {
    const { name, email, password } = req.body
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.redirect("/signup")
        }
        bcrypt.hash(password, 12).then((hash) => {
            const newUser = new User({
                name: name,
                email: email,
                password: hash
            })
            newUser.save().then(user => {
                req.session.userId = user._id.toString()
            }).then(() => {
                res.redirect("/")
                return resender.emails.send({
                    from: 'onboarding@resend.dev',
                    to: email,
                    subject: 'Hello World',
                    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
                });
            }).catch(err => {
                console.log(err)
            })
        })
    })


}

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            email: email
        })

        if (!user) {
            req.flash('error', 'Invalid email or password.')
            return res.redirect("/login")
        }

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) {
            req.flash('error', 'Invalid email or password.')
            return res.redirect("/login")
        }

        req.session.userId = user._id.toString();
        return req.session.save((err) => {
            if (err) {
                console.log(err)
            }
            res.redirect("/")
        })
    } catch (err) {
        console.log(err)
        req.flash('error', 'Something went wrong. Please try again.')
        return res.redirect("/login")
    }
}
exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect("/")
    })
}
