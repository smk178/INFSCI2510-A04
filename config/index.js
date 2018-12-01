const jwt = require('express-jwt');

const secret = "encrpyr138vsj23k98hdcavbwe5u092ue0qwgodnsjCNqwji12";
const auth = jwt({
    secret: secret,
    userProperty: 'payload'
});

module.exports = {
    secret: secret,
    auth: auth
};
