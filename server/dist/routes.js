"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const mongodb_1 = require("mongodb");
const DATABASE_NAME = "firstMernProjectDB";
const COLLECTION_NAME = "firstMernProjectCollection";
exports.router = express_1.default.Router();
const getCollectionMiddleware = async (req, res, next) => {
    try {
        await (0, database_1.connectToMongoDB)();
        const client = (0, database_1.getConnectedClient)();
        if (!client) {
            return res.status(500).json({
                msg: "Failed to connect to MongoDb"
            });
        }
        const collection = client?.db(DATABASE_NAME).collection(COLLECTION_NAME);
        if (!collection) {
            return res.status(500).json({
                msg: "Failed to get the collection"
            });
        }
        // Store the collection in res.locals for use in subsequent middleware or route handlers
        res.locals.collection;
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error("Database connection error", error);
        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Database connection error',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                msg: 'Unknown error occurred',
            });
        }
    }
};
const validateSection = async (req, res, next) => {
    const { component, isActive, order, props } = req.body;
    // Check to see if the required fields are present
    if (!component || typeof (component) !== 'string' || typeof (isActive) !== 'boolean' || !order || typeof (order) !== 'number' || !props) {
        return res.status(400).json({
            error: 'Missing required fields: component, order, and props'
        });
    }
    const { title, description, buttonText, imageUrl } = props;
    // Check to see if the required props are present
    if (!title || !description || !buttonText || imageUrl) {
        return res.status(400).json({
            error: "Missing required prop fields: title, description, buttonText, and imageUrl"
        });
    }
    // Proceed to the next middleware or route handler if validation passes
    next();
};
// Apply the middleware to use the collection in all routes
exports.router.use(getCollectionMiddleware);
// GET sections
exports.router.get('/ui-sections', async (req, res) => {
    try {
        const collection = res.locals.collection;
        const sections = await collection.find({}).sort({ order: 1 }).toArray();
        res.status(200).json({ sections });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch sections"
        });
    }
});
// POST section
exports.router.post('/ui-sections', validateSection, async (req, res) => {
    try {
        const collection = res.locals.collection;
        const { component, isActive, order, props } = req.body;
        const newSection = await collection.insertOne({
            _id: new mongodb_1.ObjectId(),
            component,
            isActive,
            order,
            props
        });
        res.status(201).json({
            msg: "Section added successfully",
            sectionId: newSection.insertedId
        });
    }
    catch (error) {
        console.error('Error adding section:', error);
        res.status(500).json({ error: 'Failed to add section' });
    }
});
// DELETE section
exports.router.delete('/ui-sections/:id', async (req, res) => {
    try {
        const collection = res.locals.collection;
        const _id = new mongodb_1.ObjectId(req.params.id);
        const deleteSection = await collection.deleteOne({
            _id: _id
        });
        if (deleteSection.deletedCount === 0) {
            return res.status(404).json({
                error: "Section not found"
            });
        }
        res.status(200).json({
            deletedSection: deleteSection
        });
    }
    catch (error) {
        console.error('Error deleting section:', error);
        res.status(500).json({ error: 'Failed to delete section' });
    }
});
