import { Hono } from 'hono'
import { db } from '../db'

const users = new Hono()

users.get('/', async ctx => {
    const username = ctx.req.header('X-Username')
    const usersCollection = db.collection('users')
    const user = await usersCollection.findOne({ username: username })
    console.log(user)
    return ctx.json(user)
})

users.get('/all', async ctx => {
    const usersCollection = db.collection('users')
    const users = await usersCollection.find().toArray()
    return ctx.json(users)
})

export default users
