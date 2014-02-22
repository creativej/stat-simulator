var
    dbConfig = require('./config/database.json'),
    server = {};

server.mode = process.env.mode || 'dev';
server.config = {
    db: dbConfig[server.mode]
};

module.exports = server;
