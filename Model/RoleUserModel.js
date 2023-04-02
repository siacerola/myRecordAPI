const mongoose = require('mongoose')
const { Schema } = mongoose


const roleSchema = new Schema({
    roleName: {
        type: String,
        required:true
    }
})

const Role = mongoose.model("Role", roleSchema)

const newRoleUser = async (roleName) => {
    const roleUser = new Role({
        roleName:roleName
    })

    const newRole = await roleUser.save()
    if (newRole === roleUser) {
        console.log(`${roleUser} successfully saved`);
    } else {
        console.log(`${roleUser} cant be saved`);
    }
}

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


module.exports = {
    insertRoleUser: newRoleUser,
    findAllRoleUser: findAllRole
}