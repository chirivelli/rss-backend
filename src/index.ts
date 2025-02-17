import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Database } from 'bun:sqlite'

const app = new Hono()
const db = new Database('rss_db.sqlite')

db.run(`
    CREATE TABLE IF NOT EXISTS sites (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    feedLink VARCHAR NOT NULL)
`)

// db.run(`
//     INSERT INTO sites (name, feedLink)
//     VALUES
//         ('The Verge', 'https://www.theverge.com/rss/index.xml'),
//         ('CNET', 'https://www.cnet.com/rss/news/'),
//         ('Engadget', 'https://www.engadget.com/rss/'),
//         ('Tech Crunch', 'https://techcrunch.com/feed/')
// `)

app.use('/*', cors())

app.get('/', ctx => {
    return ctx.text('Hono is Running!')
})

app.get('/subscriptions', ctx => {
    const query = db.query(`SELECT * FROM sites`)
    return ctx.json(query.all())
})

app.get('/subscriptions/:id', async ctx => {
    const idx = ctx.req.param('id')
    console.log(idx)

    const query = db.query(`SELECT * FROM sites WHERE id=${idx}`)
    const site = query.get()
    // @ts-ignore
    const response = await fetch(site.feedLink)
    const xmlString = await response.text()
    return ctx.text(xmlString)
})

export default app
