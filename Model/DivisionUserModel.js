const mongoose = require('mongoose')
const { Schema } = mongoose


const divisionSchema = new Schema({
    divisionName: {
        type: String,
        required: true,
        unique:true
    }
})


const Division = mongoose.model('Division', divisionSchema)


const insertDivision = async (
    statusCode,
    divisionName,
    res
) => {
    const divisionUser = new Division({
        divisionName:divisionName
    })

    const newDivision = await divisionUser.save()
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


module.exports = {
    insertDivisionUser:insertDivision
}