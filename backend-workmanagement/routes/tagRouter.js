const express = require('express')
const router = express.Router()
const TagController = require('../controller/tagController')

/* 
@Router POST api/tag/create/:columnId:/tableId
@des create tag
@access user
*/
router.post('/create/:columnId/:tableId', TagController.createTag)

/* 
@Router PUT api/tag/update/:id/:tableId
@des update table
@access user
*/
router.put('/update/:id/:tableId', TagController.updateTag)

/* 
@Router DELETE api/tag/delete/:id
@des delete tag
@access user
*/
router.delete('/delete/:id', TagController.deleteTag)

module.exports = router
