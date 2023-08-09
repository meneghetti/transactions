const ProxyController = require('../controllers/proxyController');
const config = require('../config');

const proxyController = new ProxyController();

function handleRequest(req, res) {
    res.writeHead(200, config.corsHeaders);

    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }

    if (req.url === '/api/get' && req.method === 'GET') {
        proxyController.handleGet(req, res);
    } else if (req.url === '/api/post' && req.method === 'POST') {
        proxyController.handlePost(req, res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
}

module.exports = { handleRequest };