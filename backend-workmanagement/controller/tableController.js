const Table = require('../models/table')
const Column = require('../models/column')
const User = require('../models/user')
const workplaceController = require('../controller/workplaceController');
const ObjectId = require('mongoose').Types.ObjectId;
const tableService = require('../service/table');

class TableController {
	//create table
	// createTable = async (req, res) => {
	// 	const { tableName } = req.body
	// 	const table = new Table({
	// 		tableName,
	// 		admin: req.userId,
	// 	})
	// 	try {
	// 		await table.save()
	// 		return res.status(200).json({ success: true, table })
	// 	} catch (error) {
	// 		return res
	// 			.status(500)
	// 			.json({ success: false, message: error.message })
	// 	}
	// }
	createTable = async (req, res) => {
		const { tableName, tableDescription, tableMaxMember, fileName, workplaceId, type } = req.body;
		const defaultBg = 'fa7ef71c39dd4f41fbd5f8b75f759bf6.png';
		try {
			const table = await Table.create({
				tableName,
				background: fileName || defaultBg,
				description: tableDescription,
				maxMembers: tableMaxMember,
				admin: req.userId,
			});
			await workplaceController.updateTableWorkplace(workplaceId, table.id);
			if(type && type ==="workplace"){
				return res.status(200).redirect(`/workplace/${workplaceId}`);
			}else{
				return res.status(200).redirect(`/${req.user.username}/boards`);
			}
			
			// await table.save()
			// return res.status(200).json({ success: true, table })
			//res.redirect('/api/table/admin')
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}
	//get table created by yourself
	getTableAdmin = async (req, res) => {
		try {
			const userId = req.userId
			const tablesInvited = req.tablesInvited
			const tables = await Table.find({ admin: userId })
			try {
				const user = await User.findOne({ _id: userId })
				return res.render('pages/boards', {
					tables,
					isLogin: true,
					user,
					tablesInvited,
				})
			} catch (error) {
				return res
					.status(500)
					.json({ success: false, message: error.message })
			}
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	//get table invited
	getTableGuest = async (req, res, next) => {
		try {
			const userId = req.userId
			const tablesInvited = await Table.find({ members: userId })
			req.tablesInvited = tablesInvited
			next()
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	//update infor table
	updateTable = async (req, res) => {
		let members = null;
		const { email } = req.body
		if (email) {
			const userAdded = await User.findOne({ email })
			members = userAdded._id
		}
		const { tableName, thumbnail, scope, maxMembers, labels, fileName } =
			req.body
		const conditions = {
			_id: req.params.id,
			admin: req.userId,
		}
		const query = fileName ? {
			tableName,
			thumbnail,
			scope,
			maxMembers,
			labels,
			background: fileName
		} : {
			tableName,
			thumbnail,
			scope,
			maxMembers,
			labels,
		}
		console.log(fileName);
		try {
			const tableUpdate = await Table.findOneAndUpdate(
				conditions,
				{
					$set: query,
					$addToSet: {
						members,
					},
				},
				{ new: true }
			)

			if (!tableUpdate) {
				return res.status(400).json({
					success: false,
					message: 'table not found or invalid authentication',
				})
			}
			res.redirect(`/api/table/${tableUpdate._id}/columns`)
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	//delete user out table
	deleteMembers = async (req, res) => {
		const { members } = req.body
		try {
			const conditions = {
				_id: req.params.id,
				admin: req.userId,
			}
			const tableUpdate = await Table.findOneAndUpdate(
				conditions,
				{
					$pull: {
						members: new ObjectId(members.members),
					},
				},
				{ safe: true }
			)
			if (!tableUpdate) {
				return res.status(400).json({
					success: false,
					message: 'table not found or invalid authentication',
				})
			}
			// return res.status(200).json({
			// 	success: true,
			// 	tableUpdate,
			// })
			res.redirect(`/api/table/${tableUpdate._id}/columns`)
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	//delete table
	deleteTable = async (req, res) => {
		const conditions = {
			_id: req.params.id,
			admin: req.user.id,
		}
		try {
			const table = await Table.findById({_id: conditions._id});
			if (!table) {
				return res.status(400).json({
					success: false,
					message: 'table not found or invalid authentication',
				})
			}
			if (ObjectId(conditions.admin).equals(table.admin)) {
				await tableService.deleteTable(table.id);
				return res.redirect('/');
			}
			else {
				res.status(500).send('<h1 style="color: red;">403</h1><br/><span>Bạn không có quyền</span>');
			}
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	//get colums of table
	getColumns = async (req, res) => {
		try {
			const columns = await Column.find({
				tableId: req.params.id,
			}).populate('tags').sort({ order: 1});
			const table = await Table.findOne({ _id: req.params.id }).populate(
				'members admin'
			)
			try {
				const user = await User.findOne({ _id: req.userId })
				const len = user.recentlyTables.length;
				if (user.recentlyTables.indexOf(ObjectId(req.params.id)) === -1) {
					if (len >= 0 && len <=3) {
						user.recentlyTables.push(ObjectId(req.params.id));
					}
					else {
						let temp = user.recentlyTables;
						temp[0] = ObjectId(req.params.id);
						user.recentlyTables = temp;
					}
					user.save();
				}
				res.render('pages/table', {
					isLogin: true,
					user,
					columns,
					table,
				})
			} catch (error) {
				return res
					.status(500)
					.json({ success: false, message: error.message })
			}
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	addFavoriteTable = async (req, res) => {
		const { tableId, type, workplaceId } = req.body;
		const _user = await User.findOne({_id: ObjectId(req.user.id)});
		if (_user.favoriteTables.indexOf(tableId) === -1) {
			try {
				const user = await User.findOneAndUpdate(
					{ _id: ObjectId(req.user.id) },
					{
						$push: {
							favoriteTables: tableId
						}
					}
				);
				if(type && type === "workplace"){
					res.status(200).redirect(`/workplace/${workplaceId}`);
				}else{
					res.status(200).redirect(`/${req.user.username}/boards`);
				}
				
			}
			catch {
				res.status(500).send('Error');
			}
		}
		else {
			res.status(200).redirect(`/${req.user.username}/boards`);
		}
		
	}

	
	removeFavoriteTable = async (req, res) => {
		const { tableId, type, workplaceId } = req.body;
		const _user = await User.findOne({_id: ObjectId(req.user.id)});
		if (_user.favoriteTables.indexOf(tableId) !== -1) {
			try {
				const user = await User.findOneAndUpdate(
					{ _id: ObjectId(req.user.id) },
					{
						$pull: {
							favoriteTables: tableId
						}
					}
				);
				if(type && type === "workplace"){
					res.status(200).redirect(`/workplace/${workplaceId}`);
				}else{
					res.status(200).redirect(`/${req.user.username}/boards`);
				}
			}
			catch {
				res.status(500).send('Error');
			}
		}
		else {
			res.status(200).redirect(`/${req.user.username}/boards`);
		}
		
	}
}

module.exports = new TableController()
