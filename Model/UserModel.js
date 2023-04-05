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
    }
},
    {
        timestamps:true
    }
)

const User = mongoose.model("User", userSchema,)

const insertOne = async (
    statusCode,
    userName,
    userPassword,
    userEmail,
    userPhoneNumber,
    roleId,
    activeId,
    divisionId,
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

const findAll = async (
    statusCode,
    message,
    res
) => {
    const queryFind = {}
    const option = {
        __v:0
    }

    const allUser = await User.find(
        queryFind,
        option
    )

    res.status(statusCode).json({
        user:allUser,
        message: message,
        statusCode:statusCode
    })
}

const findAndJoint = async (
    statusCode,
    message,
    res
) => {
    const queryFind = {}
    const queryLookUpRole = {
        $lookup: {
            from: 'roles',
            localField:'fkRoleId',
            foreignField: '_id',
            as: 'roleDetail'
        }
    }
    const queryLookUpActive = {
        $lookup: {
            from: 'actives',
            localField:'fkActiveId',
            foreignField: '_id',
            as: 'activeDetail'
        }
    }

    const queryLookUpDivision = {
        $lookup: {
            from: 'divisions',
            localField:'fkDivisionId',
            foreignField: '_id',
            as: 'divisionDetail'
        }
    }

    const options = {
        updatedAt:0,
        __v:0
    }

    const findAndJointTable = await User.find(queryFind,options)
        .populate('fkRoleId')
        .populate('fkActiveId')
        .populate('fkDivisionId')
        .exec()
    
    // res.send(findAndJointTable)
    

    // const findAndJointCollection = await User.aggregate([
    //     queryLookUpRole,
    //     queryLookUpActive,
    //     queryLookUpDivision
    // ])

    // res.status(statusCode).json(
    //     {
    //         userDetail: findAndJointTable,
    //         message:message,
    //         statusCode:statusCode
    //     }
    // )

    const lengthData = Object.keys(findAndJointTable).length
    console.log(lengthData);
    res.send(findAndJointTable[0].userName)
}

const deleteOne = async (
    statusCode,
    userId,
    res
) => {
    const queryDelete = { _id: userId }
    const option = {
        rawResult:true
    }

    const deleteUser = await User.findByIdAndDelete(
        queryDelete,
        option
    )

    let deleteStatus=""
    if (deleteUser.value != null) {
        deleteStatus="successfully delete Role"
    } else {
        deleteStatus="failed delete Role"
    }

    res.status(statusCode).json({
        message: `${deleteUser.value.userName}: ${deleteStatus}`,
        statusCode:statusCode
    })
}

module.exports = {
    insertUser: insertOne,
    findAllUser: findAll,
    findDetailUser: findAndJoint,
    deleteUser : deleteOne
}