const User = require("../models/User");
const {hashPwd} = require("../lib/pwdUtils");


const seedAdmin = async () => {
    if (!await User.findOne({role: 'admin'})) {
        const {salt, hash} = hashPwd("admin123");
        await User.insertOne({
            name: "admin123",
            salt,
            hash,
            role: 'admin',
            email: "admin@example.com",
        });
    }
}

console.log("created")
module.exports = seedAdmin;