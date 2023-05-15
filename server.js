const http = require('http');
const app = require('./backend/app');
const port = 8080;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.log('hello, the server is running now, go to localhost:8080');
