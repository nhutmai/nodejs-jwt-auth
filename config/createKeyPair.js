const crypto = require("crypto");
const fs = require("fs");

function createKeyPair() {
    const keypair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        }
    })

    fs.writeFileSync("config/public_key.pem", keypair.publicKey);
    fs.writeFileSync("config/private_key.pem", keypair.privateKey);
    console.log("keys created successfully.");
}

createKeyPair();