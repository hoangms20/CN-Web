const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../config/SendEmail')

const CLIENT_URL = `${process.env.BASE_URL}`

class AuthController {
	show_SignIn = async (req, res) => {
		let errors = ''
		if (req.cookies.token) {
			res.redirect('/')
			return
		}
		res.render('auth/login', { errors: errors })
	}

	show_SignUp = async (req, res) => {
		let errors = ''
		if (req.cookies.token) {
			res.redirect('/')
			return
		}
		res.render('auth/register', { errors: errors })
	}

	register = async (req, res) => {
		const { username, email, password } = req.body
		let errors = []
		try {
			//email exits in database
			const account = await User.findOne({ email })

			if (account) {
				errors.push('Email already exits.')
				return res.render('auth/register', { errors: errors })
			}

			//username exits in database
			const account1 = await User.findOne({ username })
			if (account1) {
				errors.push('Username already exits.')
				return res.render('auth/register', { errors: errors })
			}

			//all good
			//hash password
			const salt = await bcrypt.genSalt(10)
			const hashPassword = await bcrypt.hash(password, salt)
			const newAccount = await User({
				username,
				email,
				password: hashPassword,
			})
			await newAccount.save()

			//return token
			const accessToken = await jwt.sign(
				{ userID: newAccount._id },
				process.env.ACCESS_TOKEN_SECRET
			)
			res.cookie('token', accessToken)
			const url = `${CLIENT_URL}/${username}/boards`
			sendMail(email, url, 'Verify your email address')
			return res.render('util/success')
		} catch (err) {
			res.status(400).json({ success: false, message: err.message })
		}
	}

	login = async (req, res) => {
		const { email, password } = req.body
		let errors = ''
		if (!email || !password) {
			return res.status(401).json({
				success: false,
				message: 'Invalid email or password',
			})
		}

		try {
			const user = await User.findOne({ email })
			if (!user) {
				errors += 'Email or Password  is incorrect'
				return res.render('auth/login', { errors: errors })
			}

			//user founded
			let check = await bcrypt.compare(password, user.password)
			if (!check) {
				errors += 'Email or Password  is incorrect'
				return res.render('auth/login', { errors: errors })
			}

			//return token
			const accessToken = await jwt.sign(
				{ userID: user._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			//use cookie
			const { username } = user
			res.cookie('token', accessToken)

			res.redirect(`/${username}/boards`)
			// return res.redirect('/api/table/admin')
		} catch (err) {
			res.status(400).json({ success: false, message: err.message })
		}
	}

	logout = async (req, res) => {
		res.cookie('token', '')
		return res.redirect('/')
	}
}

module.exports = new AuthController()
