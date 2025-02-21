import mongoose, { Schema } from 'mongoose'
const uri =
    'mongodb+srv://sathwikc:vmgQAwsSjQQhMbZs@calorismontes.ef1nl.mongodb.net/test?retryWrites=true&w=majority&appName=CalorisMontes'

await mongoose.connect(uri)

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
})

export const User = mongoose.model('User', userSchema)
