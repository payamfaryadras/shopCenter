const express = require('express');
const {validationResult} = require('express-validator/check');
const shopModel = require('../../../models/shop')
const productModel = require('../../../models/product')

const Logger = require('../logger/logger')
const logger = new Logger('app')

const getShopDetails = async (req, res, next) => {
    logger.setLogData(req.body)
    logger.info("Request received at /getShopDetails", req.body)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error(errors)
        return res.status(422).json({errors: errors.array()});
    }

    let {shopId} = req.params

    let shop = await shopModel.findById(shopId)

    if (!shop) {
        let shopNotfoundMessage = " no shop found"
        logger.error(shopNotfoundMessage)
        return res.status(404).json({
            "errors": [{
                "msg": shopNotfoundMessage
            }]
        })
    }
    let message = " shop fetched successfully";
    logger.info(message);
    return res.status(200).json({
        "success": [{
            "msg": message,
            "data": shop
        }]
    })
}

const createShop = async (req, res, next) => {
    logger.setLogData(req.body)
    logger.info("Request received at /createShop", req.body)

    let {name, description, url} = req.body
    try {
        const user = res.locals.loggedInUser;
        const shop = await shopModel.create({
            name: name,
            description: description,
            url: url,
            user: user
        })

        if (!shop) {
            throw new error();
        }
        let message = "shop created successfully";
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
                    "msg": "there was a problem creation a shop."
                }]
            }
        );
    }
    const message = "shop created successfully";
    logger.info(message)
    return res.status(201).json({
        "success": [{
            "msg": message
        }]
    });
}

const addProduct = async (req, res, next) => {
    logger.info("Request received at /addProduct", req.body)

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error(errors)
        return res.status(422).json({errors: errors.array()});
    }
    let {shopId, name, description, price, count} = req.body

    const shop = await shopModel.findById(shopId)

    if (!shop) {
        let shopNotfoundMessage = " no shop found"
        logger.error(shopNotfoundMessage)
        return res.status(404).json({
            "errors": [{
                "msg": shopNotfoundMessage
            }]
        })
    }
    try {
        const product = await productModel.create({
            name: name,
            description: description,
            price: price,
            count: count
        })
        shop.products = product
        await shop.save()
        const message = "product added successfully";
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
                    "msg": "there was a problem add a product."
                }]
            }
        );
    }
}

const removeShop = async (req, res, next) => {
    logger.info("Request received at /removeShop", req.body)
    let {shopId} = req.params;
    try {
        await shopModel.remove({_id: shopId}, function (err) {
            if (!err) {
                const message = "shop removed successfully";
                logger.info(message)
                return res.status(201).json({
                    "success": [{
                        "msg": message
                    }]
                });
            } else {
                logger.error(err);
                return res.status(500).json(
                    {
                        "errors": [{
                            "msg": "there was a problem remove a shop."
                        }]
                    }
                );
            }
        });


    } catch (error) {
        logger.error(error);
        return res.status(500).json(
            {
                "errors": [{
                    "msg": "there was a problem remove a shop."
                }]
            }
        );
    }

}

const getTopProducts = async(req,res,next) =>{
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

    let products = await shopModel.find().populate("product");
    if (!products) {
        let productsNotfoundMessage = " no products found"
        logger.error(productsNotfoundMessage)
        return res.status(404).json({
            "errors": [{
                "msg": productsNotfoundMessage
            }]
        })
    }
    let message = " products fetched successfully";
    logger.info(message);
    return res.status(200).json({
        "success": [{
            "msg": message,
            "data": products
        }]
    })
}

module.exports = {
    getShopDetails: getShopDetails,
    createShop: createShop,
    removeShop: removeShop,
    addProduct: addProduct,
    getTopProducts:getTopProducts
}
