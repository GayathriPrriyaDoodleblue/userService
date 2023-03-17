const Joi = require('joi');
const status = require('../validation/status');

const joiRegister = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,}$')).required(),
        role: Joi.string().optional(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(status.serverError).json({ message: error.details[0].message });
    }
    next();
};

const joiLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,}$')).required(),
        role: Joi.string().optional(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(status.serverError).json({ message: error.details[0].message });
    }
    next();
};

const joiQuery = (req, res, next) => {
    const schema = Joi.string().required();
    const { error } = schema.validate(req.body.query);
    if (error) {
        return res.status(status.serverError.code).json({ message: error.details[0].message });
    }
};
  
module.exports = { joiRegister, joiLogin, joiQuery }