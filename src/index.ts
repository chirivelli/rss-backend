import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { connect } from './mongo.js'
import users from './controllers/users.js'
import articles from './controllers/articles.js'
import subscriptions from './controllers/subscriptions.js'

const app = new Hono()

app.use(logger())
app.use('/*', cors())

await connect()

app.get('/', () => new Response('Running on Vercel!'))

app.route('/users', users)
app.route('/articles', articles)
app.route('/subscriptions', subscriptions)

export default app
