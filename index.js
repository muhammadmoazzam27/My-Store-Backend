require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/Databases/mongoDB");

const PORT = process.env.PORT || 8000

const app = express();

connectDB()

app.use(cors());
app.use(express.json());

app.use("/", (req,res)=>{
    res.send(`A server is running on PORT ${PORT}`)
})

app.use("/health", (req,res)=>{
    res.send("A server health is Good")
})

app.listen(PORT, (req,res)=>{
    console.log(`A server is running on PORT ${PORT}`)
})
