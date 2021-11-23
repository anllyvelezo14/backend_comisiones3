const nodemailer = require('nodemailer');

console.log(process.env.USER_EMAIL);//revisar
console.log(process.env.USER_PASSWORD);



async function envioMail(mailUsuario) {

  try {
    
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_EMAIL, // generated ethereal user
        pass: process.env.USER_PASSWORD, // generated ethereal password
      },
    });
    
      await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: mailUsuario,// list of receivers
      subject: "Hello ✔", // Subject line
      text: "su estado ha cambiado" // plain text body
    //   html: "<b>Nuevo usuario Creado</b>" // html body
    });

} catch (error) {
    console.log(error);
  }
}


module.exports = {
    envioMail
}