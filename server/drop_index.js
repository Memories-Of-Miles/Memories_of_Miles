import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB");
        try {
            const indexes = await User.collection.getIndexes();
            console.log("Current indexes:", indexes);

            if (indexes.username_1) {
                await User.collection.dropIndex("username_1");
                console.log("Index username_1 dropped successfully");
            } else {
                console.log("Index username_1 does not exist");
            }
        } catch (error) {
            console.log("Error:", error.message);
        }
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
