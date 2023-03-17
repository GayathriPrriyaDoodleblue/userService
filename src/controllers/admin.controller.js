const status = require('../validation/status');
const message = require('../validation/message');
const adminService = require('../services/admin.service');
function adminController() { }

adminController.prototype.createAdmin = async function (req, res) {
    const { name, email, password, role } = req.body;

    try {
        const admin = await adminService.createAdmin(name, email, password, role);
        res.status(status.success).json(admin);
      
    } catch (error) {
        res.status(status.serverError).json({ message: message.internalServerError});
    }
};

adminController.prototype.loginAdmin = async function (req, res) {
    const { email, password } = req.body;

    try {
        const admin = await adminService.loginAdmin(email, password);
        return res.json({ status: admin.status, message: admin.message, data: admin.data })
    } catch (error) {
        res.status(status.serverError).json({ message: message.internalServerError });
    }
};

adminController.prototype.createMerchant = async function (req, res) {
    const { name, email, password, role } = req.body;

    try {
        const merchant = await adminService.createMerchant(name, email, password, role);
        res.status(status.success).json(merchant);
    } catch (error) {
        res.status(status.serverError).json({ message: message.internalServerError });
    }
};

adminController.prototype.createDelivery = async function (req, res) {
    const { name, email, password, role } = req.body;

    try {
        const delivery = await adminService.createDelivery(name, email, password, role);
        res.status(status.success).json(delivery);
    } catch (error) {
        res.status(status.serverError).json({ message: message.internalServerError });
    }
};

module.exports = new adminController();