import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASSWORD,
  },
});

const sendMail = (mail: any) => {
  var mailOptions = {
    from: process.env.SMPT_USER,
    to: mail.email,
    subject: "Sending Email.",
    text: `${mail.message}\n Disease:- ${mail.disease}\n Mobile:-${mail.mobile}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

const sendMailForgot = (mail: any) => {
  var mailOptions = {
    from: process.env.SMPT_USER,
    to: mail.email,
    subject: "Sending Email.",
    text: `${mail.link}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

export default sendMail;
export { sendMailForgot };
