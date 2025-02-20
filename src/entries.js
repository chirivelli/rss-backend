import { Hono } from 'hono'
import { XMLParser } from 'fast-xml-parser'

const entries = new Hono()

entries.get('/:username', async ctx => {
    const username = ctx.req.param('username')

    const response = await fetch(
        'http://localhost:3000/subscriptions/' + username,
    )
    let sites = await response.json()

    const parser = new XMLParser()

    for (let i = 0; i < sites.length; i++) {
        const res = await fetch(sites[i]?.feed_link)
        const rssXml = await res.text()
        let jsonObj = parser.parse(rssXml)
        console.log(jsonObj)
        sites[i] = { ...sites[i], xml: rssXml }
    }
    return ctx.json(sites)
})

export default entries
