const infoModel = require('../models/tableModel');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
//const { generateCron } = require('../middleware/cron');
const { generateToken } = require('../middleware/auth');


function userService() {

    userService.prototype.createUser = async function (userData) {
        try {
            const { name, email, password, address, mobileno, role } = userData;
            if (role == 'user') {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const user = await infoModel.query()
                    .insert({ name, email, password: hashedPassword, address, mobileno, role });

                return user;
            }
            else if (role !== 'user') {
                return 'Role must be user';
            }
        } catch (error) {
            console.log(error);
            throw new Error('Unable to create user.');
        }
    };

    userService.prototype.loginUser = async function (loginData) {
        const { email, password, role } = loginData;
        try {
            const user = await infoModel.query().where({ 'email': email, 'role': role }).first();

            if (!user) {
                throw new Error('Invalid email or password.');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Invalid email or password.');
            }
            const token = generateToken(user);

            return { id: user.id, name: user.name, email: user.email, token };

        } catch (error) {
            console.error(error);
            throw new Error('Internal server error');
        }
    };

    userService.prototype.showProducts = async function () {
        try {
            const products = await productModel.query();
            return products;
        } catch (error) {
            console.log(error);
            throw new Error('Unable to fetch products');
        }
    };


    userService.prototype.purchaseProducts = async function (purchaseData) {
        try {
            const { user_id, product_id, quantity } = purchaseData;
            const order_date = moment.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            const productDetails = await productModel.query()
                .select('product_name', 'product_description', 'product_cost', 'product_color', 'product_brand')
                .where('id', product_id).first();
            const order_cost = quantity * productDetails.product_cost;

            const delivery_id =Math.floor(Math.random() * 2) + 1;

            const otp = Math.floor(100000 + Math.random() * 900000);

            const orderDetails = await orderModel.query()
                .insert({
                    user_id: user_id,
                    product_id: product_id,
                    order_quantity: quantity,
                    order_cost: order_cost,
                    order_date: order_date,
                    otp: otp,
                    delivery_id: delivery_id
                });

            if (orderDetails.id) {
                await generateCron(orderDetails.id);

            }
            else {
                return {
                    status: 500,
                    message: "Something went wrong pls try again"
                }
            }
            return { orderDetails, productDetails };
        } catch (error) {
            console.log(error);
            throw new Error('Unable to purchase products');
        }

    };
    userService.prototype.showOrdersByIdorDate = async function (id, order_date) {
        try {
            const orders = await orderModel.query()
                .leftJoin('usertable', 'ordertable.user_id', 'usertable.id')
                .leftJoin('producttable', 'ordertable.product_id', 'producttable.id')
                .select(
                    'ordertable.id',
                    'ordertable.order_date',
                    'usertable.name',
                    'usertable.email',
                    'usertable.address',
                    'usertable.mobileno',
                    'producttable.product_name',
                    'producttable.product_description',
                    'producttable.product_cost',
                    'producttable.product_color',
                    'producttable.product_brand'
                )
             
                .modify((query) => {
                    if (id) {
                      query.where('ordertable.id', id);
                    }
                    if (order_date) {
                      query.where('ordertable.order_date', order_date);
                    }
                  });
            return orders;

        } catch (error) {
            console.log(error);
            throw new Error('Unable to fetch the orders');
        }
    }

    userService.prototype.statusOrder = async function (id,order_date) {
        try {
            const history = await orderModel.query()
                .leftJoin('usertable', 'ordertable.user_id', 'usertable.id')
                .leftJoin('producttable', 'ordertable.product_id', 'producttable.id')
                .leftJoin('statustable', 'ordertable.id', 'statustable.order_id')
                .select(
                    'ordertable.id',
                    'ordertable.order_date',
                    'usertable.name',
                    'usertable.email',
                    'usertable.address',
                    'usertable.mobileno',
                    'producttable.product_name',
                    'producttable.product_description',
                    'producttable.product_cost',
                    'producttable.product_color',
                    'producttable.product_brand',
                    'statustable.order_id',
                    'statustable.status'
                )
                .modify((query) => {
                    if (id) {
                      query.where('ordertable.id', id);
                    }
                    if (order_date) {
                      query.where('ordertable.order_date', order_date);
                    }
                  });
            return history;

        } catch (error) {
            console.log(error);
            throw new Error('Unable to fetch the history');
        }
    };

    


}

module.exports = new userService();