// The main entry point for the Express server and configuration initialization
import * as dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { musicController } from "./controllers";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());



app.use("/", musicController);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// mongoose.connect(process.env.ATLAS_URI);
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully");

// });

export default app;