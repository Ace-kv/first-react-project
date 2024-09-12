import express, { Express, Request, Response } from "express";
// import { router } from "./routes";
import { connectToMongoDB } from './database';
import cors from "cors"

const app: Express = express()

app.use(cors({
    origin: "https://first-react-project-jade.vercel.app",  // Replace with your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE"],  
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.get("/", (req: Request, res: Response) => {                 // positional args
    res.status(200).json({
        msg: "hello" 
    })
})

// Middleware to parse JSON bodies for POST and others
app.use(express.json())

// app.use("/api", router)

// connectToMongoDB()

export default app