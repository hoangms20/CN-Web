const mongoose = require('mongoose');
const { GENDER, SCOPE_WORKPLACE } = require('../constants');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema

const WorkPlaceSchema = mongoose.Schema(
    {
        _id: Number,
        workplaceName: {
            type: String,
            required: true,
        },
        category: String, // personal or group
        scope: {
            type: String,
            enum: [SCOPE_WORKPLACE.PUBLIC, SCOPE_WORKPLACE.PRIVATE,],
            default: SCOPE_WORKPLACE.PUBLIC,
        },
        thumbnail: {
            type: String,
            default: '0b92b413e83e67e1cc346ac23929848e.png'
        },
        description: String,
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        maxMembers: {
            type: Number,
            default: 50,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
        tables: [
            {
                type: Schema.Types.ObjectId,
                ref: 'tables',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

WorkPlaceSchema.plugin(AutoIncrement, { id: 'workplace_seq' });

module.exports = mongoose.model('workplace', WorkPlaceSchema);
