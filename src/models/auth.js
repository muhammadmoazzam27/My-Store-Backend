const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        uid: { type: String, required: true, trim: true, unique: true },
        email: { type: String, required: true, trim: true, unique: true },
        fullName: { type: String, required: true, trim: true, min: 3 },
        password: { type: String, required: true, trim: true, min: 6 },
        role: { type: String, trim: true, enum: ["Super Admin", "Admin", "Customer"], default: "Customer" },
        status: { type: String, trim: true, enum: ["Active", "In-Active"], default: "Active" },
    },
    { timestamps: true }
)

const Users = model("users", userSchema);

module.exports = { Users };
