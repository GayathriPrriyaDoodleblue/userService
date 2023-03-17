const router = require('express').Router();
const userController= require('../controllers/user.controller');

router.get('/show', userController.showProducts);

router.get('/order',userController.showOrdersByIdorDate);

router.post('/purchase', userController.purchaseProducts);

router.get('/status', userController.statusOrder);

module.exports = router;