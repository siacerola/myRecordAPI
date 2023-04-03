const express = require('express')
const router = express.Router()
const _ = require('lodash')

const activeUserModel = require('../Model/ActiveUserModel')

router.route("/")
    .post((req, res) => {
        const activeName = _.upperCase(req.body.activeName)
        activeUserModel.insertActiveUser(
            200,
            activeName,
            res
        )
    })

    .get((req, res) => {
        activeUserModel.findAllActiveUser(
            200,
            `successfully get all active user model`,
            res
        )
    })

    .delete((req, res) => {
        const idActive = req.body.idActive
        activeUserModel.deleteActiveUser(
            200,
            idActive,
            res
        )
    })

    .patch((req, res) => {
        const idActive = req.body.idActive
        const updateActiveName = req.body.updateActiveName
        activeUserModel.updateActiveUser(
            200,
            idActive,
            updateActiveName,
            res
        )
    })


module.exports= router