const Column = require('../models/column')
const Tag = require('../models/tag')
const ObjectId = require('mongoose').Types.ObjectId;

class ColumnController {
	createColumn = async (req, res) => {
		const columnData = {
			columnName: req.body.columnName,
			tableId: req.params.tableId,
		}

		try {
			const column = new Column(columnData)
			await column.save()
			res.redirect(`/api/table/${columnData.tableId}/columns`)
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	updateColumn = async (req, res) => {
		try {
			const tableId = req.params.tableId
			const { columnName, cards } = req.body
			const column = await Column.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						columnName,
						tableId,
					},
					$addToSet: {
						cards,
					},
				},
				{ new: true }
			)
			if (!column) {
				return res.status(400).json({
					success: false,
					message: 'column not found or invalid authentication',
				})
			}

			res.redirect(`/api/table/${tableId}/columns`)
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	deleteCard = async (req, res) => {
		try {
			const tableId = req.params.tableId
			const { columnName, tags } = req.body
			const column = await Column.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						columnName,
						tableId,
					},
					$pull: {
						tags,
					},
				},
				{ new: true }
			)
			if (!column) {
				return res.status(400).json({
					success: false,
					message: 'column not found or invalid authentication',
				})
			}

			// res.status(200).json({
			// 	success: true,
			// 	column,
			// })

			res.redirect(`/api/table/${tableId}/columns`)
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	deleteColumn = async (req, res) => {
		try {
			const tableId = req.params.tableId
			const column = await Column.findOneAndDelete({
				_id: req.params.id,
			})
			if (!column) {
				return res.status(400).json({
					success: false,
					message: 'column not found or invalid authentication',
				})
			}
			// return res.status(200).json({
			// 	success: true,
			// 	column,
			// })
			res.redirect(`/api/table/${tableId}/columns`)
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	//get all tag of column
	getAllTag = async (req, res) => {
		try {
			const tags = await Tag.find({ columnId: req.params.id })
			console.log(tags);
			return res.status(200).json({
				success: true,
				tags,
			})
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	// update order
	updateOrderColumn = async (req, res) => {
		try {
			const { data } = req.body;
			await Promise.all(
				data.map(async (item, index) => {
					const tags = item.tags.map(element => ObjectId(element));
					await Column.findByIdAndUpdate(
						{
							_id: ObjectId(item.columnId)
						},
						{
							tags: tags,
							order: index
						}
					);
					return null;
				})
			);
			res.status(200).send('Update successfully');
		}
		catch {
			res.status(500).send('Update fail');
		}	
	};
}

module.exports = new ColumnController()
