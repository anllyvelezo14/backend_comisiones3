
const usuario = require ('../controllers/UsuarioController')
const { Usuario }= require ('../models/index');
const nodemailer = require('nodemailer');

console.log(process.env.USER_EMAIL);//revisar
console.log(process.env.USER_PASSWORD);



async function sendMail() {

  try {

    const transporter = nodemailer.createTransport({
      service: "Gmail",
        // port: 587,
        // secure: false,
        // requireTLS: false,
      // service: "gmail",
      // tls: false,
      // // secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER_EMAIL, // generated ethereal user
        pass: process.env.USER_PASSWORD, // generated ethereal password
      },
    });
    
      await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: process.env.USER_SEND,// list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    // const result = await transporter.sendMail(mailOptions);
    // return(result);
    
   
    
  } catch (error) {
    console.log(error);
  }





  }


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