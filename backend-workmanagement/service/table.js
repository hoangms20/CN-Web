const cookieHelper = require('../helper/cookie');
const User = require('../models/user');
const Workplace = require('../models/workplace');
const Table = require('../models/table');
const ObjectId = require('mongoose').Types.ObjectId;

const checkIsFavoriteTable = async (tableId, userId) => {
    const user = await User.findOne({ _id: ObjectId(userId) });
    if (user) {
        const index = user.favoriteTables.indexOf(tableId);
        return index !== -1;
    }
    return false;
}

const getTableBoard = async user => {
    // get my table
    const owner = await Workplace.find({admin: user.id}).populate('tables');
    // get my guest table
    const _guestTable = await Table.find({ members: [user.id] });
    const _guestWorkplace = await Workplace.find({ members: [user.id] }).populate('tables');
    let guest = _guestWorkplace;

    await Promise.all(
        _guestTable.map(async item => {
            let workplace = await Workplace.findOne({id: item._id});
            const index = guest.findIndex(e => e.workplaceId === workplace.id);
            if (index === -1) {
                guest.push({
                    ...workplace,
                    tables: [item],
                });
            } else {
                const i = guest[index].tables.findIndex(e => e.id === item.id);
                if (i === -1) guest[index].tables.push(item);
            }
            return null;
        })
    );
    // get my favorite table
    let favorite = [];
    await Promise.all(
        user.favoriteTables.map(async (item) => {
            // console.log(item);
            const wp = await Workplace.findOne({ tables: {
                $in : [ObjectId(item)]
            } });
            if (wp) {
                const table = await Table.findOne({_id: ObjectId(item) });
                favorite.push({
                    workplaceId: wp.id,
                    workplaceName: wp.workplaceName,
                    table
                })
            }
            return null;
        })
    );
    // get my recently table
    let recently = [];
    await Promise.all(
        user.recentlyTables.map(async (item) => {
            // console.log(item);
            const wp = await Workplace.findOne({ tables: {
                $in : [ObjectId(item)]
            } });
            if (wp) {
                const table = await Table.findOne({_id: ObjectId(item) });
                recently.push({
                    workplaceId: wp.id,
                    workplaceName: wp.workplaceName,
                    table
                })
            }
            return null;
        })
    );
    return {
        owner,
        guest,
        favorite,
        recently,
    }
};

const deleteTable = async (tableId) => {
    await Table.deleteOne({_id: tableId || ObjectId(tableId)});
    await User.updateMany(
        {
            favoriteTables: {
                $in: [tableId || ObjectId(tableId)]
            }
        },
        {
            $pull: {
                favoriteTables: tableId || ObjectId(tableId)
            }
        }
    );
    await User.updateMany(
        {
            recentlyTables: {
                $in: [tableId || ObjectId(tableId)]
            }
        },
        {
            $pull: {
                recentlyTables: tableId || ObjectId(tableId)
            }
        }
    );
};

module.exports = {
    getTableBoard,
    checkIsFavoriteTable,
    deleteTable,
}