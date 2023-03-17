const bcrypt = require('bcrypt');
const infoTable = require('../models/tableModel')
const { generateToken } = require('../middleware/auth');
const status = require('../validation/status')
const message = require('../validation/message')
const xlsx = require('xlsx');
const axios = require('axios');
require('dotenv').config();
const productModel = require('../models/productModel');
function merchantService() { }

merchantService.prototype.loginMerchant = async function (email, password) {
    try {
        const merchant = await infoTable.query().where({ 'email': email }).first();
        const passwordMatch = await bcrypt.compare(password, merchant.password);

        if (!passwordMatch) {
            throw new Error('Invalid email or password.');
        }

        if (merchant.role !== 'merchant') {

            return {
                status: status.badRequest,
                message: message.unauthorized
            }
        }

        const token = generateToken(merchant);
        return { data: { id: merchant.id, name: merchant.name, email: merchant.email, token } };
    }

    catch (error) {
        console.log(error);
        throw new Error('Unable to login admin.');
    }
};
merchantService.prototype.uploadProduct = async function (file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${process.env.baseUrl}/merchant/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.product;
    } catch (error) {
      console.log(error);
      throw new Error('Unable to create products');
    }
  };
merchantService.prototype.getAllProducts = async function () {
    try {
        const response = await axios.get(`${process.env.baseUrl}/merchant/all`)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error);
            });
            return response.data.products;
      

    } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch products');
    }
};

merchantService.prototype.getByDateOrIdOrSearchProduct = async function (id, date, query) {
    try {
        const response = await axios.get(`${process.env.baseUrl}/merchant/ids?id=${id}||date=${date}||query=${query}`);
        return response.data.products;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch the product');
    }
};
merchantService.prototype.updateProduct = async function (id, productData) {
    try {
        const updatedRows = await axios.post(
            `${process.env.baseUrl}/merchant/change/${id}`,
            productData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (updatedRows === 0) {
            return null;
        }
        return updatedRows.data.product;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update product');
    }
};

merchantService.prototype.deleteProduct = async function (id) {
    try {
      const deletedRows = await axios.delete(`${process.env.baseUrl}/merchant/clear/${id}`);
      if (deletedRows === 0) {
        throw new Error('Product not found');
      }
      return  deletedRows.data.deletedRows;
    } catch (error) {
      console.error(error);
      throw new Error('Unable to delete product');
    }
  }; 

module.exports = new merchantService();