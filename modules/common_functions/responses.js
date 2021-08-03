const sendResponse = (res, msg, status) => {
    return res.json({
        message: msg,
        status: status
    })
}

const sendcancelResponse = (res, msg, resion, status) => {
    return res.json({
        message: msg,
        Cancel_resion: resion,
        status: status
    })
}

const sendtokencustomerResponse = (res, msg, token, customer_email, customer_id, status) => {
    return res.json({
        Message: msg,
        Token: token,
        Customer_email: customer_email,
        Customer_ID: customer_id,
        Status: status
    })
}

const sendtokenmerchantResponse = (res, msg, token, merchant_email, merchant_id, status) => {
    return res.json({
        Message: msg,
        Token: token,
        merchant_email: merchant_email,
        merchant_ID: merchant_id,
        Status: status
    })
}

module.exports = { sendResponse, sendcancelResponse, sendtokencustomerResponse, sendtokenmerchantResponse }
