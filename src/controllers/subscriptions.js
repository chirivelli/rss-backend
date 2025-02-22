import { Hono } from 'hono'
import { User } from '../mongodb'
import * as logger from '../logger'

const subscriptions = new Hono()

subscriptions.post('/', async ctx => {
    logger.log('POST /subscriptions')

    const username = ctx.req.header('X-Username')

    const site = await ctx.req.json()

    const user = await User.findOne({ username: username })

    const prevUser = await User.findOneAndUpdate(
        { username: username },
        {
            subscriptions: [
                ...user.subscriptions,
                {
                    name: site.name,
                    link: site.link,
                },
            ],
        },
    )

    const updatedUser = await User.findOne({ username: username })

    logger.log(updatedUser)

    return ctx.json(updatedUser)
})

export default subscriptions
