import { Hono } from 'hono'
import { cors } from 'hono/cors'
const app = new Hono()

app.use('/*', cors())

app.get('/subscriptions', ctx => {
    return ctx.json([
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
    ])
})

app.get('/theverge', async ctx => {
    const tvRes = await fetch('https://www.theverge.com/rss/index.xml')
    const tvXml = await tvRes.text()
    return ctx.text(tvXml)
})

export default app
