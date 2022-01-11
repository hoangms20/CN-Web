const express = require('express');
const router = express.Router();
const boardsController = require('../controller/boardsController');

router.get('/', boardsController.getBoards);

module.exports = router
