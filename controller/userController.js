const passport = require("../config/passport");
const User = require("../models/user");
const {hashPwd, validatePwd} = require("../lib/pwdUtils");
const {signToken} = require("../lib/jwt_utils");
const e = require("express");

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(password, email);
    const user = await User.findOne({email});
    if (!user || !validatePwd(password, user.salt, user.hash)) {
        return res.status(401).json({message: "invalid email or password"});
    }
    const token = signToken({id: user.id, role: user.role});

    res.json({
        user, token
    })

};
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "Email đã tồn tại"});
        }

        const {salt, hash} = hashPwd(password)

        const newUser = new User({
            name,
            email,
            hash,
            salt
        });

        await newUser.save();

        return res.status(201).json({message: "Đăng ký thành công", user: {id: newUser.id, role: newUser.role}});
    } catch (error) {
        return res.status(500).json({message: "Lỗi server", error: error.message});
    }
};

const getAllUsers = async (req, res) => {
    const {currentPage = 1, totalPage = 5} = req.query;
    const limit = parseInt(totalPage);
    const skip = (parseInt(currentPage) - 1) * limit;
    const users = await User.find({}).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments({});

    return res.status(200).json({
        currentPage: parseInt(currentPage),
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        users
    });
}


const getOneUser = async (req, res) => {
    const {id} = req.params.id;
    const user = await User.findOne({id})
    return res.status(200).json(user);
}

const updateUser = async (req, res) => {
    const {id} = req.params.id;
    const user = User.findOneAndUpdate(
        {id},
        req.body,
        {new: true}
    );
    return res.status(200).json(user);
}

const deleteUser = async (req, res) => {
    const {id} = req.params.id;
    await User.finOneAndDelete({id});
    res.json({message: "user deleted successfully"});
}

module.exports = {loginUser, getAllUsers, registerUser, updateUser, deleteUser, getOneUser};