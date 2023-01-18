//code for launching Server
const http =  require('http');
const app = require('./app'); //import app from app.js

const port = process.env.PORT || 3000; //access environment port, if not use 3000
const server = http.createServer(app); //listener for incoming request(handle them)

server.listen(port);