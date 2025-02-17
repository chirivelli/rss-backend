import { Database } from 'bun:sqlite'

const db = new Database('rss_db.sqlite')

export default db
