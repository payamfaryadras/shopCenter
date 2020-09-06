const shopModel = require('../../../models/shop')
const commentModel = require('../../../models/comment')
const Logger = require('../logger/logger')
const logger = new Logger('app')
const {validationResult} = require('express-validator/check');

const createComment = async (req, res, next) => {
    logger.setLogData(req.body)
    logger.info("Request received at /createComment", req.body)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors)
        return res.status(422).json({errors: errors.array()});
    }
    let {shopId, description} = req.body
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
        const comment = await commentModel.create({
            user: user,
            description: description,
            shop: shop
        })
        if (!comment) {
            throw new error();
        }
        let message = "comment created successfully";
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
                    "msg": "there was a problem creation a comment."
                }]
            }
        );
    }

}

const getComments = async (req, res, next) => {
    logger.setLogData(req.body)
    logger.info("Request received at /getComments", req.body)

    let {shopId} = req.params

    if (!ObjectId.isValid(shopId)) {
        const message = 'shopId is invalid!!';
        logger.error(message)
        return res.status(422).json({
            "errors": [{
                "msg": message
            }]
        });

    }

    let comments = await commentModel.find().populate("shop");
    if (!comments) {
        let commentsNotfoundMessage = " no comments found"
        logger.error(commentsNotfoundMessage)
        return res.status(404).json({
            "errors": [{
                "msg": commentsNotfoundMessage
            }]
        })
    }
    let message = " comments fetched successfully";
    logger.info(message);
    return res.status(200).json({
        "success": [{
            "msg": message,
            "data": comments
        }]
    })
}


module.exports = {
    createComment: createComment,
    getComments: getComments,

}