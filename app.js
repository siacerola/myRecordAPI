const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('lodash')

const app = express()

app.use(
    bodyParser.json()
)

const PORT = process.env || 3000

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on PORT:${PORT}`);
    })
})