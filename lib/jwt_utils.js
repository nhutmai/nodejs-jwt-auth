const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./config/private_key.pem", "utf8");

const signToken = (payload, expiresIn = "1d") => {
    return jwt.sign(
        {
            id: payload.id,
            role: payload.role,
        },
        privateKey,
        {
            algorithm: 'RS256', // Sửa "algorithms" thành "algorithm"
            expiresIn,
        }
    );
}

module.exports = {signToken};
