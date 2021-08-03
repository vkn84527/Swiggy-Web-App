module.exports = app => {
    const merchant = require('../modules/controllers/merchant');
    const validate = require('../middleware/register_validation')
    const loginValidation = require('../middleware/login_validation')

    app.post('/merchant_register',validate.merchantValidation, merchant.register);
    app.post('/merchant_login',loginValidation.merchantloginValidation, merchant.login);
    app.post('/merchant_logout', merchant.logout);

}