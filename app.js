const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('lodash')

const db = require('./connection')
const roleUserModel = require('./Model/RoleUserModel')
const res = require('express/lib/response')

const app = express()

app.use(
    bodyParser.json()
)

const PORT = process.env.PORT || 3000

// local database
const dbName ="myrecordDB"
const mongoUrl = "mongodb://127.0.0.1:27017/"

db.connectDB(mongoUrl, dbName)


app.route("/transaction")
    .get(async (req, res) => {
        
    })

app.route("/role")
    .get((req, res) => {
        const roleName = req.body.roleName
        roleUserModel.insertRoleUser(roleName)
    })
    
    .post((req, res) => {
    roleUserModel.findAllRoleUser(
        200,
        `successfully get all role user`,
        res
    )
})


db.connectDB(mongoUrl,dbName).then(() => {
    app.listen(PORT, () => {
        console.log(`listening on PORT:${PORT}`);
    })
})