const express = require("express")

const router = express.Router();

const authConroller = require("../controllers/auth")
router.get('/signup', authConroller.getSignup)
router.post('/signup', authConroller.postSignup)
router.get('/login', authConroller.getLogin)
router.post('/login', authConroller.postLogin)
router.post('/logout', authConroller.postLogout)
router.get('/reset-password', authConroller.getResetPassword)
router.post('/reset', authConroller.postReset)
router.get('/new-password/:token',authConroller.getNewPassword)
router.post('/set-new-password',authConroller.postNewPassword)
module.exports = router
