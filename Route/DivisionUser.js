const express = require('express')
const router = express.Router()
const _ = require('lodash')

const divisionUserModel = require('../Model/DivisionUserModel')

router.route('/')
    .post((req, res) => {
        const divisionName = _.upperCase(req.body.divisionName)
        divisionUserModel.insertDivisionUser(
            200,
            divisionName,
            res
        )
    })

    .get((req, res) => {
        divisionUserModel.findAllDivisionUser(
            200,
            `successfully get all division user model`,
            res
        )
    })

    .delete((req, res) => {
        const idDivision = req.body.idDivision
        divisionUserModel.deleteDivisionUser(
            200,
            idDivision,
            res
        )
    })

module.exports = router
