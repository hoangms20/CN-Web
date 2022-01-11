const express = require('express')
const router = express.Router()
const profileController = require('../controller/profileController')
const upload = require('../helper/file');

/* 
@Router GET api/user/profile/ 
@des show  user profile
@access user
*/
router.get('/', profileController.getProfile)

/* 
@Router PUT api/user/profile/update
@des update  user profile
@access user
*/

router.put('/update', upload.single("avatar") ,profileController.updateProfile)

module.exports = router
