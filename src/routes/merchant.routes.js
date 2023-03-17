const router = require('express').Router();
const merchantController= require('../controllers/merchant.controller');
const { joiLogin } = require('../validation/joi');
const { authenticate } = require('../middleware/auth');

router.post('/login',joiLogin,merchantController.loginMerchant);

router.post('/upload', merchantController.uploadProduct);

router.get('/all',authenticate(['admin','merchant']), merchantController.getAllProducts);

router.get('/ids', merchantController.getByDateOrIdOrSearchProduct);

router.put('/change/:id', merchantController.updateProduct);

router.delete('/clear/:id', merchantController.deleteProduct);

module.exports = router;
