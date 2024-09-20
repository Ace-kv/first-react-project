import express, { Express, Request, Response } from "express";
import { router } from "./routes.js";
import { connectToMongoDB } from './database.js';
import cors from "cors"
import path from "path";
import { fileURLToPath } from 'url';

// Use `fileURLToPath` to get the current file path, and derive `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express()

app.use(cors({
    origin: "https://first-react-project-jade.vercel.app",  // Replace with your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE"],  
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

// Serve static files from the 'public/assets' directory
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.get("/", (req: Request, res: Response) => {                 // positional args
    res.status(200).json({
        msg: "hello" 
    })
})

// Middleware to parse JSON bodies for POST and others
app.use(express.json())

app.use("/api", router)

const startServer = async () => await connectToMongoDB()

startServer()

export default app