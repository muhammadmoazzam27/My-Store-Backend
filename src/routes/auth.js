const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/auth");
const { isValidEmail, getRandomId } = require("../utils/global");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/register", async (req, res) => {

    try {

        const { fullName, email, password } = req.body;

        if (fullName.length < 3 || fullName.trim() === "" || !isValidEmail(email) || password.length < 6 || password.trim() === "") {
            return res.status(400).json({ message: "Please fill the all fields", isError: true, success: false })
        }

        const userFound = await Users.findOne({ email })

        if (userFound) {
            return res.status(403).json({ message: "A user already exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const uid = getRandomId()

        const userData = { fullName, email, password: hashPassword, uid }

        const user = await Users.create(userData);

        await user.save();

        return res.status(201).json({ message: "A user successfully registered", success: true, isError: false, user })

    }
    catch (error) {
        console.error("Server Error ", error);
        return res.status(500).json({ message: "Something went wrong", isError: true, success: false })
    }

})


router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password", isError: false, success: false })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (verifyPassword) {

            const uid = user.uid;

            const token = await jwt.sign({ uid }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "2h" })

            return res.status(200).json({ message: "A user successfully login", success: true, isError: false, token })

        }

        return res.status(401).json({ message: "Invalid email or password", isError: true, success: false })

    }
    catch (error) {
        console.error("Server Error ", error);
        return res.status(500).json({ message: "Something went wrong", isError: true, success: false })
    }

})

router.get("/get/user", verifyToken, async (req, res) => {

    try {

        const uid = req.uid;

        const user = await Users.findOne({ uid }).select("-password")

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password", success: false, isError: true })
        }

        return res.status(200).json({ message: "login successful", success: true, isError: false, user })

    }
    catch (error) {
        console.error("Server Error ", error);
        return res.status(500).json({ message: "Something went wrong", isError: true, success: false })
    }

})


module.exports = router;
