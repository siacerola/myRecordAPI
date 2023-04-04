const express = require('express')
const router = express.Router()
const _ = require('lodash')

const userModel = require('../Model/UserModel')

router.route('/')
    .post((req, res) => {
        const userName = _.upperCase(req.body.userName)
        const userPassword = req.body.userPassword
        const userEmail = req.body.userEmail
        const userPhoneNumber = req.body.userPhoneNumber
        const roleId = req.body.roleId
        const activeId = req.body.activeId
        const divisionId = req.body.divisionId

        userModel.insertUser(
            200,
            userName,
            userPassword,
            userEmail,
            userPhoneNumber,
            roleId,
            activeId,
            divisionId,
            res
        )
    })

    .get((req, res) => {
        // userModel.findAllUser(
        //     200,
        //     `successfully get user model`,
        //     res
        // )

        userModel.findDetailUser(
            200,
            `successfully get detail user model`,
            res
        )
    })

module.exports = router