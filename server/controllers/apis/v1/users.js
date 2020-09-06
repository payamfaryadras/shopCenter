const express = require('express');
const userService = require('../../../services/v1/users/users');
const authService = require('../../../services/v1/auth/auth');
const accessControlService = require('../../../services/v1/auth/accessControl')
const authClientRequest = require('../../../middlewares/authGaurd');
let router = express.Router();



router.get('/:userId', authClientRequest.authClientToken ,authService.grantAccess('readOwn', 'profile'),userService.getUserDetails);
router.get('/', authClientRequest.authClientToken, authService.grantAccess('readAny', 'profile'), userService.getUsers);
router.put('/:userId', authClientRequest.authClientToken, authService.grantAccess('updateAny', 'profile'), userService.getAndEnableUser);

module.exports = router;