import mongoose from "mongoose";


const Connection = async (USERNAME, PASSWORD) => {

    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.jc28gjo.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;

    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to MongoDB', error);
        process.exit(1); // Exit process with failure
    }
}

export default Connection;