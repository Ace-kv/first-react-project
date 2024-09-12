"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedClient = exports.connectToMongoDB = void 0;
require("dotenv/config");
const mongodb_1 = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const options = {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};
let client;
const connectToMongoDB = async () => {
    if (!client) {
        try {
            client = new mongodb_1.MongoClient(uri, options);
            await client.connect(); // Await the connection
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error();
        }
    }
    return client;
};
exports.connectToMongoDB = connectToMongoDB;
const getConnectedClient = () => client;
exports.getConnectedClient = getConnectedClient;
const closeMongoDBConnection = async () => {
    if (client) {
        await client.close(); // Gracefully close the MongoDB connection
        console.log("MongoDB Connection Closed");
        client = undefined;
    }
};
// Listen for SIGINT (Ctrl+C)
process.on('SIGINT', closeMongoDBConnection);
// Listen for SIGTERM (termination signal)
process.on('SIGTERM', closeMongoDBConnection);
