const mongoose = require('mongoose')
const { Schema } = mongoose


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
    },
    fkRoleId: {
        type: Schema.Types.ObjectId,
        ref:"Role"
    },
    fkActiveId: {
        type: Schema.Types.ObjectId,
        ref:"Active"
    },
    fkDivisionId: {
        type: Schema.Types.ObjectId,
        ref:"Division"
    },
    cretatedDate: {
        type:Date
    }
})

const User = mongoose.model("User", userSchema)

const insertOne = async (
    statusCode,
    userName,
    userPassword,
    userEmail,
    userPhoneNumber,
    roleId,
    activeId,
    divisionId,
    createdDate,
    res
) => {
    const newUser = new User()

    newUser.userName = userName
    newUser.userPassword = userPassword
    newUser.userEmail = userEmail
    newUser.userPhoneNumber = userPhoneNumber
    newUser.fkRoleId = roleId
    newUser.fkActiveId = activeId
    newUser.fkDivisionId = divisionId
    newUser.cretatedDate = createdDate
    
    const saveUser = await newUser.save()

    let saveStatus=""
    if (newUser === saveUser) {
        saveStatus="successfully to save"
    } else {
        saveStatus="failed to save"
    }
    res.status(statusCode).json({
        message: `${newUser.userName} ${saveStatus}`,
        statusCode:statusCode
    })
}

module.exports = {
    insertUser:insertOne
}