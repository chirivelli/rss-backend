import { Hono } from 'hono'
import { cors } from 'hono/cors'
import users from './users'
import subscriptions from './subscriptions'
import entries from './entries'

const app = new Hono()

app.use('/*', cors())

app.route('/users', users)
app.route('/subscriptions', subscriptions)
app.route('/entries', entries)

export default app
