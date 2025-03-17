
const { default: mongoose } = require("mongoose")

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.LOCAL_MONGO_URI );
        console.log("DB Connnected Successfully")
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = { connectDB }