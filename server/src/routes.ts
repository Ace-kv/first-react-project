import express, { Request, Response, NextFunction } from "express"
import { getConnectedClient, connectToMongoDB } from "./database"
import { Collection, ObjectId } from "mongodb"

const DATABASE_NAME = "firstMernProjectDB"
const COLLECTION_NAME = "firstMernProjectCollection"

export const router = express.Router()

const getCollectionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectToMongoDB()
        const client = getConnectedClient()

        if (!client) {
            return res.status(500).json({
                msg: "Failed to connect to MongoDb"
            })
        }

        const collection = client?.db(DATABASE_NAME).collection(COLLECTION_NAME)

        if (!collection) {
            return res.status(500).json({
                msg: "Failed to get the collection"
            })
        }

        // Store the collection in res.locals for use in subsequent middleware or route handlers
        res.locals.collection
        // Continue to the next middleware or route handler
        next()
    } catch (error) {

        console.error("Database connection error", error);

        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Database connection error',
                error: error.message,
            });

        } else {
            res.status(500).json({
                msg: 'Unknown error occurred',
            });
        }
    }
}

const validateSection = async (req: Request, res: Response, next: NextFunction) => {
    const { component, isActive, order, props } = req.body

    // Check to see if the required fields are present
    if (!component || typeof(component) !== 'string' || typeof(isActive) !== 'boolean' || !order || typeof(order) !== 'number' || !props) {
        return res.status(400).json({
            error: 'Missing required fields: component, order, and props'
        })
    }

    const {title, description, buttonText, imageUrl} = props

    // Check to see if the required props are present
    if (!title || !description || !buttonText || imageUrl) {
        return res.status(400).json({
            error: "Missing required prop fields: title, description, buttonText, and imageUrl"
        })
    }

    // Proceed to the next middleware or route handler if validation passes
    next()

}

// Apply the middleware to use the collection in all routes
router.use(getCollectionMiddleware)

// GET sections
router.get('/ui-sections', async (req: Request, res: Response) => {
    try {
        const collection: Collection = res.locals.collection
        const sections = await collection.find({}).sort({order: 1}).toArray()

        res.status(200).json({ sections })

    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch sections"
        })

    }
})

// POST section
router.post('/ui-sections', validateSection, async (req: Request, res: Response) => {
    try {
        const collection: Collection = res.locals.collection
        const { component, order, props } = req.body

        const newSection = await collection.insertOne({
            _id: new ObjectId(),
            component: component,
            isActive: true,
            order: typeof(order) !== "string" ? JSON.stringify(order) : order,
            props: props
        })

        res.status(201).json({
            msg: "Section added successfully",
            sectionId: newSection.insertedId
        })

    } catch (error) {
        console.error('Error adding section:', error);
        res.status(500).json({ error: 'Failed to add section' })
    }
})

// DELETE section
router.delete('/ui-sections/:id', async (req: Request, res: Response) => {
    try {
        const collection: Collection = res.locals.collection 
        const _id = new ObjectId(req.params.id)

        const deleteSection = await collection.deleteOne({
            _id: _id
        })

        if (deleteSection.deletedCount === 0) {
            return res.status(404).json({
                error: "Section not found"
            })
        }

        res.status(200).json({
            deletedSection: deleteSection
        })

    } catch (error) {
        console.error('Error deleting section:', error);
        res.status(500).json({ error: 'Failed to delete section' })
    }

})
