var
    dbConfig = require('./config/database.json'),
    tables = require('./config/tables'),
    simulator = require('./simulator'),
    cronJob = require('cron').CronJob,
    server = {
        mode: process.env.mode || 'dev',
        config: function(name) {
            return {
                db: dbConfig[this.mode]
            }[name];
        }
    },
    orm = require('./orm')(server.config('db'), tables)
    ;

server.init = function() {
    console.log('simulating... ');

    for (var tableName in tables) {
        var table = tables[tableName];

        if (!table.disable) {
            console.log('table: ', tableName);
            new cronJob(table.rate, simulator(tableName, table, orm).init, null, true);
        }
    }
};

server.init();
