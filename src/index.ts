import { Database } from 'bun:sqlite'
import { Hono } from 'hono'

const db = new Database(':memory:')
const query = db.query("SELECT 'Hello world' as message;")
const result = query.get() // => { message: "Hello world" }
console.log(result)

const app = new Hono()

app.get('/', ctx => {
    return ctx.text('Hello Hono!')
})

export default app
