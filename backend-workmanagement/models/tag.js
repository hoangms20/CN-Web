const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const CommentSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const TodoSchema = mongoose.Schema(
	{
		todoName: String,
		done: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const TagSchema = new mongoose.Schema(
	{
		tagName: { type: String, required: true },
		deadline: String,
		description: String,
		participant: String,
		label: String,
		comments: [CommentSchema],
		todo: [TodoSchema],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = mongoose.model('tags', TagSchema)
