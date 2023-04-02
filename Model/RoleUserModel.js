const { startCase } = require('lodash')
const mongoose = require('mongoose')
const { Schema } = mongoose


const roleSchema = new Schema({
    roleName: {
        type: String,
        required: true,
        unique:true
    }
})

const Role = mongoose.model("Role", roleSchema)

// insert roleUser
const insertRole = async (
    statusCode,
    roleName,
    res
) => {
    const roleUser = new Role({
        roleName:roleName
    })

    const newRole = await roleUser.save()
    let saveStatus=""
    if (newRole === roleUser) {
        saveStatus="successfully to save"
    } else {
        saveStatus="failed to save"
    }
    res.status(statusCode).json({
        message: `${roleUser.roleName} ${saveStatus}`,
        statusCode:statusCode
    })
}


// find All Role User
const findAllRole = async (
    statusCode,
    message,
    res
) => {
    const findAll = {}
    const option = {
        roleName: 1,
        _id:0
    }
    const allRole = await Role.find(findAll,option)
    // res.send(allRole)
    res.status(statusCode).json({
        roleUser:allRole,
        message:message,
        statusCode:statusCode
    })
}


// delete specific role user
const deleteOne = async (
    statusCode,
    idRole,
    res
) => {
    const queryDelete = {_id:idRole}
    const option = {
        rawResult:true
    }
    const deleteRole = await Role.findByIdAndDelete(
        queryDelete,
        option
    ).exec()
    
    let deleteStatus=""
    if (deleteRole.value != null) {
        deleteStatus="successfully delete Role"
    } else {
        deleteStatus="failed delete Role"
    }

    res.status(statusCode).json({
        message: `${deleteRole.value.roleName}: ${deleteStatus}`,
        statusCode:statusCode
    })
}


// update sapecific role user
const findAndUpdate = async (
    statusCode,
    idRole,
    roleName,
    res
) => {
    const queryFind = { _id: idRole }
    const queryUpdate = {
        roleName:roleName
    }
    const option = {
        rawResult:true
    }

    const updateRole = await Role.findOneAndUpdate(
        queryFind,
        queryUpdate,
        option
    ).exec()

    let updateStatus=""
    if (updateRole.lastErrorObject.updatedExisting === true) {
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
    insertRoleUser: insertRole,
    findAllRoleUser: findAllRole,
    deleteRoleUser: deleteOne,
    updateRoleUser:findAndUpdate
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


