const authRouter = require('./authRouter')
const tableRouter = require('./tableRouter')
const columnRouter = require('./columnRouter')
const tagRouter = require('./tagRouter')
const workplaceRouter = require('./workplaceRouter')
const fileRouter = require('./fileRouter')
const profileRouter = require('./profileRouter')

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/verifyToken')
const boardsRouter = require('./boards')
const permissionMiddleware = require('../middlewares/permission')

function router(app) {
	app.use('/api/auth', authRouter)
	app.use('/api/table', verifyToken, tableRouter)
	app.use('/api/column', verifyToken, columnRouter)
	app.use('/api/tag', verifyToken, tagRouter)
	app.use('/api/user/profile', verifyToken, profileRouter)
	app.use(
		'/:username/boards',
		verifyToken,
		permissionMiddleware.checkPermissionByUsername,
		boardsRouter
	)
	app.use('/workplace', verifyToken, workplaceRouter)
	app.use('/file', fileRouter)
	app.use('/', async (req, res, next) => {
		if (!req.cookies.token) {
			res.render('home/index', { isLogin: false })
			return
		}
		try {
			const token = req.cookies.token
			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
			const userId = decoded.userID
			const user = await User.findById(userId).select('-password')
			if (!user) {
				return res.redirect('/api/auth/login')
			}
			res.redirect(`/${user.username}/boards`)
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
		next()
	})
}

module.exports = router
