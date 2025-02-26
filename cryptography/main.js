const fs = require('fs');
const {encrypt_public_key, encrypt_private_key} = require('./encrypt');
const {decrypt_private_key, decrypt_public_key} = require('./decrypt');
require("dotenv").config();

const public_key = fs.readFileSync("./public_key.pem", "utf-8");
const encryptedMessage = encrypt_public_key(public_key, process.env.MSG);

console.log('encryptedMessage: \n', encryptedMessage);


const private_key = fs.readFileSync("./private_key.pem", "utf-8");
const message = decrypt_private_key(private_key, encryptedMessage);

console.log("decryptedMessage: \n", message.toString("utf-8"));

