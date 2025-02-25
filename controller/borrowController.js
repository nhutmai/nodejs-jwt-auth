const User = require("../models/user");
const Product = require("../models/product");

const borrow = async (req, res) => {
    const {userId, productId} = req.body;
    const user = await User.findOne({id: userId});
    const product = await Product.findOne({id: productId});


    if (!product || !product.available) {
        return res.status(401).json({message: "Product is not available"});
    }

    if (user.borrowBooks.length >= user.borrowLimit) {
        return res.status(401).json({message: "Borrow limit Reached"});
    }
    user.borrowBooks.push(product.id);
    product.available = false;

    await user.save();
    await product.save();
    return res.status(201).json({message: `${user.name} borrow ${product.title} successfull`});

}
const topBorrower = async (req, res) => {
    try {
        const topBorrower = await User.aggregate([
            {
                $project: {
                    name: 1,
                    email: 1,
                    borrowCount: {$size: "$borrowBooks"}
                }
            },
            {$sort: {borrowCount: -1}},
            {$limit: 1}// lấy  người đầu tiên
        ]);

        if (!topBorrower.length) {
            return res.status(404).json({message: "Không có dữ liệu"});
        }

        res.status(200).json(topBorrower[0]);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const topCategory = async (req, res) => {
    try {
        const categoryStats = await User.aggregate([
            {$unwind: "$borrowBooks"},
            {
                $lookup: {
                    from: "products",
                    localField: "borrowBooks",
                    foreignField: "id",
                    as: "bookDetails"
                }
            },
            {$unwind: "$bookDetails"},
            {
                $group: {
                    _id: "$bookDetails.category",
                    count: {$sum: 1}
                }
            },
            {$sort: {count: -1}},
            {$limit: 1}
        ]);

        if (!categoryStats.length) {
            return res.status(404).json({message: "Không có dữ liệu"});
        }

        res.status(200).json({
            category: categoryStats[0]._id,
            borrowCount: categoryStats[0].count
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {borrow, topCategory, topBorrower}