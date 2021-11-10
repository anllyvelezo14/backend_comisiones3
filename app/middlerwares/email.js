

const { Usuario }= require ('../models/index');
const nodemailer = require('nodemailer');

console.log(process.env.USER_EMAIL);//revisar
console.log(process.env.USER_PASSWORD);



async function sendMail() {

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_PASSWORD, // generated ethereal password
    },
  });

  transporter.verify().then() 
      console.log('Enviando email')
  

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.USER_EMAIL, // sender address
    to: Usuario.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

sendMail().catch(console.error);
// const createTrans = ()=> {
//     const transport = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         requireTLS: false,
//         auth: {
//             user: process.env.USER_EMAIL,
//             pass: process.env.USER_PASSWORD
            
            
//         }
//     });
//     return transport;
// }

// const sendMail = async () => {
//     const transporter = createTrans();
//     const info = await transporter.sendMail({
//         from: `Comisiones3 ${process.env.USER_EMAIL}`,
//         to: Usuario.email,
//         subject: "Comisiones3",
//         html:"<b>Hello Comisiones</b>"
//     });

//     console.log("enviando correo");

//     return
// }

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