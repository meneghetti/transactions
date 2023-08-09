const ProxyController = require('../controllers/proxyController');
const config = require('../config');

const proxyController = new ProxyController();

function handleRequest(req, res) {
  // Set CORS headers
  Object.entries(config.corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Get request body
  let body = [];
  req
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();

      req.body = body;

      // Handle routes
      if (req.url === '/api/get' && req.method === 'GET') {
        proxyController.handleGet(req, res);
      } else if (req.url === '/api/post' && req.method === 'POST') {
        proxyController.handlePost(req, res);
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });
}

module.exports = { handleRequest };
