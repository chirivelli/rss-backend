import { Hono } from 'hono'
import { User } from '../mongodb'
import { db } from '../db'

const users = new Hono()

users.get('/', async ctx => {
    const username = ctx.req.header('X-Username')

    const user = await User.findOne({ username: username })

    return ctx.json(user)
})

users.get('/all', async ctx => {
    const usersCollection = db.collection('users')
    const users = await usersCollection.find().toArray()
    return ctx.json(users)
})

export default users
