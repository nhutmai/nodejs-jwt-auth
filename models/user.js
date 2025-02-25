const mongoose = require("mongoose");
const autoIncrease = require("mongoose-sequence")(mongoose);

// Kiểm tra xem model đã tồn tại chưa
const User = mongoose.models.User || (() => {
    const userSchema = new mongoose.Schema(
        {
            id: {type: Number, unique: true},
            name: {type: String, required: true, minLength: 8, unique: true},
            hash: {type: String, required: true},
            salt: {type: String, required: true},
            email: {type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/},
            borrowBooks: {type: [Number], default: []},
            borrowLimit: {type: Number, default: 5},
            role: {type: String, enum: ["admin", "user"], default: "user"}
        },
        {timestamps: true}
    );

    // Kiểm tra plugin đã được đăng ký chưa
    if (!userSchema.plugins.some((p) => p === autoIncrease)) {
        userSchema.plugin(autoIncrease, {inc_field: "id", id: "user_auto_increment"});
    }

    return mongoose.model("User", userSchema);
})();

module.exports = User;
