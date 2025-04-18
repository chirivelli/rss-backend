import { Hono } from 'hono'
import { db } from '../mongo.js'

const users = new Hono()

users.get('/', async ctx => {
    const username = ctx.req.header('X-Username')

    if (!username) {
        return ctx.json(await db.collection('users').find().toArray())
    }

    const user = await db.collection('users').findOne({ username: username })

    return ctx.json(user)
})

export default users
