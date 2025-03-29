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

export const User = mongoose.model('User', userSchema)
