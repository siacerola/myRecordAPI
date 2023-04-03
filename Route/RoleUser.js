const express = require('express')
const router = express.Router()
const _ = require('lodash')

const roleUserModel = require('../Model/RoleUserModel')


router.route("/")
    // create or insert data to role user model
    .post((req, res) => {
        const roleName = _.upperCase(req.body.roleName)
        roleUserModel.insertRoleUser(
            200,
            roleName,
            res
        )
    })
    
    // read or get data from role user model
    .get((req, res) => {
        roleUserModel.findAllRoleUser(
            200,
            `successfully get all role user model`,
            res
        )       
    })


    // update specific role user model
    .patch((req, res) => {
        const roleId = req.body.roleId
        const roleName = _.upperCase(req.body.roleName)
        roleUserModel.updateRoleUser(
            200,
            roleId,
            roleName,
            res
        )
    })

    // delete specific role user model
    .delete((req, res) => {
        const roleId = req.body.roleId
        roleUserModel.deleteRoleUser(
            200,
            roleId,
            res
        )
    })

module.exports= router
