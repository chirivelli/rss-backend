import { Hono } from 'hono'
import { User } from '../mongodb'
import * as logger from '../logger'
import { XMLParser } from 'fast-xml-parser'

const articles = new Hono()

articles.get('/', async ctx => {
    logger.log('GET /articles')

    // const username = ctx.req.header('X-Username')

    const user = await User.findOne({ username: 'sathwikc' })

    const subs = user.subscriptions

    const parser = new XMLParser({
        ignoreAttributes: true,
    })

    const iter = []
    const posts = []

    for (const sub of subs) {
        const res = await fetch(sub.link)
        const xmlText = await res.text()
        const jsonObj = parser.parse(xmlText)
        iter.push(jsonObj.feed || jsonObj.rss.channel)
    }

    for (const site of iter) {
        // console.log(site)
        const siteName = site.title
        console.log(siteName)
        const myList = site.entry || site.item
        for (const single of myList) {
            posts.push({
                title: single.title,
                site: siteName,
                pubDate: single.published || single.pubDate,
                snippet: single.summary || single.description,
            })
        }
        console.log(myList.length)
        console.log('-----------------')
    }

    return ctx.json(posts)
})

export default articles
