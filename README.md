# CORS Anywhere with Hono and Cloudflare Workers

This project demonstrates how to create a CORS Anywhere proxy using the [Hono](https://github.com/honojs/hono) framework and deploy it on [Cloudflare Workers](https://workers.cloudflare.com/).

## Features

- Proxy requests to bypass CORS restrictions.
- Handles URLs passed directly in the path.
- Supports both HTTP and HTTPS.
- Shows usage instructions when accessed without a URL.
- Returns a 404 for `/favicon.ico` requests.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/7a6163/cors-proxy
    cd cors-proxy
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Deploy to Cloudflare Workers**:

    ```bash
    npm run deploy
    ```

## Usage

Once deployed, you can use your CORS Anywhere proxy by passing the target URL directly in the path.

### Examples

- `https://your-worker-subdomain.workers.dev/http://google.com/` - Proxies requests to Google.com with CORS headers.
- `https://your-worker-subdomain.workers.dev/google.com` - Same as previous, defaults to HTTPS.
- `https://your-worker-subdomain.workers.dev/google.com:443` - Proxies `https://google.com/`.
- `https://your-worker-subdomain.workers.dev/` - Shows usage text.
- `https://your-worker-subdomain.workers.dev/favicon.ico` - Replies with 404 Not Found.

## License

This project is licensed under the MIT License.
