const express = require('express')
const homePageService = require('../../../services/v1/homePage/homePage')
const validation = require('../../../middlewares/validation')
const authService = require('../../../services/v1/auth/auth');
const authClientRequest = require('../../../middlewares/authGaurd');
let router = express.Router();

router.post('/',validation.validationHomePageCreationBody() ,authClientRequest.authClientToken ,authService.grantAccess('createOwn', 'homePage'),homePageService.createHomePage);
router.get('/:homePageId', authClientRequest.authClientToken ,authService.grantAccess('readAny', 'homePage'),homePageService.getHomePage);

module.exports = router;