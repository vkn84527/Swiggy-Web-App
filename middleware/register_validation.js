const joi = require("joi");
const responses = require('../modules/common_functions/responses')
const constants = require('../modules/constants/constants')

const validation = joi.object({
	userName: joi.string().alphanum().min(3).max(25).required(),
	email: joi.string().email().required(),
	password: joi.string().min(5).required(),
	mobileNumber: joi.string().length(10)
});

const userValidation = async (req, res, next) => {
	const payload = {
		userName: req.body.customer_name,
		email: req.body.customer_email,
		password: req.body.customer_password,
		mobileNumber: req.body.customer_phone
	};

	const { error } = validation.validate(payload);
	if (error) {
		responses.sendResponse(res, `Error in User Data : ${error.message}`, constants.STATUS_CODES.UNAUTHORIZED)
	} else {
		next();
	}
};

const merchantValidation = async (req, res, next) => {
	const payload = {
		userName: req.body.merchant_name,
		email: req.body.merchant_email,
		password: req.body.merchant_password,
		mobileNumber: req.body.merchant_phone
	};

	const { error } = validation.validate(payload);
	if (error) {
		responses.sendResponse(res, `Error in User Data : ${error.message}`, constants.STATUS_CODES.UNAUTHORIZED)
	} else {
		next();
	}
};

module.exports = { merchantValidation, userValidation }