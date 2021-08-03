const sendmail = require('../service/merchant_mail')
const responce = require('../common_functions/responses')
const status_code = require('../constants/constants')
const execute_query = require('./db_query').execute_query
const hash_service = require('../common_functions/hashing');
const jwt = require('jsonwebtoken')
var secret_key1 = process.env.secret_key1

module.exports.login = async function (req, res) {
    try {
        var sql_query = 'SELECT * FROM merchant WHERE merchant_email = ?';
        var values = [req.body.merchant_email]
        var results = await execute_query(sql_query, values)

        if (results.length === 0) {
            return responce.sendResponse(res, "Email Not Registered", status_code.STATUS_CODES.UNAUTHORIZED);
        }
        else {
            const user = { merchant_email: req.body.merchant_email, merchant_id: results.insertId }
            var check_pass = await hash_service.compare_password(req.body.merchant_password, results[0].merchant_password)
            if (check_pass) {
                token = jwt.sign(user, secret_key1)
                responce.sendtokenmerchantResponse(res, 'Auth Successful', token, req.body.merchant_email, results[0].merchant_id, status_code.STATUS_CODES.SUCCESS)

            } else {
                return responce.sendResponse(res, "Wrong Password", status_code.STATUS_CODES.BAD_REQUEST);
            }
        }
    }
    catch {
        responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.UNAUTHORIZED)
    }
}

module.exports.register = async function (req, res) {
    try {
        var sql_query = 'SELECT * FROM merchant WHERE merchant_email = ?';
        var values = [req.body.merchant_email]
        var results = await execute_query(sql_query, values)

        if (results.length !== 0) {
            return responce.sendResponse(res, "Email already Registered", status_code.STATUS_CODES.UNAUTHORIZED);
        } else {
            var hash = await hash_service.hash_password(req.body.merchant_password)
            var sql_query = 'INSERT INTO merchant (merchant_name,product_name,merchant_email,merchant_password)values(?,?,?,?)'
            var values = [req.body.merchant_name, req.body.product_name, req.body.merchant_email, hash]
            var results = await execute_query(sql_query, values)

            if (results) {
                console.log("merchant registered sucessfully.........")
                console.log("Email send on your Mail :)")
                //sendmail.ab()
                const user = { merchant_email: req.body.merchant_email, merchant_id: results.insertId }
                token = jwt.sign(user, secret_key1)
                responce.sendtokenmerchantResponse(res, 'merchant registered sucessfully', token, req.body.merchant_email, results.insertId, status_code.STATUS_CODES.SUCCESS)
            }
            else {
                responce.sendResponse(res, 'Please Enter all Required Filed', status_code.STATUS_CODES.BAD_REQUEST)
            }
        }
    } catch {
        responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.BAD_REQUEST)
    }
}


module.exports.logout = function (req, res) {
    return responce.sendResponse(res, 'merchant successfully logout', status_code.STATUS_CODES.SUCCESS)
}


































