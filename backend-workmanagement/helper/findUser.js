const UserModel = require('../models/user');

const getId = async (value) => {
    let user = '';
    if (value.indexOf('@') === -1) user = await UserModel.findOne({username: value});
    else user = await UserModel.findOne({email: value});
    return user ? user.id : null;
}

module.exports = {
    getId,
}