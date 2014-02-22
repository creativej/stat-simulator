module.exports = function(config) {
    var
        Sequelize = require('sequelize'),
        sequelize = new Sequelize(config.database, config.user, config.password),
        orm = {
            sequelize: sequelize,
            models: {}
        };

    orm.models.user = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        timestamps: false
    });

    return orm;
};
