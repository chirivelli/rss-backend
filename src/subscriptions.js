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
        JOIN sites
        ON sites.id = subscriptions.site_id
        WHERE subscriptions.user_id = ${user.id};
    `)

    return ctx.json(query.all())
})

export default subscriptions
