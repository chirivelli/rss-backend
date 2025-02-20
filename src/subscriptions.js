import { Hono } from 'hono'
import db from './sqlite'

const subscriptions = new Hono()

subscriptions.get('/:username', async ctx => {
    const username = ctx.req.param('username')

    const userQuery = db.query(`
        SELECT * 
        FROM users 
        WHERE username='${username}';
    `)
    const user = userQuery.get()

    const query = db.query(`
        SELECT name, feed_link
        FROM subscriptions
        WHERE user_id = ${user.id};
    `)

    return ctx.json(query.all())
})

subscriptions.post('/', async ctx => {
    const newSubscription = await ctx.req.json()
    console.log(newSubscription)

    // const query = db.query(`
    //     INSERT INTO subscriptions (user_id, name, feed_link)
    //     VALUES (${newSubscription.user_id}, '${newSubscription.name}', '${newSubscription.feed_link}');
    // `)
    // console.log(query.get())

    return ctx.text('created!')
})

export default subscriptions
