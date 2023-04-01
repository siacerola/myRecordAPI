const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('lodash')

const db = require('./connection')

const app = express()

app.use(
    bodyParser.json()
)

const PORT = process.env.PORT || 3000

// local database
const dbName ="myrecordDB"
const mongoUrl = "mongodb://127.0.0.1:27017/"

db.connectDB(mongoUrl, dbName)

const transactionSchema = {
    totalAmount: {
        type: Number,
        required:true
    }
}

const userSchema = {
    
}

app.route("/transaction")
    .get(async (req, res) => {
        
    })


db.connectDB(mongoUrl,dbName).then(() => {
    app.listen(PORT, () => {
        console.log(`listening on PORT:${PORT}`);
    })
})