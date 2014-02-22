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
    orm = require('./config/orm')(server.config('db'))
    ;

server.init = function() {
    for (var tableName in tables) {
        var table = tables[tableName];

        new cronJob(table.rate, job(tableName, table), null, true);
    }

    function job(tableName, table) {
        return function() {
            var random = Math.random();

            if (typeof table.randomOffset === 'undefined' || random <= table.randomOffset) {
                console.log('insert record to', tableName);

                var data = {};

                for (var field in table.fields) {
                    var value = table.fields[field]();
                    data[field] = value;

                    console.log(field, '-', value);
                }

                var modelName = en.singularize(tableName);

                orm.models[modelName].create(data).success(function() {
                    console.log('... done!');
                });
            }
        };
    }

};

server.init();
