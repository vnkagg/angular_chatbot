const http = require('http');
console.log('Hello! the backend server is running on localhost:8080');
const app = require('./backend/app');
const port = 8080;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
