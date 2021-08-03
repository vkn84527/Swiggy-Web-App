const joi = require("joi");
const responses = require('../modules/common_functions/responses')
const constants = require('../modules/constants/constants')

const validation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});

const userloginValidation = async (req, res, next) => {
    const payload = {
        email: req.body.customer_email,
        password: req.body.customer_password
    };

    const { error } = validation.validate(payload);
    if (error) {
        responses.sendResponse(res, `Error in User Data : ${error.message}`, constants.STATUS_CODES.UNAUTHORIZED)
    } else {
        next();
    }
};

const merchantloginValidation = async (req, res, next) => {
    const payload = {
        email: req.body.merchant_email,
        password: req.body.merchant_password

    };

    const { error } = validation.validate(payload);
    if (error) {
        responses.sendResponse(res, `Error in User Data : ${error.message}`, constants.STATUS_CODES.UNAUTHORIZED)
    } else {
        next();
    }
};

module.exports = { userloginValidation, merchantloginValidation }