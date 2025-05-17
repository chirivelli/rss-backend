type User = {
    username: string
    subscriptions: Array<Subscription>
}

type Subscription = {
    name: string
    link: string
}

type Post = {
    title: string
    author: string
    snippet: string
    link: string
    site: string
    imageLink: string
    published: Date
}
