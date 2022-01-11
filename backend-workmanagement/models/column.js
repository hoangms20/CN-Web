const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const ColumnSchema = Schema(
	{
		columnName: {
			type: String,
			required: true,
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: 'tags',
			},
		],
		tableId: {
			type: Schema.Types.ObjectId,
			ref: 'tables',
		},
		order: Number,
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = mongoose.model('columns', ColumnSchema)
