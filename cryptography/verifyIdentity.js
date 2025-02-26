const crypto = require('crypto');

const fs = require('fs');

const {decrypt_public_key} = require('./decrypt');

const {package_to_send} = require("./signMessage");


const hash = crypto.createHash(package_to_send.algorithm);
hash.update(JSON.stringify(package_to_send.originalData));

const hash_of_original_hex = hash.digest('hex');
console.log(hash_of_original_hex);

const public_key = fs.readFileSync("./public_key.pem", "utf-8");
console.log(public_key);
const decrypted_message = decrypt_public_key(public_key, package_to_send.signedAndEncryptedData);

const decrypted_message_hex = decrypted_message.toString("utf-8");

if (hash_of_original_hex === decrypted_message_hex) {
    console.log("success, the data and sender is valid");
} else {
    console.log("failed, the data and sender is invalid");
}