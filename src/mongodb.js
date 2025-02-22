import mongoose, { Schema } from 'mongoose'
const uri = process.env.MONGODB_URI

await mongoose.connect(uri)

const siteSchema = new Schema({
    name: String,
    link: String,
})

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    subscriptions: [siteSchema],
})

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    snippet: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
})

export const User = mongoose.model('User', userSchema)
export const Article = mongoose.model('Article', articleSchema)
