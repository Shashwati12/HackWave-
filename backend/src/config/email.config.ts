import nodemailer from 'nodemailer';

 
const transporter = nodemailer.createTransport({
      service:process.env.SERVICE,
      auth:{
          user:process.env.EMAIL,
          pass:process.env.PASS
      }
  });

export default transporter;