const express = require('express');
const router = express.Router();
const fileController = require('../controller/fileController');
const upload = require('../helper/file');

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/:filename', fileController.getFile);

module.exports = router;