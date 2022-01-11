const GFS = require('../config/gfs');

const getFileOne = async filename => {
    const gfs = GFS.createGFS();
    const files = await gfs.find({filename}).toArray();
    if (!files || files.length === 0) {
        return null;
      } else {
        return {
          fileStream: gfs.openDownloadStreamByName(filename),
          contentType: files[0].contentType,
        };
      }
};

module.exports = {
    getFileOne,
};