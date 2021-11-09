
const { Usuario }= require ('../models/index');
const nodemailer = require('nodemailer');
const { password } = require('../../config/database');
//const handelbars = require('handlebars');
//const { unregisterDecorator } = require("handlebars");

console.log(process.env.USER_EMAIL);//revisar
console.log(process.env.USER_PASSWORD);

const createTrans = ()=> {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
            
            
        }
    });
    return transport;
}

const sendMail = async () => {
    const transporter = createTrans();
    const info = await transporter.sendMail({
        from: `Comisiones3 ${process.env.USER_EMAIL}`,
        to: Usuario.email,
        subject: "Comisiones3",
        html:"<b>Hello Comisiones</b>"
    });

    console.log("enviando correo");

    return
}

// let smtpTransport = nodemailer.createTransport({

//     service: "Gmail",
//     auth: {
//         user: process.env.USER_EMAIL,
//         pass: process.env.USER_PASSWORD,
//     },
// });

// let sendMail= (notify)=>{
    
//     if (!notify) {
//         return
//     }
//     let mailUser = {
//         from: process.env.FROM_EMAIL,
//         to: Usuario.email,
//         subject: notify.subject,
//         html: notify.text
//     }

    
//     console.log("enviando correo")

//     smtpTransport.sendMail(mailUser, function(error, info) {
//         if (error) {
//             console.log(error);
//         }
//         if (info) {
//             console.log(info);
//         }
//     })
// }

module.exports = {
    sendMail
}