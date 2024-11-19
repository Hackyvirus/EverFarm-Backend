import mongoose from "mongoose";
import { dataBaseName } from "../constants.js";


const ConnectDB = async () => {
    try {
        const db = await mongoose.connect(`${process.env.MONGO_DB_URI}/${dataBaseName}`);
        console.log(`Database Connectet at ${db.connection.host}`)

    } catch (error) {
        console.log("Error While connecting to Database");
        process.exit(1);
    }
}

export default ConnectDB