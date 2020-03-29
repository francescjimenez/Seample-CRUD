const httpServer = require('http').createServer();

const {
    port, env, socketUrl, socketPort,
} = require('./config');

const server = require('./server');
// const database = require('./database');
const scheduler = require('./scheduler');


const socket = require('./socket');

global.io = require('socket.io').listen(httpServer);
socket.init();

// database.connect();

server.listen(port, () => {
    scheduler();
    console.info(`Server started on port ${port} (${env})`);
});

httpServer.listen(socketPort, socketUrl, () => {
    console.info(`Socket server started on ${socketUrl}:${socketPort}(${env})`);
});

module.exports = server;