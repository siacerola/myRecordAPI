const express = require('express')
const bodyParser = require('body-parser')

const db = require('./connection')

const RoleRoute = require('./Route/RoleUser')
const ActiveRoute = require('./Route/ActiveUser')
const DivisionRoute = require('./Route/DivisionUser')

const app = express()


app.use(
    bodyParser.json()
)

const PORT = process.env.PORT || 3000

// local database
const dbName ="myrecordDB"
const mongoUrl = "mongodb://127.0.0.1:27017/"

db.connectDB(mongoUrl, dbName)


app.use('/role', RoleRoute)
app.use('/active',ActiveRoute)
app.use('/division',DivisionRoute)

db.connectDB(mongoUrl,dbName).then(() => {
    app.listen(PORT, () => {
        console.log(`listening on PORT:${PORT}`);
    })
})