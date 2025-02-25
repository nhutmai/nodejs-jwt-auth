const mongoose = require('mongoose');

require("dotenv").config();

const connDB = () => {
    mongoose.connect(process.env.DB_URL);
}

module.exports = connDB;