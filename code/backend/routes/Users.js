const express = require('express')
const router=   express.Router()
const userController = require('../controllers/users')
const auth = require('../middleware/auth')

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.post('/update',auth,userController.update)
router.post('/delete',auth,userController.delete)



module.exports = router