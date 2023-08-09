const http = require('http');
const routes = require('./routes/routes');

const server = http.createServer(routes.handleRequest);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Proxy server running at port ${PORT}`);
});
