const mongoose = require('mongoose')
const { SCOPE_TABLE } = require('../constants')
const Schema = mongoose.Schema

const TableSchema = Schema(
	{
		tableName: {
			type: String,
			required: true,
		},
		description: String,
		background: String,
		thumbnail: String,
		description: String,
		scope: {
			type: String,
			enum: [SCOPE_TABLE.PUBLIC, SCOPE_TABLE.PRIVATE],
			default: SCOPE_TABLE.PUBLIC,
		},
		maxMembers: {
			type: Number,
			default: 10,
		},
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
		],
		admin: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		labels: [
			{
				labelName: String,
				color: String,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = mongoose.model('tables', TableSchema)
