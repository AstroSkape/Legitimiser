const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')

router.get('/Graph_Issue', ensureAuth, (req, res) => {
    res.render('Graph_Issue')
})

router.get('/Graph_Dough', ensureAuth, (req, res) => {
    res.render('Graph_Dough')
})

router.get('/Graph_Column', ensureAuth, (req, res) => {
    res.render('Graph_Column')
})

module.exports = router