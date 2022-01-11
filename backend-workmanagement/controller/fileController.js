const fileService = require('../service/file');

const uploadFile = (req, res) => {
    req.send('Upload successfully');
};
const getFile = async (req, res) => {
    const { filename } = req.params;
    let fileObject = await fileService.getFileOne(filename);
    if (!fileObject) {
        fileObject = await fileService.getFileOne('ee8c43af6de3e46294ba65c032468a37.png');
    }
    const { fileStream, contentType } = fileObject;
    res.setHeader('content-type', contentType);
    fileStream.pipe(res);
};

module.exports = {
    uploadFile,
    getFile,
};