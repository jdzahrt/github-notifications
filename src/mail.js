const nodemailer = require('nodemailer');
const config = require('config');

const sendEmail = (recipient, subject, message) => {
    const transporter = nodemailer.createTransport(config.smtpConfig);

// verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Sending e-mail");
        }
    });


    const emailMessage = {
        from: 'no-reply@hy-vee.com',
        html: `<p>${message}</p>`,
        subject: 'jz github test',
        to: `${recipient}`
    };

    transporter.sendMail(emailMessage);
};

module.exports = sendEmail;
