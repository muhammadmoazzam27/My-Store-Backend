const mongoose = require("mongoose");

const MONGO_DB_URI = process.env.MONGO_DB_URL

const connectDB = () => {

    mongoose.connect(`${MONGO_DB_URI}`)

        .then(() => {
            console.log("mongoDB successfully connected")
        })
        .catch((error) => {
            console.log("mongoDB not connected", error)
        })

}

module.exports = { connectDB };
