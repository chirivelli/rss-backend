import { Hono } from 'hono'
import db from './sqlite'

const users = new Hono()

users.get('/', ctx => {
    const query = db.query(`
        SELECT * 
        FROM users;
    `)

    return ctx.json(query.all())
})

users.get('/:username', async ctx => {
    const username = ctx.req.param('username')

    const query = db.query(`
        SELECT * 
        FROM users 
        WHERE username='${username}';
    `)

    return ctx.json(query.get())
})

export default users
