/**
 * Simulating insertion of a given table and its config
**/
var simulator = function(tableName, table, models) {
    function skip(table) {
        var randomOffset;

        if (typeof table.randomOffset === 'function') {
            randomOffset = table.randomOffset();
        } else {
            randomOffset = table.randomOffset;
        }

        return typeof table.randomOffset === 'undefined' || Math.random() <= randomOffset;
    }

    function insert(data) {
        models[tableName].create(data);
    }

    function findForeignKey(table, name, callback) {
        models[table].find({
            limit: 1,
            attributes: ['id'],
            order: 'RAND()'
        }).success(function(record) {
            if (record) {
                callback(name, record.values.id);
            }
        });
    }

    return {
        init: function() {
            if (!skip(table)) {
                return;
            }

            var
                self,
                data = {},
                waiting = []
                ;

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
