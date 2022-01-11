const express = require('express')
const router = express.Router()
const ColumnController = require('../controller/columnController')

/* 
@Router POST api/column/create/:tableId
@des create column
@access user
*/
router.post('/create/:tableId', ColumnController.createColumn)

/* 
@Router PUT api/column/update/:id/:tableId
@des update column
@access user
*/
router.put('/update/:id/:tableId', ColumnController.updateColumn)

/* 
@Router PUT api/column/deleteCard/:id/:tableId
@des delete cards of  column
@access user
*/
router.put('/deleteCard/:id/:tableId', ColumnController.deleteCard)

/* 
@Router DELETE api/column/update/:id/:tableId
@des delete column
@access user
*/
router.delete('/delete/:id/:tableId', ColumnController.deleteColumn)

/* 
@Router GET api/column/tags/:id
@des get all tags of a column
@access user
*/
router.get('/tags/:id', ColumnController.getAllTag)

router.post('/order', ColumnController.updateOrderColumn)

module.exports = router
