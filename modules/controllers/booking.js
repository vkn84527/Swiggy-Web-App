const execute_query = require('./db_query').execute_query
const responses = require('../common_functions/responses')
const constants = require('../constants/constants')


module.exports.order_product = async function (req, res) {
    try {

        customer_id = req["customer_id"]
        var sql_query = 'insert into booking (customer_id,merchant_id,product_name)values(?, ?, ?)'
        var values = [customer_id, req.body.merchant_id, req.body.product_name];

        var results = await execute_query(sql_query, values)
        console.log(results)
        id = results.insertId
        responses.sendResponse(res, `Congratulations!!! Your Booking_Id is : ${id}`, constants.STATUS_CODES.SUCCESS)
    }
    catch {
        responses.sendResponse(res, "Please Enter all Required Filed", constants.STATUS_CODES.NOT_FOUND)
    }
}


module.exports.cancel_booking = async function (req, res) {
    try {
        const booking_id = req.body.booking_id
        var sql_query = 'update booking set status="cancelled" where booking_id=? and status="booked"'
        var values = [booking_id]
        let results = await execute_query(sql_query, values)

        if (results.affectedRows == 0) {
            responses.sendResponse(res, "Alredy calcelled or Booking_Id is not Valid", constants.STATUS_CODES.SUCCESS)
        } else {
            responses.sendcancelResponse(res, "booking cancelled", req.body.cancel_resion, constants.STATUS_CODES.SUCCESS)
        }
    } catch {
        responses.sendResponse(res, "Some Error", constants.STATUS_CODES.SUCCESS)
    }
}


module.exports.conform_booking = async function (req, res) {
    try {
        const booking_id = req.body.booking_id
        var sql_query = 'update booking set status="completed" where booking_id=? and status="booked"'
        var values = [booking_id]
        let results = await execute_query(sql_query, values)

        if (results.message[27] === '0') {
            return responses.sendResponse(res, "Alredy updated or Booking_Id is not Valid", constants.STATUS_CODES.BAD_REQUEST)
        } else {
            responses.sendResponse(res, "Your Order is Completed!! Thanks", constants.STATUS_CODES.SUCCESS)
        }
    } catch {
        responses.sendResponse(res, "Some Error", constants.STATUS_CODES.NOT_FOUND)
    }
}

module.exports.check_bookings = async function (req, res) {
    try {
        var sql_query = 'select * from booking where booking_id=? and status="booked"';
        var values = [req.body.booking_id]

        let results = await execute_query(sql_query, values)

        if (results.length !== 0) {
            responses.sendResponse(res, "Your booking_id is valid ", constants.STATUS_CODES.BAD_REQUEST)
        } else {
            var sql_query1 = 'select * from booking where booking_id=? and status="cancelled"';
            var values1 = [req.body.booking_id]
            let results1 = await execute_query(sql_query1, values1)

            if (results1.length !== 0) {
                responses.sendResponse(res, "You booking is cancelled", constants.STATUS_CODES.BAD_REQUEST)
            } else {
                var sql_query2 = 'select * from booking where booking_id=? and status="completed"';
                var values2 = [req.body.booking_id]
                let results2 = await execute_query(sql_query2, values2)

                if (results2.length !== 0) {
                    responses.sendResponse(res, "You booking order is completed", constants.STATUS_CODES.BAD_REQUEST)
                } else {
                    responses.sendResponse(res, "Your Booking ID is Not match", constants.STATUS_CODES.NOT_FOUND)
                }
            }
        }
    }
    catch {
        responses.sendResponse(res, "Some Erorr", constants.STATUS_CODES.NOT_FOUND)
    }
}



