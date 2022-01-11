const Tag = require('../models/tag')
const Column = require('../models/column')

class TagController {
	createTag = async (req, res) => {
		const tableId = req.params.tableId
		const columnId = req.params.columnId
		const { tagName } = req.body

		try {
			const tag = new Tag({
				tagName,
			})
			await tag.save()
			// return res.status(200).json({ success: true, tag })
			try {
				const column = await Column.findOneAndUpdate(
					{ _id: columnId },
					{ $addToSet: { tags: tag._id } },
					{ new: true }
				)
				return res.redirect(`/api/table/${tableId}/columns`)
			} catch (error) {}
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	updateTag = async (req, res) => {
		const tableId = req.params.tableId
		const {
			tagName,
			deadline,
			description,
			participant,
			columnId,
			label,
			comments,
			todo,
		} = req.body
		try {
			const tagUpdate = await Tag.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						tagName,
						deadline,
						description,
						columnId,
						label,
						participant,
					},
					$addToSet: {
						comments,
						todo,
					},
				},
				{ new: true }
			)

			if (!tagUpdate) {
				return res.status(400).json({
					success: false,
					message: 'tag not found or invalid authentication',
				})
			}

			// return res.status(200).json({
			// 	success: true,
			// 	tagUpdate,
			// })
			return res.redirect(`/api/table/${tableId}/columns`)
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	deleteTag = async (req, res) => {
		try {
			const tag = await Tag.findOneAndDelete({ _id: req.params.id })
			if (!tag) {
				return res.status(400).json({
					success: false,
					message: 'tag not found or invalid authentication',
				})
			}
			return res.status(200).json({
				success: true,
				tag,
			})
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}
}

module.exports = new TagController()
