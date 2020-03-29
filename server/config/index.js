require('dotenv').config();
const path = require('path');

/** Default config will remain same in all environments and can be over-ridded */
let config = {
    frontendRoot: path.join(path.resolve(__dirname) + '../../../build/'),
    env: process.env.NODE_ENV || 'development',
    port: process.env.BASE_PORT || 6060,
    mongo: { uri: process.env.MONGO_DB || 'mongodb://localhost:27017/orders-crud' },
    socketPort: process.env.SOCKET_PORT || 3002,
    socketUrl: process.env.SOCKET_URL || 'localhost',
    ddosConfig: {
        burst: 100,
        limit: 100,
    },
    whitelist: null,
    fcm: { 'server-key': '' }
};

module.exports = config;