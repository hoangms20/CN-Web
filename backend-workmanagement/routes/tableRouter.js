const express = require('express')
const router = express.Router()
const tableController = require('../controller/tableController')
const upload = require('../helper/file');

/* 
@Router POST api/table/create 
@des create table
@access user
*/
router.post('/create', upload.single('backgroundTable'), tableController.createTable)

/* 
@Router PUT api/table/update/:id
@des update table
@access user
*/
router.put('/update/:id', upload.single('tableBackground'), tableController.updateTable)

/* 
@Router PUT api/table/deleteMember/:id
@des delete member of table
@access admin of table
*/
router.put('/deleteMembers/:id', tableController.deleteMembers)

/* 
@Router get api/table/admin
@des get table admin
@access admin
*/
router.get(
	'/admin',
	tableController.getTableGuest,
	tableController.getTableAdmin
)

/* 
@Router get api/table/columns/:id
@des get columns of table
@access user
*/
router.get('/:id/columns', tableController.getColumns)

/* 
@Router POST api/table/delete/:id
@des delete table
@access admin
*/
router.delete('/delete/:id', tableController.deleteTable)

router.post('/favorite/add', tableController.addFavoriteTable)

router.post('/favorite/remove', tableController.removeFavoriteTable)

module.exports = router
