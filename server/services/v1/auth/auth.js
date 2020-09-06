const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator/check');

const config = require('../../../config/env_config/config');
const userModel = require('../../../models/user');

const {roles} = require('./accessControl')

const Logger = require('../logger/logger')
const logger = new Logger('app')

const register = async (req, res, next) => {
    logger.info("Request received at /register")

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error(JSON.stringify(errors.array()));
        return res.status(422).json({errors: errors.array()});
    }

    let {name, email, password, role} = req.body;

    let isEmailExists = await userModel.findOne({"email": email});

    if (isEmailExists) {
        let message = "email already exists"
        logger.error(message)
        return res.status(409).json({
            "errors": [{
                "msg": message
            }]
        })
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    try {
        let user = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role || "basic"
        });
        const accessToken = jwt.sign({userId: user.id}, config.secret, {
            expiresIn: "1d"
        });
        user.accessToken = accessToken;
        await user.save();

        if (!user) {
            throw new error();
        }
        let message = "user registered successfully";
        logger.info(message);
        return res.status(201).json({
            "success": [{
                "msg": message
            }]
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json(
            {
                "errors": [{
                    "msg": "there was a problem registering a user."
                }]
            }
        );
    }


}

const login = async (req, res, next) => {
    logger.info("Request received at /login")
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error(errors)
        return res.status(422).json({errors: errors.array()});
    }

    let {email, password} = req.body

    try {
        const user = await userModel.findOne({"email": email});
        if (user.enabled === false) {
            let message = "The user is disable!!!"
            logger.error(message)
            return res.status(401).json({
                "errors": [{
                    "msg": message
                }]
            })
        }

        let isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) {
            let message = "email/password is wrong"
            logger.error(message)
            return res.status(401).json({
                "errors": [{
                    "msg": message
                }]
            })
        }

        let token = jwt.sign({id: user.id}, config.secret, {expiresIn: "1d"});
        await userModel.findByIdAndUpdate(user.id);
        res.locals.loggedInUser = user
        let message = "user login successfully";
        logger.info(message)
        res.status(200).json({
            "success": [{
                "msg": message,
                "email": email,
                "token": token,
                "role": user.role
            }]
        })
    } catch (error) {
        logger.error(error);
        return res.status(500).json(
            {
                "errors": [{
                    "msg": "there was a problem login a user."
                }]
            }
        );
    }

}

const grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            logger.info("Request received at /grantAccess")
            const permission = roles.can(res.locals.loggedInUser.role)[action](resource);
            if (!permission.granted) {
                const message = "You don't have enough permission to perform this action"
                logger.error(message)
                return res.status(401).json({
                    error: message
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    register: register,
    login: login,
    grantAccess: grantAccess,

}