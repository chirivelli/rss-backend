import { Hono } from 'hono'
import { User } from '../mongodb'

const users = new Hono()

users.get('/', async ctx => {
    const username = ctx.req.header('X-Username')

    const user = await User.findOne({ username: username })

    return ctx.json(user)
})

export default users
