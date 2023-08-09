const http = require('http');
const routes = require('./routes/routes');
require('dotenv').config();

const server = http.createServer(routes.handleRequest);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});