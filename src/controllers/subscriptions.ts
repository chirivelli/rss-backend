import { Hono } from 'hono'
import { db } from '../mongo.js'
import { WithId } from 'mongodb'

type User = {
    username: string
    subscriptions: Array<{
        name: string
        link: string
    }>
}

const subscriptions = new Hono()

subscriptions.get('/', async ctx => {
    const username = ctx.req.header('X-Username')

    const user = await db
        .collection('users')
        .findOne<WithId<User>>({ username: username })

    if (!user) return ctx.json([])

    return ctx.json(user.subscriptions)
})

subscriptions.post('/', async ctx => {
    const username = ctx.req.header('X-Username')
    const site = await ctx.req.json()

    const usersCollection = db.collection('users')
    const user = await usersCollection.findOne<WithId<User>>({
        username: username,
    })

    if (!user) return ctx.json({})

    if (user.subscriptions.map(x => x.link).includes(site.link)) {
        return ctx.json(user)
    }

    await usersCollection.updateOne(
        { username: username },
        { $push: { subscriptions: site } },
    )

    const updatedUser = await usersCollection.findOne({ username: username })

    return ctx.json(updatedUser)
})

subscriptions.delete('/', async ctx => {
    const username = ctx.req.header('X-Username')
    const site = await ctx.req.json()

    const usersCollection = db.collection('users')
    const user = await db
        .collection('users')
        .findOne<WithId<User>>({ username: username })

    if (!user) return ctx.json({})

    const newSubs = user.subscriptions.filter(x => x.link !== site.link)

    await usersCollection.updateOne(
        { username: username },
        { $set: { subscriptions: newSubs } },
    )

    const updatedUser = await usersCollection.findOne({ username: username })

    return ctx.json(updatedUser)
})

export default subscriptions
