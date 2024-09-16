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
            await closeMongoDBConnection(); // Properly close the connection on error
            throw new Error('MongoDB connection failed'); // Throw an error to handle in middleware
        }
    }
    return client;
};
exports.connectToMongoDB = connectToMongoDB;
const getConnectedClient = () => client;
exports.getConnectedClient = getConnectedClient;
const closeMongoDBConnection = async () => {
    if (client) {
        try {
            await client.close();
            console.log("MongoDB Connection Closed");
        }
        catch (closeError) {
            console.error('Error closing MongoDB connection:', closeError);
        }
        client = undefined; // Reset the client after closing
    }
};
// Listen for SIGINT (Ctrl+C)
process.on('SIGINT', closeMongoDBConnection);
// Listen for SIGTERM (termination signal)
process.on('SIGTERM', closeMongoDBConnection);
