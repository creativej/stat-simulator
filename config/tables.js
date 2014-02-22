var
    Sequelize = require('sequelize'),
    extend = require('extend'),
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

function tableFields(override) {
    return extend(true, {
        id: {
            type: types.primaryKey
        },
        createdAt: {
            type: types.timestamp
        }
    }, override);
}

var tables = {
    users: {
        fields: tableFields({
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
            }
        }),
        randomOffset: 0.1,
        disable: false,
        rate: '0 */5 * * * *' // Cron pattern http://crontab.org/
    },
    invoices: {
        fields: tableFields({
            userId: {
                type: types.integer,
                relation: 'users'
            },
            total: {
                type: types.integer,
                value: function() {
                    return 20 + Math.round(Math.random() * 1200);
                }
            }
        }),
        randomOffset: 0.2,
        rate: '0 * * * * *'
    },
    visits: {
        fields: tableFields(),
        randomOffset: 0.2,
        disable: false,
        rate: '* * * * * *'
    }
};

module.exports = tables;

