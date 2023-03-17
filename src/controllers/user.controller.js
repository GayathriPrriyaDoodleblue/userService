const userService = require('../services/user.service');

function userController() {

    userController.prototype.createUser = async function (req, res) {
        try {
          const user = await userService.createUser(req.body);
          res.status(200).json({status:"success", data:user });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Unable to create user.' });
        }
      };

    userController.prototype.loginUser= async function (req, res) {
        try {
          const result = await userService.loginUser(req.body);
          res.status(200).json({status:"success", data:result });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      };
      userController.prototype.showProducts = async function (req, res) {
        try {
            const products = await userService.showProducts();
            res.status(200).json({status:"success", data:products });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching products.' });
        }
    };
    userController.prototype.purchaseProducts = async function (req, res) {
        try {
            const products = await userService.purchaseProducts(req.body);
            res.status(200).json({ products });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    };
    userController.prototype.showOrdersByIdorDate = async function (req, res) {
      try {
          const { id, order_date } = req.query;
          const orders = await userService.showOrdersByIdorDate(id, order_date);
          if (orders.length === 0) {
              res.status(404).json({ message: 'Order not found' });
          } else {
              res.status(200).json({ status:"success", data:orders });
          }
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'An error occurred while fetching the orders', error });
      }
  };

  userController.prototype.statusOrder = async function (req, res) {
    try {
        const  id  = req.query.id;
        const  order_date  = req.query.order_date;
        const history = await userService.statusOrder(id,order_date);
        if (!history) {
            res.status(500).json({ message: 'not found' });
        } else {
            res.status(200).json({ status:"success", data:history });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the orders.' });
    }
};

  }

     module.exports = new userController();