const userController = require('../../controllers/apis/v1/users');
const authController = require('../../controllers/apis/v1/auth');
const shopController = require('../../controllers/apis/v1/shop');
const commentController = require('../../controllers/apis/v1/comment');
const homePageController = require('../../controllers/apis/v1/homePage');

const express = require('express');
let router = express.Router();
router.use('/users', userController);
router.use('/auth', authController);
router.use('/shop',shopController);
router.use('/comments',commentController);
router.use('/homePages',homePageController)
module.exports = router;