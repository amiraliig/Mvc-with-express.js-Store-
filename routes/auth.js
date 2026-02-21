const express = require("express")

const router = express.Router();

const authConroller = require("../controllers/auth")
router.get('/login', authConroller.getLogin)
router.post('/login', authConroller.postLogin)
router.post('/logout', authConroller.postLogout)

module.exports = router