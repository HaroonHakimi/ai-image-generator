import mongoose from "mongoose";

const connectDB = (url) => {

    if (!url) {
        console.log("MongoDB URI is undefined or not provided.");
        return;
    }

    mongoose.set('strictQuery', true)

    mongoose.connect(url)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))
}

export default connectDB
