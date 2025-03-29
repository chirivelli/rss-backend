import { Hono } from 'hono'
import { cors } from 'hono/cors'
import users from './controllers/users'
import articles from './controllers/articles'
import subscriptions from './controllers/subscriptions'

const app = new Hono()

app.use('/*', cors())

app.get('/', ctx => {
    return new Response('Running on Render')
})

app.route('/users', users)
app.route('/articles', articles)
app.route('/subscriptions', subscriptions)

export default app
