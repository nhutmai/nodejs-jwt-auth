const crypto = require('crypto');

const encrypt_public_key = (public_key, message) => {
    const bufferMessage = Buffer.from(message, 'utf-8');
    return crypto.publicEncrypt(public_key, bufferMessage);
}
const encrypt_private_key = (private_key, message) => {
    const bufferMessage = Buffer.from(message, 'utf-8');
    return crypto.privateEncrypt(private_key, bufferMessage);
}
module.exports = {encrypt_public_key, encrypt_private_key};