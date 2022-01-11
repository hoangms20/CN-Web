const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getUserByCookie = async (cookies) => {
    const token = cookies.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userID;
    const user = await User.findById(userId).select('-password');
    return user || null;
}

module.exports = {
    getUserByCookie,
}