const jwt = require('jsonwebtoken')
const permissionHelper = require('../helper/permission');

const checkPermissionByUsername = async (req, res, next) => {
    const { username } = req.params;
    const hasPermission = await permissionHelper.checkUserPermissionByUsername(username, req.cookies);
    if (hasPermission) next();
    else res.status(403).send('<h1 style="color: red;">403</h1><h3>You do not have permission</h3>')
}

module.exports = {
    checkPermissionByUsername,
}
