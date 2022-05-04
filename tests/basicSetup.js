const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongodb = undefined;

//Connect to db in-memory
module.exports.connect = async() =>{
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();

    const mongooseOpts = {
        useNewUrlParser: true
    };

    await mongoose.connect(uri, mongooseOpts);
};

//Drop db and close connection
module.exports.closeDatabase = async() =>{
    if (mongodb) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongodb.stop();
    }
};

//Clear db
module.exports.clearDatabase = async() =>{
    if (mongodb) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};