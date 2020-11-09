const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Issue = require('../models/Issues')

// @desc    Show add page
// @route   GET /issues/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('issues/add')
})

// @desc    Process add form
// @route   POST /issues
router.post('/', ensureAuth, async (req, res) => {
    try{
        req.body.user = req.user.id
        await Issue.create(req.body)
        res.redirect('/issues')
    } catch (err) {
        console.log('At issues.js')
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router