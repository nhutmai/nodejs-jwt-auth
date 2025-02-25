const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const Product = mongoose.models.Product || (() => {
    const productSchema = new mongoose.Schema(
        {
            title: {type: String, required: true, minLength: 8, unique: true},
            publishYear: {type: Number, max: new Date().getFullYear()},
            available: {type: Boolean, default: true},
            category: {type: String, enum: ["Fiction", "NonFiction", "Fantasy", "Thriller"]},
        },
        {timestamps: true}
    );

// Thêm auto-increment cho id
    productSchema.plugin(autoIncrement, {inc_field: "id", id: "product_auto_increment"});
    return mongoose.model("Product", productSchema);
})();

module.exports = Product;
