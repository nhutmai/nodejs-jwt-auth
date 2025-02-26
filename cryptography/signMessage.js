const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');

const {encrypt_private_key} = require('./encrypt');

const myData = {
    firstName: 'Minh Nhut',
    lastName: 'Mai',
    citizenId: "123123123",
}
const myDataString = JSON.stringify(myData);

hash.update(myDataString);
const hashedData = hash.digest('hex');
const sender_private_key = fs.readFileSync("." + "/private_key.pem", "utf-8");
const singedMessage = encrypt_private_key(sender_private_key, hashedData);
const package_to_send = {
    algorithm: 'sha256',
    originalData: myData2,
    signedAndEncryptedData: singedMessage,
}

module.exports = {package_to_send}