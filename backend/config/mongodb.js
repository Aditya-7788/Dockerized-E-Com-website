import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log("DB Connected");
    })

    // the URI in .env already includes the database name, so connect directly
    // avoid appending another path segment or you'll create an invalid namespace like
    // "ecommerce/e-commerce" which MongoDB rejects.
    await mongoose.connect(process.env.MONGODB_URI)

}

export default connectDB;