const router = require('express').Router();
const deliveryController = require('../controllers/admin.controller');
const { joiLogin } = require('../validation/joi');
const { authenticate } = require('../middleware/auth');


router.post('/login',joiLogin,deliveryController.loginDelivery);

router.get('/check' ,authenticate(['admin','delivery']),deliveryController.checkDelivery);

module.exports = router;