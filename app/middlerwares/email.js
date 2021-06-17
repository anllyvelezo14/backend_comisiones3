/* const fs = require("fs");
const path = require("path"); */
const nodemailer = require('nodemailer');
//const handelbars = require('handlebars');
//const { unregisterDecorator } = require("handlebars");

console.log(process.env.USER_EMAIL);//revisar
console.log(process.env.USER_PASSWORD);

let smtpTransport = nodemailer.createTransport({

    service: "Gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

let sendMail= (notify)=>{
    
    if (!notify) {
        return
    }
    let mailUser = {
        from: process.env.FROM_EMAIL,
        to: notify.email,
        subject: notify.subject,
        html: notify.text
    }

    
    console.log("enviando correo")

    smtpTransport.sendMail(mailUser, function(error, info) {
        if (error) {
            console.log(error);
        }
        if (info) {
            console.log(info);
        }
    })
}

module.exports = {
    sendMail
}