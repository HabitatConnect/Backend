const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;