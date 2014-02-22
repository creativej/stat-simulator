module.exports = function(config, tables) {
    var
        Sequelize = require('sequelize'),
        sequelize = new Sequelize(config.database, config.user, config.password),
        orm = {
            sequelize: sequelize,
            models: {},
        };

    for (var tableName in tables) {
        var table = tables[tableName];
        var schema = {};

        for (var fieldName in table.fields) {
            schema[fieldName] = table.fields[fieldName].type;
        }

        orm.models[tableName] = sequelize.define(
            tableName,
            schema,
            {
                timestamps: false,
                tableName: tableName
            }
        );
    }

    sequelize.sync({
        // force: true
    });

    return orm;
};
