import { Hono } from 'hono'
import { XMLParser } from 'fast-xml-parser'
import { db } from '../mongo.js'

const articles = new Hono()

async function getPosts(blogLink: string) {
    const posts = []
    const parser = new XMLParser({ ignoreAttributes: true })
    const res = await fetch(blogLink)
    const xmlText = await res.text()
    const jsonObj = parser.parse(xmlText)

    let feedName = jsonObj.rss?.channel?.title ?? jsonObj.feed.title
    feedName =
        feedName.split(' ').length < 4 ? feedName : feedName.split(' ')[0]

    const feed = jsonObj.rss?.channel ?? jsonObj.feed
    const postsList = feed.item ?? feed.entry
    for (const post of postsList) {
        // console.log(post)

        const date = new Date(post.pubDate ?? post.published)

        posts.push({
            title: post.title,
            site: feedName,
            published: date,
            snippet: post.description ?? post.summary,
            author: post['dc:creator'] ?? post.author?.name,
            link: post.link || post['id'],
            imageLink: jsonObj.feed?.icon ?? jsonObj.rss?.channel?.image?.url,
        })

        if (posts.length == 10) return posts
    }
    return posts
}

articles.get('/', async ctx => {
    const blogLink = ctx.req.header('X-FeedLink')
    if (blogLink === undefined) {
        return ctx.json([])
    }
    const posts = await getPosts(blogLink)
    return ctx.json(posts)
})

articles.get('/sorted', async ctx => {
    // merge k sorted list
    // naive sorting!
    const username = ctx.req.header('X-Username')

    const user = await db.collection('users').findOne({ username: username })

    if (!user) return ctx.json([])

    const res = []

    for (let sub of user.subscriptions) {
        const posts = await getPosts(sub.link)
        res.push(...posts)
    }

    res.sort((a, b) => b.published.getTime() - a.published.getTime())

    return ctx.json(res)
})

export default articles
