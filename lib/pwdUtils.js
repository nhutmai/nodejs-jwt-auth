const crypto = require("crypto");

function validatePwd(password, salt, hash) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex");
    return hashVerify === hash;
}

const hashPwd = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex");
    return {salt, hash};
};

module.exports = {validatePwd, hashPwd};