//var customeremail= require('../controllers/customer')
var customeremail= require('../controllers/customer')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vikas.kumar1@jungleworks.com',
    pass: 'Enter your password'
  }
});

var mailOptions = {
  form: 'vikas.kumar1@jungleworks.com',
  to: 'vkn84527@gmail.com',
  subject: 'Successfully Register on Yelo',
  //text: `Hello User, You are working on sending gmail using Node.Js`
  html: '<h1>Hello, Customer </h1><p>Welcome to Yelo project! You have\
  Successfully Register on Yelo project-1 As a Customer</p>' 
};
function ab2() {
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
exports.ab2 = ab2;

