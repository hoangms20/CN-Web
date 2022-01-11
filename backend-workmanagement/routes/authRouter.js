const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const validatorRegister = require('../middlewares/validator')

/* 
@Router POST api/auth/login 
@des show login users
@access Public
*/
router.get('/login', authController.show_SignIn)

/* 
@Router POST api/auth/register 
@des show register users
@access Public
*/
router.get('/register', authController.show_SignUp)

/* 
@Router GET api/auth/logout 
@des logout users
@access user
*/
router.get('/logout', authController.logout)

/* 
@Router POST api/auth/register 
@des register users
@access Public
*/
router.post('/register', validatorRegister, authController.register)
/* 
@Router POST api/auth/login
@des login users
@access Public
*/
router.post('/login', authController.login)

module.exports = router
