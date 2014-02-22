var
    dbConfig = require('./config/database.json'),
    tables = require('./config/tables'),
    cronJob = require('cron').CronJob,
    en = require('lingo').en,
    server = {
        mode: process.env.mode || 'dev',
        config: function(name) {
            return {
                db: dbConfig[this.mode]
            }[name];
        }
    },
    orm = require('./config/orm')(server.config('db'), tables)
    ;

server.init = function() {
    console.log('simulating... ');

    for (var tableName in tables) {
        var table = tables[tableName];
        console.log('table: ', tableName);
        new cronJob(table.rate, job(tableName, table), null, true);
    }

    function job(tableName, table) {
        return function() {
            var random = Math.random();

            if (typeof table.randomOffset === 'undefined' || random <= table.randomOffset) {
                console.log('insert record to', tableName);

                var data = {};

                for (var fieldName in table.fields) {
                    var field = table.fields[fieldName];

                    if (typeof field.value !== 'undefined') {
                        data[fieldName] = field.value();
                        console.log(fieldName, '-', data[fieldName]);
                    }
                }

                orm.models[tableName].create(data).success(function() {
                    console.log('... done!');
                });
            }
        };
    }

};

server.init();
