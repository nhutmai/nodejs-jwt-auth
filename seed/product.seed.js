const Product = require('../models/product');
const mongoose = require('mongoose');
require("dotenv").config();

const seedAdmin = async () => {
    mongoose.connect(process.env.DB_URL);
    console.log("connected to the database");
    await Product.deleteMany({});
    const category = ["Fiction", "NonFiction", "Fantasy", "Thriller"]
    const products = [];

    for (let i = 0; i < 50; i++) {
        const randomYear = Math.floor(Math.random() * 24) + 2000;
        const randomCategory = category[Math.floor(Math.random() * 4)];
        products.push({
            id: i + 1,
            publishYear: randomYear,
            title: `books title ${i + 1}`,
            category: randomCategory,
        })
    }
    await Product.insertMany(products);
    console.log("products added successfully.");

}
seedAdmin();