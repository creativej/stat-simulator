var
    Sequelize = require('sequelize'),
    Faker = require('Faker');

var types = {
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
};

var tables = {
    users: {
        fields: {
            id: {
                type: types.primaryKey
            },
            name: {
                type: types.string,
                value: function() {
                    return Faker.Name.findName();
                }
            },
            email: {
                type: types.string,
                value: function() {
                    return Faker.Internet.email();
                }
            },
            createdAt: {
                type: types.timestamp
            }
        },
        randomOffset: 0.1,
        rate: '0 */2 * * * *' // Cron pattern http://crontab.org/
    },
    invoices: {
        fields: {
            id: {
                type: types.primaryKey
            },
            userId: {
                type: types.integer
            },
            total: {
                type: types.integer,
                value: function() {
                    return 20 + Math.round(Math.random() * 1200);
                }
            }
        },
        randomOffset: 0.2,
        rate: '0 * * * * *'
    }
};

module.exports = tables;

