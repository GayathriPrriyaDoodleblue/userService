const jwt = require('jsonwebtoken');
const status = require('../validation/status');
const infoModel = require('../models/tableModel');


const generateToken = (user) => {
    const tokenPayload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '2h' });
    return { token };
};

const authenticate = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authorization header missing or invalid');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user;
        if (decoded.role === 'admin') {
            user = await infoModel.query().where('id', decoded.id).first();
        } else if (decoded.role === 'user') {
            user = await infoModel.query().where('id', decoded.id).first();
        } else if (decoded.role === 'merchant') {
            user = await infoModel.query().where('id', decoded.id).first();
        } else if (decoded.role === 'delivery') {
            user = await infoModel.query().where('id', decoded.id).first();
        } else {
            throw new Error('Invalid user role');
        }

        if (!user) {
            throw new Error('Unauthorized');
        }

        req.user = user;

        if (roles.length && !roles.includes(user.role)) {
            throw new Error(`Access denied. You do not have ${user.role} privileges.`);
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(status.unauthorized.code).json({ error: error.message });
    }
};

module.exports = {
    generateToken,
    authenticate,
};