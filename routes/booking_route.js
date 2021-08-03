
module.exports = app => {

    const booking = require('../modules/controllers/booking');
    const checkAuth = require('../middleware/checkAuth')

    app.post('/order_product', checkAuth.customer, booking.order_product)
    app.post('/cancel_booking', checkAuth.customer, booking.cancel_booking)
    app.post('/customer/check_booking', checkAuth.customer, booking.check_bookings)
    app.post('/conform_booking', checkAuth.merchant, booking.conform_booking)
    app.post('/merchant/check_booking', checkAuth.merchant, booking.check_bookings)


}

