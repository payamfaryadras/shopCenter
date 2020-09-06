const shopModel = require('../../../models/shop')
const homePageModel = require('../../../models/homePage')
const Logger = require('../logger/logger')
const logger = new Logger('app')
const {validationResult} = require('express-validator/check');
const ObjectId = require('mongoose').Types.ObjectId;

const createHomePage = async (req, res, next) => {
    logger.setLogData(req.body)
    logger.info("Request received at /createComment", req.body)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors)
        return res.status(422).json({errors: errors.array()});
    }
    const {shopId, businessDetails, description, address} = req.body

    try {
        const shop = await shopModel.findById(shopId);
        if (!shop) {
            const errorMessage = "shopId is invalid!!!"
            logger.error(errorMessage);
            return res.status(422).json(
                {
                    "errors": [{
                        "msg": errorMessage
                    }]
                }
            );
        }
        const user = res.locals.loggedInUser;
        const homePage = await homePageModel.create({
            businessDetails: businessDetails,
            address: address,
            description: description,
            shop: shop,
            user: user
        })
        if (!homePage) {
            throw new error();
        }
        let message = "homePage created successfully";
        logger.info(message)
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
                    "msg": "there was a problem creation a homePage."
                }]
            }
        );
    }
}

const getHomePage = async (req, res, next) => {
    logger.setLogData(req.body)
    logger.info("Request received at /getHomePage", req.body)

    let {homePageId} = req.params

    if (!ObjectId.isValid(homePageId)) {
        const message = 'homePageId is invalid!!';
        logger.error(message)
        return res.status(422).json({
            "errors": [{
                "msg": message
            }]
        });

    }

    let homePage = await homePageModel.findById(homePageId)

    if (!homePage) {
        let homePageNotfoundMessage = " no homePage found"
        logger.error(homePageNotfoundMessage)
        return res.status(404).json({
            "errors": [{
                "msg": homePageNotfoundMessage
            }]
        })
    }
    let message = " homePage fetched successfully";
    logger.info(message);
    return res.status(200).json({
        "success": [{
            "msg": message,
            "data": homePage
        }]
    })
}

module.exports = {
    createHomePage: createHomePage,
    getHomePage: getHomePage
}