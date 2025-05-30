import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectToDatabase()
.then(() => {
    app.on("error",(err)=>{
        console.log("Application is not able to talk to the database", err);
        throw err;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("MONOGO DB CONNECTION ERROR", err);
});


