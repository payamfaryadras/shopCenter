const express = require('express')
const commentService = require('../../../services/v1/comment/comment')
const validation = require('../../../middlewares/validation')
const authService = require('../../../services/v1/auth/auth');
const authClientRequest = require('../../../middlewares/authGaurd');
let router = express.Router();

router.post('/', validation.validateCommentCreationBody(), authClientRequest.authClientToken, authService.grantAccess('createOwn', 'comment'), commentService.createComment);
router.get('/:shopId', authClientRequest.authClientToken, authService.grantAccess('readAny', 'comment'), commentService.getComments())

module.exports = router;