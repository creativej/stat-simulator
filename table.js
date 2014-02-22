var
    Sequelize = require('sequelize'),
    extend = require('extend');

/**
 * Helper methods for constructing table config
**/
module.exports = {
    types: function(name) {
        return {
            primaryKey: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            integer: Sequelize.INTEGER,
            string: Sequelize.STRING,
            timestamp: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        }[name];
    },
    fields: function(override) {
        return extend(true, {
            id: {
                type: this.types('primaryKey')
            },
            createdAt: {
                type: this.types('timestamp')
            }
        }, override);
    }
};
