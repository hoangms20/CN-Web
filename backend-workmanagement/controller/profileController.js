const User = require('../models/user')

class ProfileController {
	getProfile = async (req, res) => {
		const userId = req.userId
		try {
			const user = await User.findOne({ _id: userId })
			if (!user) {
				res.status(400).json({
					success: false,
					message: 'User not found or invalid authentication',
				})
			}

			// return res.status(200).json({
			// 	success: true,
			// 	user,
			// })

			res.render('pages/profile.ejs', {
				user,
				isLogin: true,
				success: true,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal server',
			})
		}
	}

	updateProfile = async (req, res) => {
		const userId = req.userId
		const { username, bio, fileName } = req.body;
		try {
			const userCurrent = await User.findOne({ _id: userId })
			if (username === userCurrent.username) {
				const query = fileName ? { bio, avatar: fileName } : { bio };
				const userUpdate = await User.findOneAndUpdate(
					{ username: username },
					{
						$set: query,
					}
				)
				return res.redirect('/api/user/profile');
			} else {
				const result = await User.findOne({ username: username })
				const query = fileName ? { username, bio, avatar: fileName } : { username, bio };
				if (result) {
					return res.render('pages/profile.ejs', {
						user: userCurrent,
						isLogin: true,
						success: false,
					})
				}
				const userUp = await User.findOneAndUpdate(
					{ _id: userId },
					{
						$set: query,
					}
				)
				return res.redirect('/api/user/profile');
			}
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}
}

module.exports = new ProfileController()
