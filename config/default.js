const keys = require('../pw');
module.exports = {
    smtpConfig: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'jdzahrt@gmail.com', // generated ethereal user
            pass: keys.pw // generated ethereal password
        }
    }
};

// const smtpConfig = {
//     host: '10.200.93.51',
//     port: 25
// };
