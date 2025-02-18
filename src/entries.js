import { Hono } from 'hono'

const entries = new Hono()

entries.get('/:username', async ctx => {
    const username = ctx.req.param('username')

    const response = await fetch(
        'http://localhost:3000/subscriptions/' + username,
    )
    let sites = await response.json()
    console.log(sites)

    for (let i = 0; i < sites.length; i++) {
        const res = await fetch(sites[i].feed_link)
        const rssXml = await res.text()

        sites[i] = { ...sites[i], xml: rssXml }
    }
    return ctx.json(sites)
})

export default entries
