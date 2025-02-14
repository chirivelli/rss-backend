import { Hono } from 'hono'
import { cors } from 'hono/cors'
const app = new Hono()

app.use('/*', cors())

const subscriptions = [
    {
        name: 'The Verge',
        category: 'Tech + Culture',
        feedLink: 'https://www.theverge.com/rss/index.xml',
    },
    {
        name: 'CNET',
        category: 'Smart Home',
        feedLink: 'https://www.cnet.com/rss/news/',
    },
    {
        name: 'Engadget',
        category: 'Tech',
        feedLink: 'https://www.engadget.com/rss/',
    },
    {
        name: 'Tech Crunch',
        category: 'Startup',
        feedLink: 'https://techcrunch.com/feed/',
    },
]

app.get('/subscriptions', ctx => {
    return ctx.json(subscriptions)
})

app.get('/subscriptions/:idx', async ctx => {
    const idx = ctx.req.param('idx')
    console.log(idx)
    // @ts-ignore
    const tvRes = await fetch(subscriptions[idx].feedLink)
    const tvXml = await tvRes.text()
    return ctx.text(tvXml)
    // return ctx.text('testing')
})

export default app
