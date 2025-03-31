import { Hono } from 'hono'
import { db } from '../db'

const users = new Hono()

users.get('/', async ctx => {
    const username = ctx.req.header('X-Username')

    const user = await db.collection('users').findOne({ username: username })

    return ctx.json(user)
})

users.get('/all', async ctx => {
    const users = await db.collection('users').find().toArray()

    return ctx.json(users)
})

export default users
