const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verifyToken = async (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader ? authHeader.split(' ')[1] : req.cookies.token

	if (!token) {
		return res.status(401).json({
			sucess: false,
			message: 'Access token not found',
		})
	}

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.userId = decoded.userID
		req.user = await User.findById({_id: decoded.userID});
		next()
	} catch (e) {
		console.log(e)
		return res
			.status(403)
			.json({ success: false, message: 'Invalid token' })
	}
}

module.exports = verifyToken
