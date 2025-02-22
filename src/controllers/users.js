import { Hono } from 'hono'
import { User } from '../mongodb'
import * as logger from '../logger'

const users = new Hono()

users.get('/', async ctx => {
    logger.log('GET /users')

    const username = ctx.req.header('X-Username')

    const user = await User.findOne({ username: username })

    logger.log(user)

    return ctx.json(user)
})

export default users
