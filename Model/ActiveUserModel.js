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

    const newActive = await activeUser.save()

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
        __v:0
    }

    const allActive = await Active.find(queryFind, option)
    
    res.status(statusCode).json({
        activeUser:allActive,
        message: message,
        statusCode:statusCode
    })
}


const deleteOne = async (
    statusCode,
    idActive,
    res
) => {
    const queryDelete = { _id: idActive }
    const option = {
        rawResult:true
    }

    const deleteActive = await Active.findByIdAndDelete(
        queryDelete,
        option
    ).exec()

    let deleteStatus = ""
    if (deleteActive.value != null) {
        deleteStatus="successfully delete Role"
    } else {
        deleteStatus="failed delete Role"
    }

    res.status(statusCode).json({
        message: `${deleteActive.value.activeName}: ${deleteStatus}`,
        statusCode:statusCode
    })
    
}


const findAndUpdate = async (
    statusCode,
    idActive,
    updateActiveName,
    res
) => {

    const queryFind = { _id: idActive }
    const queryUpdate = { activeName: updateActiveName }
    const option = {
        rawResult:true
    }

    const updateActive = await Active.findOneAndUpdate(
        queryFind,
        queryUpdate,
        option
    ).exec()

    let updateStatus = ""
    if (updateActive.lastErrorObject.updatedExisting === true) {
        updateStatus="successfully updated"
    } else {
        updateStatus="failed updated"
    }

    res.status(statusCode).json({
        message: `${updateStatus}`,
        statusCode:statusCode
    })
    
}


module.exports = {
    insertActiveUser: insertActive,
    findAllActiveUser: findAllAcive,
    deleteActiveUser: deleteOne,
    updateActiveUser:findAndUpdate
}