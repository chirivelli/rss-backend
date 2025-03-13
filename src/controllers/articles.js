import { Hono } from 'hono'
import { User } from '../mongodb'
import { XMLParser } from 'fast-xml-parser'

const articles = new Hono()

let posts = []
async function getPosts() {
    const user = await User.findOne({ username: 'sathwikc' })
    const subs = user.subscriptions
    const parser = new XMLParser({ ignoreAttributes: true })
    posts = []
    for (const sub of subs) {
        const res = await fetch(sub.link)
        const xmlText = await res.text()
        const jsonObj = parser.parse(xmlText)
        const feed = jsonObj.rss?.channel ?? jsonObj.feed
        const postsList = feed.item ?? feed.entry
        for (const post of postsList) {
            console.log(post)

            posts.push({
                title: post.title,
                site: sub.name,
                pubDate: post.pubDate ?? post['published'],
                snippet: post.description ?? post.summary,
                author: post['dc:creator'] ?? post.author?.name,
                link: post.link || post['id'],
            })
        }
    }
}

articles.get('/', async ctx => {
    await getPosts()
    return ctx.json(posts)
})

export default articles
