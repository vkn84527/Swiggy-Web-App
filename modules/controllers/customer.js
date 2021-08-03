const sendmail = require('../service/customer_mail')
const responce = require('../common_functions/responses')
const status_code = require('../constants/constants')
const execute_query = require('./db_query').execute_query
const hash_service = require('../common_functions/hashing');
const jwt = require('jsonwebtoken')
const checkAuth = require('../../middleware/checkAuth')
var salt = 10
var secret_key = process.env.secret_key


module.exports.register = async function (req, res) {
  try {
    var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
    var values = [req.body.customer_email]
    var results = await execute_query(sql_query, values)

    if (results.length !== 0) {
      return responce.sendResponse(res, "Email already Registered", status_code.STATUS_CODES.BAD_REQUEST);
    }
    else {
      var hash = await hash_service.hash_password(req.body.customer_password)
      var sql_query = 'INSERT INTO customer(customer_name,customer_phone,customer_email,customer_password) values(?,?,?,?)'
      var values = [req.body.customer_name, req.body.customer_phone, req.body.customer_email, hash]
      const results = await execute_query(sql_query, values)
      
      if (results) {
        console.log("User registered sucessfully.........")
        console.log("Email send on your Mail :)")
        //sendmail.ab2() 
        const user = { customer_email: req.body.customer_email, customer_id: results.insertId }
        //console.log(user)
        token = jwt.sign(user, secret_key)
        return responce.sendtokencustomerResponse(res, 'User registered sucessfully', token, req.body.customer_email, results.insertId, status_code.STATUS_CODES.SUCCESS)
      }
      else {
        return responce.sendResponse(res, 'Please Enter all Required Filed', status_code.STATUS_CODES.UNAUTHORIZED)
      }
    }
  }
  catch {
    return responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.UNAUTHORIZED)
  }
}

module.exports.login = async function (req, res) {
  try {
    var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
    var values = [req.body.customer_email]
    var results = await execute_query(sql_query, values)

    if (results.length === 0) {
      return responce.sendResponse(res, "Email Not Registered", status_code.STATUS_CODES.BAD_REQUEST);
    }
    else {
      const user = { customer_email: req.body.customer_email, customer_id: results[0].customer_id }
      var result = await hash_service.compare_password(req.body.customer_password, results[0].customer_password);
      if (result) {
        token = jwt.sign(user, secret_key)
        responce.sendtokencustomerResponse(res, 'Auth Successful', token, req.body.customer_email, results[0].customer_id, status_code.STATUS_CODES.SUCCESS)
      }
      else {
        return responce.sendResponse(res, "Invalid password", status_code.STATUS_CODES.UNAUTHORIZED);
      }
    }
  }
  catch {
    responce.sendResponse(res, "Some Error", status_code.STATUS_CODES.BAD_REQUEST);
  }
}


module.exports.logout = function (req, res) {
  return responce.sendResponse(res, 'successfully logout', status_code.STATUS_CODES.SUCCESS)
}





