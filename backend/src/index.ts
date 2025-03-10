import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono();
app.use('/api/*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);



export default app
