import { Hono } from 'hono'
import { User } from './mongodb'

const users = new Hono()

users.get('/', async ctx => {
    console.log('GET /users/')

    const users = await User.find()

    return ctx.json(users)
})

users.get('/:username', async ctx => {
    console.log('GET /users/:username')

    const username = ctx.req.param('username')

    const user = await User.findOne({ username: username })

    return ctx.text(username)
})

export default users
