const router = require('express').Router();
const userController= require('../controllers/user.controller');
const { joiLogin } = require('../validation/joi');
const { authenticate } = require('../middleware/auth');

router.post('/login',joiLogin,userController.loginUser);

router.post('/user',joiRegister,userController.createUser);

router.get('/show',authenticate(['admin','user']), userController.showProducts);

router.get('/order', authenticate(['admin','user']),userController.showOrdersByIdorDate);

router.post('/purchase',authenticate(['admin','user']), userController.purchaseProducts);

router.get('/status',authenticate(['admin','user']), userController.statusOrder);

module.exports = router;