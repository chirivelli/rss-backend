import { Hono } from 'hono'
import { User } from '../mongodb'

const subscriptions = new Hono()

subscriptions.post('/', async ctx => {
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

    return ctx.json(updatedUser)
})

subscriptions.delete('/', async ctx => {
    const username = ctx.req.header('X-Username')

    const site = await ctx.req.json()

    const user = await User.findOne({ username: username })

    const newSubs = user.subscriptions.filter(sub => sub.link !== site.link)

    const prevUser = await User.findOneAndUpdate(
        { username: username },
        { subscriptions: [...newSubs] },
    )

    const updatedUser = await User.findOne({ username: username })

    return ctx.json(updatedUser)
})

export default subscriptions
