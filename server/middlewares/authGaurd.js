const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/env_config/config');
const userModel = require('../models/user');
const Logger = require('../services/v1/logger/logger')
const logger = new Logger('app')

const authClientToken = async (req, res, next) => {
    logger.info("Request received at /authClientToken");
    const token = req.headers['x-access-token'];

    if (!token) {
        let message = " No token provided"
        logger.error(message)
        return res.status(401).json({
            "errors": [{
                "msg": message
            }]
        });
    }
    try {
        const {id, exp} = await jwt.verify(token, config.secret);
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                error: "JWT token has expired, please login to obtain a new one"
            });
        }
        res.locals.loggedInUser = await userModel.findById(id);
    } catch (e) {
        let message = "Invalid Token"
        logger.error(message)
        return res.status(401).json({
            "errors": [{
                "msg": message
            }]
        });
    }
    return next();


}

module.exports = {
    authClientToken: authClientToken
}