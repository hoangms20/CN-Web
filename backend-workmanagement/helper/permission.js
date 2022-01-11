const cookieHelper = require('./cookie');

const checkUserPermissionByUsername = async (username, cookies) => {
    const user = await cookieHelper.getUserByCookie(cookies);
    if (user && user.username === username) return true;
    return false;
};

module.exports = {
    checkUserPermissionByUsername,
};