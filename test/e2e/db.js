const connect = require('../../lib/connect');
const url = 'mongodb://localhost:27017/space-sim';
const mongoose = require('mongoose');

before( () => connect(url));
after( () => mongoose.connection.close());

module.exports = {
    drop() {
        return mongoose.connection.dropDatabase();
    }
};