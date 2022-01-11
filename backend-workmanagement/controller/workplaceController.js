const UserHelper = require('../helper/findUser');
const Workplace = require('../models/workplace');
const cookieHelper = require('../helper/cookie');
const tableService = require('../service/table')

const ObjectId = require('mongoose').Types.ObjectId;

const createWorkplace = async (req, res) => {
    let { workplaceName, workplaceCategory, workplaceDescription, members } = req.body;
    
    let _members;
    if (members){
        try {
            const regex = / /g;
            _members = members.replace(regex, '');
            _members = _members.split(';');
            _members = await Promise.all(
                _members.map(async (element) => {
                    return UserHelper.getId(element);
                })
            );
        } catch {
            res.status(500).send("Có lỗi xảy ra");
        }
    }
    else _members = [];
    // console.log(_members);
    const isExist = await Workplace.exists({workplaceName});
    if (isExist) {
        return res
            .status(500)
            .json({ success: false, message: 'Workplace has existed' })
    }
    const user = await cookieHelper.getUserByCookie(req.cookies);
    const workplace = await Workplace.create({
        admin: user.id,
        workplaceName,
        category: workplaceCategory,
        description: workplaceDescription,
        members: _members,
    });
    return res.status(200).redirect(`/${req.user.username}/boards`);
};

const updateTableWorkplace = async (workplaceId, tableId) => {
    await Workplace.findByIdAndUpdate(
        {_id: workplaceId},
        {
            $push: {
                tables: ObjectId(tableId),
            }
        }
    );
};

const getWorkplaceById = async (req, res) => {
    const { workplaceId } = req.params;
    const data = await Workplace.findById({_id: workplaceId}).populate('tables');
    const index = data.members.indexOf(ObjectId(req.user.id));
    if (data.scope === 'PUBLIC' || index !== -1 || ObjectId(req.user.id).equals(data.admin)) {
        res.render('workspace_detail/workspace_detail.ejs', {isLogin: true, user: req.user, data});
    }
    else {
        res.status(500).send('<h1 style="color: red;">403</h1><br/><span>Bạn không có quyền</span>');
    }
};

const deleteWorkplace = async (req, res) => {
    const { id } = req.params;
    const wp = await Workplace.findById({_id: id});
    if (wp) {
        if (ObjectId(req.user.id).equals(wp.admin)) {
            for(let tableId of wp.tables) {
                await tableService.deleteTable(tableId);
            }
            await Workplace.deleteOne({_id: id});
        }
        else {
            res.status(500).send('<h1 style="color: red;">403</h1><br/><span>Bạn không có quyền</span>');
        }
    }
    else {
        res.status(500).send('Không tìm thấy workplace');
    }
    res.redirect('/');
}
const updateThumbnail = async (req, res) => {
    const { workplaceId } = req.params;
    const {fileName } = req.body;
    const data = await Workplace.findById({_id: workplaceId});
    if (ObjectId(req.user.id).equals(data.admin)) {
        await Workplace.findByIdAndUpdate(
            {_id: workplaceId},
            {
                thumbnail: fileName
            }
        );
        return res.status(200).redirect(`/workplace/${workplaceId}`);
    }
    else {
        res.status(500).send('<h1 style="color: red;">403</h1><br/><span>Bạn không có quyền</span>');
    }
};

const updateworkplace = async (req, res) => {
    const { workplaceId } = req.params;
    const {workplaceName, category, description } = req.body;
    const data = await Workplace.findById({_id: workplaceId});
    if (ObjectId(req.user.id).equals(data.admin)) {
        await Workplace.findByIdAndUpdate(
            {_id: workplaceId},
            {
                workplaceName: workplaceName,
                category: category,
                description: description
            }
        );
        return res.status(200).redirect(`/workplace/${workplaceId}`);
    }
    else {
        res.status(500).send('<h1 style="color: red;">403</h1><br/><span>Bạn không có quyền</span>');
    }
}


const updatescope = async (req, res) => {
    const { workplaceId } = req.params;
    const { type} = req.body;
    const data = await Workplace.findById({_id: workplaceId});
    if (ObjectId(req.user.id).equals(data.admin)) {
        await Workplace.findByIdAndUpdate(
            {_id: workplaceId},
            {
                scope: type
            }
            
        );
        return res.status(200).redirect(`/workplace/${workplaceId}`);
    }
    else {
        res.status(500).send('<h1 style="color: red;">403</h1><br/><span>Bạn không có quyền</span>');
    }
};

module.exports = {
    createWorkplace,
    updateTableWorkplace,
    getWorkplaceById,
    deleteWorkplace,
    updateThumbnail,
    updateworkplace,
    updatescope
}