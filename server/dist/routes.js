import express from "express";
import { getConnectedClient, connectToMongoDB } from "./database.js";
import { ObjectId } from "mongodb";
const DATABASE_NAME = "firstMernProjectDB";
const COLLECTION_NAME = "firstMernProjectCollection";
export const router = express.Router();
const getCollectionMiddleware = async (req, res, next) => {
    try {
        await connectToMongoDB();
        const client = getConnectedClient();
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
        res.locals.collection = collection;
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
    const { component, order, props } = req.body;
    // Check to see if the required fields are present
    if (!component || typeof (component) !== 'string' ||
        !order || typeof (order) !== 'number' ||
        !props) {
        return res.status(400).json({
            error: 'Missing required fields: component, order, and props'
        });
    }
    const { title, title2, description, buttonText, imageUrl, imageUrlArr, childCardComponent } = props;
    // Add a check to ensure childCardComponent exists instead of destructuring its properties
    const cTitle = childCardComponent?.cTitle;
    const cTitle2 = childCardComponent?.cTitle2;
    const cDescription = childCardComponent?.cDescription;
    const cImageUrlArr = childCardComponent?.cImageUrlArr;
    const cIconIdentifier = childCardComponent?.cIconIdentifier;
    // Check to see if the required props are present
    if (typeof title !== 'string' ||
        (title2 !== undefined && typeof title2 !== 'string') ||
        typeof description !== 'string' ||
        (buttonText !== undefined && typeof buttonText !== 'string') ||
        (imageUrl !== undefined && typeof imageUrl !== 'string') ||
        (imageUrlArr !== undefined && !Array.isArray(imageUrlArr)) ||
        (childCardComponent !== undefined && (!Array.isArray(cTitle) ||
            (cTitle2 !== undefined && !Array.isArray(cTitle2)) ||
            (cDescription !== undefined && !Array.isArray(cDescription)) ||
            (cImageUrlArr !== undefined && !Array.isArray(cImageUrlArr)) ||
            (cIconIdentifier !== undefined && !Array.isArray(cIconIdentifier))))) {
        return res.status(400).json({
            error: "Invalid or missing fields",
            details: {
                title: typeof title !== 'string' ? 'Title is required and must be a string.' : undefined,
                title2: title2 !== undefined && typeof title2 !== 'string' ? 'Title2 must be a string.' : undefined,
                description: typeof description !== 'string' ? 'Description is required and must be a string.' : undefined,
                buttonText: buttonText !== undefined && typeof buttonText !== 'string' ? 'ButtonText must be a string.' : undefined,
                imageUrl: imageUrl !== undefined && typeof imageUrl !== 'string' ? 'ImageUrl must be a string.' : undefined,
                imageUrlArr: imageUrlArr !== undefined && !Array.isArray(imageUrlArr) ? 'ImageUrlArr must be an array of strings.' : undefined,
                childCardComponent: childCardComponent !== undefined && (!Array.isArray(cTitle) ||
                    (cTitle2 !== undefined && !Array.isArray(cTitle2)) ||
                    (cDescription !== undefined && !Array.isArray(cDescription)) ||
                    (cImageUrlArr !== undefined && !Array.isArray(cImageUrlArr)) ||
                    (cIconIdentifier !== undefined && !Array.isArray(cIconIdentifier))) ? 'ChildCardComponent fields are invalid.' : undefined,
            }
        });
    }
    // Proceed to the next middleware or route handler if validation passes
    next();
};
// Apply the middleware to use the collection in all routes
router.use(getCollectionMiddleware);
// GET sections
router.get('/ui-sections', async (req, res) => {
    try {
        const collection = res.locals.collection;
        const sections = await collection.find({}).sort({ order: 1 }).toArray();
        res.status(200).json({
            sections: sections
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch sections"
        });
    }
});
// POST section
router.post('/ui-sections', validateSection, async (req, res) => {
    try {
        const collection = res.locals.collection;
        const { component, order, props } = req.body;
        const newSection = await collection.insertOne({
            component: component,
            isActive: true,
            order: typeof (order) !== "number" ? JSON.stringify(order) : order,
            props: props
        });
        res.status(201).json({
            msg: "Section added successfully",
            sectionId: newSection.insertedId
        });
    }
    catch (error) {
        console.error('Error adding section:', error);
        res.status(500).json({ error: `Failed to add section: ${error}` });
    }
});
// PUT section
router.put('/ui-sections', async (req, res) => {
    try {
        const { sections } = req.body;
        const collection = res.locals.collection;
        // Prepare the bulk update operations
        const bulkOps = sections.map((section) => ({
            updateOne: {
                filter: { _id: new ObjectId(section._id) },
                update: {
                    $set: {
                        component: section.component,
                        isActive: section.isActive,
                        order: section.order,
                        props: {
                            title: section.props.title,
                            title2: section.props.title2 || null, // Optional field
                            description: section.props.description,
                            buttonText: section.props.buttonText || null, // Optional field
                            imageUrl: section.props.imageUrl || null, // Optional field
                            imageUrlArr: section.props.imageUrlArr || [], // Optional field
                            childCardComponent: section.props.childCardComponent
                                ? {
                                    cTitle: section.props.childCardComponent.cTitle,
                                    cTitle2: section.props.childCardComponent.cTitle2 || [],
                                    cDescription: section.props.childCardComponent.cDescription || [],
                                    cImageUrlArr: section.props.childCardComponent.cImageUrlArr || [],
                                    cIconIdentifier: section.props.childCardComponent.cIconIdentifier || [],
                                }
                                : null, // Optional object
                        },
                    },
                },
            },
        }));
        // Perform bulk update operations
        const result = await collection.bulkWrite(bulkOps);
        res.status(200).json({
            msg: 'Sections updated successfully',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount,
        });
    }
    catch (error) {
        console.error('Error updating sections:', error);
        res.status(500).json({ error: 'Failed to update sections' });
    }
});
// DELETE section
router.delete('/ui-sections/:id', async (req, res) => {
    try {
        const collection = res.locals.collection;
        const _id = new ObjectId(req.params.id);
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
