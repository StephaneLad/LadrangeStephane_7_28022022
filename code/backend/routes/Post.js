const express = require('express')
const router=   express.Router()
const postController = require('../controllers/Post')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get('/getAll',auth,postController.getAll)
router.post('/getOne',auth,postController.getOne)
router.post('/getAllUser',auth,postController.getAllUser)

router.post('/create',auth,multer,postController.create)
router.post('/delete',auth,multer,postController.delete)
router.post('/update',auth,multer,postController.update)

module.exports = router