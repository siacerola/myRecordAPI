const express = require('express')
const router = express.Router()
const _ = require('lodash')

const divisionUserModel = require('../Model/DivisionUserModel')

router.route('/')
    .post((req, res) => {
        const divisionName = req.body.divisionName
        divisionUserModel.insertDivisionUser(
            200,
            divisionName,
            res
        )
    })

module.exports = router
