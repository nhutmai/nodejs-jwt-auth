const Product = require('../models/product');

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const saved = await product.save();
        return res.status(200).json(saved);
    } catch (err) {
        res.status(400).send({"message": err.message});
    }

}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = Product.findOne({id});
        if (!product) {
            return res.status(404).send({"message": "Product not found"});
        }
        const saved = await product.updateOne(req.body);
        return res.status(200).json({"message": "product updated successfully"});
    } catch (err) {
        res.status(400).send({"message": err.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({id});
        if (!product) {
            return res.status(404).send({"message": "Product not found"});
        }
        await product.deleteOne();
        return res.status(200).json({"message": "product deleted successfully"});
    } catch (err) {
        res.status(400).send({"message": err.message});
    }

}

const getAllProduct = async (req, res) => {
    try {
        const {currentPage = 1, limits = 10, sortBy = "title", order = "asc"} = req.query;
        const limit = parseInt(limits);
        const skip = (parseInt(currentPage) - 1) * limit;
        const allows = ["publishedYear", "title"]
        const sortField = allows.indexOf(sortBy) ? sortBy : "title";
        const sortOrder = order === "desc" ? -1 : 1;
        const products = await Product.find({})
            .sort({[sortField]: sortOrder})
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments();

        return res.status(200).json({
            currentPage: parseInt(currentPage),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products
        });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};


const getOneProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({id})
    if (!product) {
        return res.status(404).send({"message": "Product not found"});
    }
    res.status(200).json(product);
}

module.exports = {createProduct, getAllProduct, getOneProduct, deleteProduct, updateProduct}