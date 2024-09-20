import express from "express";
import { router } from "./routes.js";
import { connectToMongoDB } from './database.js';
import cors from "cors";
const app = express();
app.use(cors({
    origin: "https://first-react-project-jade.vercel.app", // Replace with your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "hello"
    });
});
// Middleware to parse JSON bodies for POST and others
app.use(express.json());
app.use("/api", router);
const startServer = async () => await connectToMongoDB();
startServer();
export default app;
