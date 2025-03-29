import { MongoClient } from 'mongodb'

export let db

export const connect = async () => {
    if (db !== null) {
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
        db = client.db()
    }
    return db
}
