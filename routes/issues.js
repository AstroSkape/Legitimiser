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

// // @desc    Show all stories
// // @route   GET /stories
// router.get('/', ensureAuth, async (req, res) => {
//     try {
//       const issues = await Issue.find({ status: 'public' })
//         .populate('user')
//         .sort({ createdAt: 'desc' })
//         .lean()
  
//       res.render('issues', {
//         issues,
//       })
//     } catch (err) {
//       console.error(err)
//       res.render('error/500')
//     }
// })

// @desc    Show edit page
// @route   GET /issues/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    const issue = await Issue.findOne({
        _id: req.params.id
    }).lean()

    if(!issue) {
        return res.render('error/404')
    }

    // edit access
    if(issue.user != req.user.id) {
        res.redirect('/issues')
    } else {
        res.render('issues/edit', {
            issue
        })
    }
})

// @desc    Update issue
// @route   PUT /issues/:id
router.put('/:id', ensureAuth, async (req, res) => {
    let issue = await Issue.findById(req.params.id).lean()

    if(!issue) {
        return res.render('error/404')
    }

    // edit access
    if(issue.user != req.user.id) {
        res.redirect('/issues')
    } else {
        issue = await Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        })

        res.redirect('/issues')
    }
})
module.exports = router