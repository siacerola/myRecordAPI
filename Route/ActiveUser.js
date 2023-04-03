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

module.exports= router