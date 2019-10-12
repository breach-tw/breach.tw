const nodemailer = require('nodemailer');
const mailConfig = require("../config.json").mail

const transporter = nodemailer.createTransport(mailConfig);

function send(email, content, username = null) {
    let to = username ? ({
        name: username,
        address: email
    }) : email;

    let mailOptions = {
        from: {
            name: 'breach.tw 台灣抓漏小天使',
            address: 'mailer@breach.tw'
        },
        to,
        subject: '個資洩漏通知信',
        html: content,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
          });
    })
}

module.exports = send;


  
  