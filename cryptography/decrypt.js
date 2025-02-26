const crypto = require('crypto');

const decrypt_private_key = (privateKey, encryptedMessage) => {
    return crypto.privateDecrypt(privateKey, encryptedMessage);
}

const decrypt_public_key = (publicKey, encryptedMessage) => {
    return crypto.publicDecrypt(publicKey, encryptedMessage);
}
module.exports = {decrypt_private_key, decrypt_public_key};