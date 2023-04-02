const express = require('express')
const router = express.Router()
const _ = require('lodash')

const roleUserModel = require('../Model/RoleUserModel')


    router.route("/")
        .get((req, res) => {
            roleUserModel.findAllRoleUser(
                200,
                `successfully get all role user`,
                res
            )
            
        })

        .post((req, res) => {
            const roleName = _.upperCase(req.body.roleName)
            roleUserModel.insertRoleUser(
                200,
                roleName,
                res
            )
        })

module.exports= router
