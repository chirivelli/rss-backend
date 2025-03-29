import { Db, MongoClient } from 'mongodb'

export let db: Db

export const connect = async () => {
    if (db !== null) {
        const mongodbURL = process.env.MONGODB_URL
        if (!mongodbURL) {
            throw new Error('MONGODB_URL is not defined')
        }
        const client = await MongoClient.connect(mongodbURL)
        console.log('Connected to MongoDB')
        db = client.db()
    }
    return db
}
