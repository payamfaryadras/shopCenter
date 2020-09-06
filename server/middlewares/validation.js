const {body} = require('express-validator/check')
const ObjectId= require('mongoose').Types.ObjectId;

const validateRegistrationBody = () => {
    return [
        body('name')
            .exists()
            .withMessage('name field is required')
            .isLength({min: 3})
            .withMessage('name must be greater than 3 letters'),
        body('email').exists()
            .withMessage('email field is required')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .exists()
            .withMessage('password field is required')
            .isLength({min: 8, max: 12})
            .withMessage('password must be in between 8 to 12 characters long'),
        body('role')
            .exists()
            .withMessage("role field is required")
    ]
}

const validateLoginBody = () => {
    return [
        body('email').exists()
            .withMessage('email field is required')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .exists()
            .withMessage('password field is required')
            .isLength({min: 8, max: 12})
            .withMessage('password must be in between 8 to 12 characters long')
    ]
}

const validateShopCreationBody = () => {
    return [
        body('name')
            .exists()
            .withMessage('name field is required')
            .isLength({min: 3})
            .withMessage('name must be greater than 3 letters'),
        body('description')
            .exists()
            .withMessage('description field is required')
            .isLength({min: 3})
            .withMessage('description must be greater than 3 letters')]
}

const validateCommentCreationBody = () => {
    return [
        body('shopId')
            .exists()
            .withMessage('shopId field is required')
            .custom(value => {
                if(!ObjectId.isValid(value)){
                    throw new Error('shopId is invalid!!');
                }
                return true
            }),
        body('description')
            .exists()
            .withMessage('description field is required')
            .isLength({min: 3})
            .withMessage('description must be greater than 3 letters')]
}

const validationProductCreationBody = () => {
  return [  body('name')
        .exists()
        .withMessage('name field is required')
        .isLength({min: 3})
        .withMessage('name must be greater than 3 letters'),
        body('description')
            .exists()
            .withMessage('description field is required')
            .isLength({min: 3})
            .withMessage('description must be greater than 3 letters'),
    body("count")
        .exists()
        .withMessage('count field is required')
        .isLength({min: 1})
        .withMessage('count must be greater than 1 letters'),
    body("price")
        .exists()
        .withMessage("price field is required"),
    body('shopId')
        .exists()
        .withMessage('shopId field is required')
        .custom(value => {
            if(!ObjectId.isValid(value)){
                throw new Error('shopId is invalid!!');
            }
            return true
        })]
}

const validationHomePageCreationBody = () => {
    return [  body('businessDetails')
        .exists()
        .withMessage('businessDetails field is required')
        .isLength({min: 10})
        .withMessage('businessDetails must be greater than 3 letters'),
        body('description')
            .exists()
            .withMessage('description field is required')
            .isLength({min: 3})
            .withMessage('description must be greater than 3 letters'),
        body("address")
            .exists()
            .withMessage('address field is required')
            .isLength({min: 3})
            .withMessage('address must be greater than 1 letters'),
        body('shopId')
            .exists()
            .withMessage('shopId field is required')
            .custom(value => {
                if(!ObjectId.isValid(value)){
                    throw new Error('shopId is invalid!!');
                }
                return true
            })]
}

module.exports = {
    validateRegistrationBody: validateRegistrationBody,
    validateLoginBody: validateLoginBody,
    validateShopCreationBody: validateShopCreationBody,
    validateCommentCreationBody:validateCommentCreationBody,
    validationProductCreationBody:validationProductCreationBody,
    validationHomePageCreationBody:validationHomePageCreationBody
}
