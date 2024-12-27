import mongoose from "mongoose";

const options = {
    dbName: 'toDoListApp'
}

const connectDB = () => {
    mongoose.connect(process.env.mongodb_url, options)
        .then(() => console.log(`DB is connected`))
        .catch((error) => console.error(error));
}

export default connectDB;