require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/Databases/mongoDB");
const auth = require("./src/routes/auth");

const PORT = process.env.PORT || 8000

const app = express();

connectDB()

app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);

app.get("/", (req, res) => {
    return res.send(`A server is running on PORT ${PORT}`);
})

app.get("/health", (req, res) => {
    return res.send("A server health is Good");
})

app.listen(PORT, (req, res) => {
    console.log(`A server is running on PORT ${PORT}`)
})
