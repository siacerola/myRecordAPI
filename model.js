const mongoose = require('mongoose')
const {Schema} = mongoose

const roleSchema = {
    roleName: {
        type: String,
        required:true
    }
}

const activeUserSchema = new Schema({
    activeName: {
        type: String,
        required:true
    }
})

const divisionSchema = new Schema({
    divisionName: {
        type: String,
        required:true
    }
})

const userSchema = new Schema({
    userName: {
        type: String,
        required:true
    },
    userPassword: {
        type: String,
        required: true,
        minLenght:8
    },
    userEmail: {
        type: String,
        required:true
    },
    userPhoneNumber: {
        type: String,
        required:true
    }

})