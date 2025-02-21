import { Hono } from 'hono'
import { cors } from 'hono/cors'
import users from './users'

const app = new Hono()

app.use('/*', cors())

app.route('/users', users)

export default app
