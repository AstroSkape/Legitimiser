const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Issue = require('../models/Issues')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    //console.log(req.user)
    res.render('dashboard', {
        name: req.user.firstName,
    })
})

// @desc    Display graphs
// @route   GET /graphs
router.get('/graphs', ensureAuth, (req, res) => {
    //console.log(req.user)
    res.render('graphs', {
        //name: req.user.firstName,
    })
})

// @desc    Issues
// @route   GET /issues
router.get('/issues', ensureAuth, async (req, res) => {
    try {
        //const issue = await Issue.find({ user: req.user.id }).lean()
        const issue = await Issue.find({ status: 'public' })
         .populate('user')
         .sort({ createdAt: 'desc' })
         .lean()
        res.render('Issues', {
            layout: 'add_issue',
            name: req.user.lastName,
            issue
        })
    } catch(err){
        console.error(err)
        res.render('error/500')
    }
    //console.log(req.user)
})

// @desc    Upload project files
// @route   GET /projects
// router.get('/projects', (req, res) => {
//     console.log("COME Here")
//     gfs.files.find().toArray((err, files) => {
//       // Check if files
//       if (!files || files.length === 0) {
//         res.render('projects', 
//         { files: false }
//         );
//         //console.log("NO FILES")
//       } else {
//         //console.log(files)
//         files.map(file => {
//           if (
//             file.contentType === 'image/jpeg' ||
//             file.contentType === 'image/png'
//           ) {
//             file.isImage = true;
//           } else {
//             file.isImage = false;
//           }
//         });
//         res.render('projects', { files: files });
//       }
//     });
// });

module.exports = router
