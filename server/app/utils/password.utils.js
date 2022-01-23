const bcrypt = require('bcrypt');

exports.enctryptPassword = async (password) => {
    return bcrypt.hash(password, 12);
}

exports.decryptPassword = async (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword);
}