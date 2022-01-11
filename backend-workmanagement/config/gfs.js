const mongoose = require('mongoose');
const connection = require('../config/DBConnect');

const createGFS = () => {
    const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@manager-work-app.n39kd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    mongoose.connect(url, {
        autoIndex: false,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'photos' });
}

module.exports = {
    createGFS,
};