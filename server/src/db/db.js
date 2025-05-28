import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectToDatabase = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`);

        // console.log("Connected to database successfully" ,connectionInstance);
        console.log("Connected to database successfullyt" ,connectionInstance.connection.host);

    }
    catch(err){
        console.log("Error connecting to database", err);
        process.exit(1); // Exit process with failure , this functionality is provided by nodejs 
    }
}

export default connectToDatabase;