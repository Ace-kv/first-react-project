"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { router } from "./routes";
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
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
app.use(express_1.default.json());
// app.use("/api", router)
(0, database_1.connectToMongoDB)();
exports.default = app;
