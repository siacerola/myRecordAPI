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
    if (newDivision === divisionUser) {
        saveStatus="successfully to save"
    } else {
        saveStatus="failed to save"
    }
    res.status(statusCode).json({
        message: `${divisionUser.divisionName} ${saveStatus}`,
        statusCode:statusCode
    })
}


const findAllDivision = async (
    statusCode,
    message,
    res
) => {
    const queryFind = {}
    const option = {
        __v:0
    }

    const allDivision = await Division.find(
        queryFind,
        option
    )
    
    res.status(statusCode).json({
        divisionUser: allDivision,
        message: message,
        statusCode:statusCode
    })
}

const deleteOne = async (
    statusCode,
    idDivision,
    res
) => {
    const queryFind = { _id: idDivision }
    const option = {
        rawResult:true
    }

    const deleteDivision = await Division.findByIdAndDelete(
        queryFind,
        option
    ).exec()

    let deleteStatus=""
    if (deleteDivision.value != null) {
        deleteStatus="successfully delete Role"
    } else {
        deleteStatus="failed delete Role"
    }

    res.status(statusCode).json({
        message: `${deleteDivision.value.divisionName}: ${deleteStatus}`,
        statusCode:statusCode
    })
}


module.exports = {
    insertDivisionUser: insertDivision,
    findAllDivisionUser: findAllDivision,
    deleteDivisionUser: deleteOne
}