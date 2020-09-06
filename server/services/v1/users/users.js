const express = require('express');
const userModel = require('../../../models/user');

const Logger = require('../logger/logger')
const logger = new Logger('app')

const getUserDetails = async (req, res, next) => {
    logger.info("Request received at /getUserDetails")
    let {userId} = req.params;

    let user = await userModel.findById(userId).select('name , email');

    if (!user) {
        let message = " no user found";
        logger.error(message)
        return res.status(404).json({
            "errors": [{
                "msg": message
            }]
        })
    }
    let message = " user fetched successfully";
    logger.info(message)
    return res.status(200).json({
        "success": [{
            "msg": message,
            "data": user
        }]
    })
}

const getAndEnableUser = async (req, res, next) => {
    logger.info("Request received at /getAndEnableUser")
    let {userId} = req.params;

    let user = await userModel.findById(userId).select('name , email , enabled');
    if (!user) {
        let message = " no user found";
        logger.error(message)
        return res.status(404).json({
            "errors": [{
                "msg": message
            }]
        })
    }
    user.enabled =true
    await user.save()
    let message = " user enabled successfully";
    logger.info(message)
    return res.status(200).json({
        "success": [{
            "msg": message,
            "data": user
        }]
    })
}

const getUsers = async (req,res,next) => {
    logger.info("Request received at /getAndEnableUser")
    const users = await User.find();
    if (!users) {
        let message = " no user found";
        logger.error(message)
        return res.status(404).json({
            "errors": [{
                "msg": message
            }]
        })
    }
    let message = " users fetched successfully";
    logger.info(message)
    return res.status(200).json({
        "success": [{
            "msg": message,
            "data": users
        }]
    })
}

module.exports = {
    getUserDetails: getUserDetails,
    getAndEnableUser:getAndEnableUser,
    getUsers:getUsers
}