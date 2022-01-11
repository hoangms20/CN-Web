const cookieHelper = require('../helper/cookie');
const User = require('../models/user');
const Workplace = require('../models/workplace');
const Table = require('../models/table');
const ObjectId = require('mongoose').Types.ObjectId;
const tableService = require('../service/table');
const fileService = require('../service/file');

const getBoards = async (req, res) => {
    const user = await cookieHelper.getUserByCookie(req.cookies);
    const data = await tableService.getTableBoard(user);
    // console.log(data);
    res.status(200).render('pages/boards', {isLogin: true, user: req.user, data});
};

module.exports = {
    getBoards,
};