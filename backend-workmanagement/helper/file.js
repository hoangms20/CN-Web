const multer  = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@manager-work-app.n39kd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connection = mongoose.connect(url);
const storage = new GridFsStorage({ 
    db: connection,
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                  if (err) {
                    return reject(err);
                  }
                  const filename = buf.toString('hex') + path.extname(file.originalname);
                  const fileInfo = {
                    filename: filename,
                    bucketName: 'photos'
                  };
                  req.body.fileName = filename;
                  console.log(filename);
                  resolve(fileInfo);
                });
            });
        } else {
            return null;
        }
    },
});
const upload = multer({storage});

module.exports = upload;