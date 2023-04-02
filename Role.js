const express = require('express')
const router = express.Router()
const _ = require('lodash')

const roleUserModel = require('./Model/RoleUserModel')

router.use((req, res, next) => {
    console.log(`Time :${Date.now()}`);
    next()
})

    router.route("/role")
        .get((req, res) => {
            const roleName = _.upperCase(req.body.roleName)
            roleUserModel.insertRoleUser(roleName)
        })

        .post((req, res) => {
            roleUserModel.findAllRoleUser(
                200,
                `successfully get all role user`,
                res
            )
        })

module.exports= router
