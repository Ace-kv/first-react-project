import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

let client: MongoClient | undefined
export const connectToMongoDB = async () => {
    if (!client) {
        try {
            client = new MongoClient(uri, options);
            await client.connect();  // Await the connection
            console.log("Connected to MongoDB");
            
        } catch (error) {
            console.error();
            await closeMongoDBConnection(); // Properly close the connection on error
            throw new Error('MongoDB connection failed'); // Throw an error to handle in middleware
        }
    }

    return client
}

export const getConnectedClient = () => client

const closeMongoDBConnection = async () => {
    if (client) {
        try {
          await client.close();
          console.log("MongoDB Connection Closed");
        } catch (closeError) {
          console.error('Error closing MongoDB connection:', closeError);
        }
        client = undefined; // Reset the client after closing
      }
}

// Listen for SIGINT (Ctrl+C)
process.on('SIGINT', closeMongoDBConnection)

// Listen for SIGTERM (termination signal)
process.on('SIGTERM', closeMongoDBConnection)