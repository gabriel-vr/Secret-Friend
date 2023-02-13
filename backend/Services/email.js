import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
});


export const enviarEmail = (pessoaEntrega, pessoaRecebe) => {
  
  const msg = {
      to: pessoaEntrega.email,
      from: process.env.FROM_EMAIL,
      subject: "Amigo Secreto!!!",
      text: `Olá ${pessoaEntrega.nome},\n\n Seu parceiro do amigo secreto é o(a) ${pessoaRecebe.nome}.\n\n Atenciosamente,\nGabriel Vicente Rodrigues`,
  }
  transporter.sendMail(msg, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}