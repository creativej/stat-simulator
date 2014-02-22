var simulator = function(tableName, table, orm) {
    function skip(table) {
        var random = Math.random();
        return typeof table.randomOffset === 'undefined' || random <= table.randomOffset;
    }

    function insert(data) {
        console.log('inserting.. ');
        console.log(data);
        orm.models[tableName].create(data).success(function() {
            console.log('... done!');
        });
    }

    function findForeignKey(table, name, callback) {
        orm.models[table].find({
            limit: 1,
            attributes: ['id'],
            order: 'RAND()'
        }).success(function(record) {
            callback(name, record.values.id);
        });
    }

    return {
        init: function() {
            if (!skip(table)) {
                return;
            }

            var self;
            var data = {};
            var waiting = [];

            for (var fieldName in table.fields) {
                var field = table.fields[fieldName];
                if (field.relation) {
                    waiting.push('');

                    findForeignKey(field.relation, fieldName, function(name, value) {
                        data[name] = value;
                        waiting.pop();
                        if (!waiting.length) {
                            insert(data);
                        }
                    });
                } else if (typeof field.value !== 'undefined') {
                    data[fieldName] = field.value();
                }
            }

            if (!waiting.length) {
                insert(data);
            }
        }
    };
};
module.exports = simulator;
