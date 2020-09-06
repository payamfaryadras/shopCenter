const express = require('express')
const shopService = require('../../../services/v1/shop/shop')
const validation = require('../../../middlewares/validation')
const authClientRequest = require('../../../middlewares/authGaurd');
const authService = require('../../../services/v1/auth/auth');
let router = express.Router();

router.get('/:userId/produts', authClientRequest.authClientToken ,authService.grantAccess('readOwn', 'product'),shopService.getTopProducts);
router.post('/:userId/products',validation.validationProductCreationBody(),authClientRequest.authClientToken ,authService.grantAccess('createOwn', 'product'),shopService.addProduct);
router.delete('/:shopId', authClientRequest.authClientToken ,authService.grantAccess('deleteAny', 'shop'),shopService.removeShop);
router.post('/', validation.validateShopCreationBody(),authClientRequest.authClientToken ,authService.grantAccess('createOwn', 'shop'), shopService.createShop);
router.get('/:shopId', authClientRequest.authClientToken ,shopService.getShopDetails);

module.exports = router;