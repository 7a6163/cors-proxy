import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Middleware to handle CORS
app.use('*', cors())

// Utility function to validate and construct URL
const constructUrl = (path) => {
  if (!path) return null

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  if (path.includes(':')) {
    const [host, port] = path.split(':')
    return `https://${host}:${port}`
  }

  return `https://${path}`
}

// Proxy handler with full URL in path
app.all('/*', async (c) => {
  const path = c.req.path.slice(1) // Remove the leading slash

  if (path === '') {
    return c.text('Usage: http://localhost:8080/{url}\nExamples:\nhttp://localhost:8080/http://google.com/\nhttp://localhost:8080/google.com\nhttp://localhost:8080/google.com:443', 200)
  }

  if (path === 'favicon.ico') {
    return c.text('Not found', 404)
  }

  const targetUrl = constructUrl(path)

  if (!targetUrl) {
    return c.text('Invalid URL', 400)
  }

  try {
    const response = await fetch(targetUrl, {
      method: c.req.method,
      headers: c.req.headers,
      body: c.req.body,
    })

    const headers = new Headers(response.headers)
    headers.set('Access-Control-Allow-Origin', '*')

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  } catch (err) {
    return c.text('Error fetching target URL', 500)
  }
})

export default app
