const bcrypt = require("bcrypt")
const User = require("../models/user")
const resend = require("resend")
const crypto = require("crypto");
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
exports.getResetPassword = (req, res, next) => {
    req.res.render('auth/reset', {
        path: '/reset-password',
        pageTitle: 'Rest page',
        isLoggedIn: req.session?.userId,

    })
}
exports.postReset = (req, res, next) => {
    const { email } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.redirect("/");
                return null;
            }

            return new Promise((resolve, reject) => {
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) return reject(err);
                    const token = buffer.toString("hex");
                    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
                    resolve({ user, token, tokenHash });
                });
            });
        })
        .then(data => {
            if (!data) return;

            const { user, token, tokenHash } = data;

            user.resetToken = tokenHash;
            user.resetTokenExpiration = Date.now() + 2 * 60 * 60 * 1000;

            return user.save().then(() => token);
        })
        .then(token => {
            if (!token) return;

            console.log("TOKEN:", token);

            return resender.emails.send({
                from: "onboarding@resend.dev",
                to: email,
                subject: "Password Reset",
                html: `<a href="http://localhost:3000/new-password/${token}">reset password</a>`
            }).then(() => {
                res.redirect("/");
            });
        })
        .catch(err => {
            console.error(err);
            res.redirect("/reset-password");
        });
};
exports.getNewPassword = (req, res, next) => {
    const token = req.params.token
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    User.findOne({ resetToken: tokenHash, resetTokenExpiration: { $gt: Date.now() } })
        .then((user) => {
            if (!user) {
                return res.redirect("/")
            }
            res.render("auth/new-password",
                {
                    path: '/reset-password',
                    pageTitle: 'Rest page',
                    isLoggedIn: req.session?.userId,
                    userId: user._id.toString(),
                    passwordToken: token
                }
            )
        })

}
exports.postNewPassword = async (req, res, next) => {
    const userId = req.body.userId
    const token = req.body.passwordToken
    const newPassword = req.body.password
    const hash = await bcrypt.hash(newPassword, 12);
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ _id: userId, resetToken: tokenHash, resetTokenExpiration: { $gt: Date.now() } })
    if (!user) {
        console.log("not found")
        return res.status(400).send("Invalid or expired reset token.")
    }
    user.password = hash;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save()
    res.redirect("/")


}
