const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { joiLogin, joiRegister } = require('../validation/joi');
const { authenticate } = require('../middleware/auth');

router.post('/login', joiLogin, adminController.loginAdmin);

router.post('/register', joiRegister, adminController.createAdmin);

router.post('/create', authenticate(['admin']), adminController.createMerchant);

router.post('/delivery', authenticate(['admin']), joiRegister, adminController.createDelivery);

module.exports = router;