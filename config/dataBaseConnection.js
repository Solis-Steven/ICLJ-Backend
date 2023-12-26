import mongoose from "mongoose";

// This function makes connection with the database
const dataBaseConnection = async() => {
    try {
        const uri = process.env.MONGODB_URI || "";
        console.log("uri", uri)
        const connection = await mongoose.connect(uri);


        const url = `${connection.connection.host}: ${connection.connection.port}`;
        console.log(`Connected: ${url}`);
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1);
    }
}

export default dataBaseConnection;