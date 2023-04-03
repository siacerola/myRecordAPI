const mongoose = require('mongoose')
const { Schema } = mongoose


// active user schema
const activeUserSchema = new Schema({
    activeName: {
        type: String,
        required: true,
        unique:true
    }
})


// active user model
const Active = mongoose.model("Active", activeUserSchema)


// insert data to active user
const insertActive = async (
    statusCode,
    ActiveStatus,
    res
) => {
    const activeUser = new Active({
        activeName:ActiveStatus
    })

    const newActive = activeUser.save()

    let saveStatus = ""
    if (newActive === activeUser) {
        saveStatus="successfully to save"
    } else {
        saveStatus="failed to save"
    }
    res.status(statusCode).json({
        message: `${activeUser.activeName} ${saveStatus}`,
        statusCode:statusCode
    })
}


const findAllAcive = async (
    statusCode,
    message,
    res
) => {
    const queryFind = {}
    const option = {
        activeName: 1,
        _id:0
    }

    const allActive = await Active.find(queryFind, option)
    
    res.status(statusCode).json({
        activeUser:allActive,
        message: message,
        statusCode:statusCode
    })
}


module.exports = {
    insertActiveUser: insertActive,
    findAllActiveUser:findAllAcive
    // findAllActiveUser: findAllRole,
    // deleteActiveUser: deleteOne,
    // updateActiveUser:findAndUpdate
}