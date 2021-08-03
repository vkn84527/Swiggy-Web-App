module.exports = app => {

    const customer = require('../modules/controllers/customer');
    const validateuser = require('../middleware/register_validation')
    const userloginValidation = require('../middleware/login_validation')

    app.post('/customer_register',validateuser.userValidation, customer.register);
    app.post('/customer_login',userloginValidation.userloginValidation, customer.login);
    app.post('/customer_logout', customer.logout);

}
