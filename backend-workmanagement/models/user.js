const mongoose = require('mongoose')
const { GENDER, ROLE_ACCOUNT } = require('../constants')
const Schema = mongoose.Schema

const UserSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		bio: String,
		role: {
			type: Number,
			enum: [ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.USER],
			default: 2,
		},
		avatar: String,
		// workPlaces: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: 'WorkPlace',
		// 	},
		// ],
		favoriteTables: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Table',
			},
		],
		recentlyTables: [
			{
				type: Schema.Types.ObjectId,
				validate: {
					validator: () => {
						return this.recentlyTables ? this.recentlyTables.length <= 4 : true;
					},
					message: 'Recently tables has max 4 tables'
				},
				ref: 'Table',
			},

		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = mongoose.model('users', UserSchema)
