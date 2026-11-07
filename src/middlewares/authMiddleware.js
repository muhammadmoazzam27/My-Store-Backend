const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

    try {

        const authHeader = req?.headers?.authorization

        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized user", success: false, isError: true })
        }

        const token = authHeader.split(" ")[1]

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.uid = decoded.uid;

        next();

    }
    catch (error) {
        console.error("Server Error ", error);
        return res.status(500).json({ message: "Something went wrong", isError: true, success: false })
    }

}

module.exports = { verifyToken };
