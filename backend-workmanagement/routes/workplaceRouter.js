const express = require('express')
const router = express.Router()
const workplaceController = require('../controller/workplaceController')
const upload = require('../helper/file')

router.post('/create', workplaceController.createWorkplace);
router.get('/:workplaceId', workplaceController.getWorkplaceById);
router.post('/delete/:id', workplaceController.deleteWorkplace);
router.post('/updatethumbnail/:workplaceId', upload.single('logoWorkPlace') , workplaceController.updateThumbnail);
router.post('/update/:workplaceId' , workplaceController.updateworkplace);
router.post('/updatescope/:workplaceId' , workplaceController.updatescope);

module.exports = router;