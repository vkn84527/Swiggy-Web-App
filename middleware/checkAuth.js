const responses = require('..//modules/common_functions/responses')
const constants = require('../modules/constants/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config();
var secret_key = process.env.secret_key
var secret_key1 = process.env.secret_key1

module.exports.customer = (req, res, next) => {
    try {
        var token = req.headers.authorization;
        const decoded = jwt.verify(token, secret_key);
        req.userData = decoded;
        req.customer_id = req.userData.customer_id
        next();
    } catch (error) {
        responses.sendResponse(res, 'Auth Failed', constants.STATUS_CODES.UNAUTHORIZED)
    }
};

module.exports.merchant = (req, res, next) => {
    try {
        var token = req.headers.authorization;
        const decoded = jwt.verify(token, secret_key1);
        req.user = decoded;
        req.customer_id = req.user.customer_id
        next();
    } catch (error) {
        responses.sendResponse(res, 'Auth Failed', constants.STATUS_CODES.UNAUTHORIZED)
    }
};
