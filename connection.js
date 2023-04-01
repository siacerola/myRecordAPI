const mongoose = require('mongoose')

const connectDB = async (mongoUrl,dbName) => {
    try {
        // local database
        const conn = await mongoose.connect(mongoUrl)

        // cloud atlas database
        // const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = {
    connectDB:connectDB
}