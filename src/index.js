import { Hono } from 'hono'
import { cors } from 'hono/cors'
import users from './users'
import subscriptions from './subscriptions'

const app = new Hono()

app.use('/*', cors())

app.route('/users', users)
app.route('/subscriptions', subscriptions)

export default app
