var
    Sequelize = require('sequelize'),
    Faker = require('Faker');

var tables = {
    users: {
        fields: {
            id: {
                type: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                }
            },
            name: {
                type: Sequelize.STRING,
                value: function() {
                    return Faker.Name.findName();
                }
            },
            email: {
                type: Sequelize.STRING,
                value: function() {
                    return Faker.Internet.email();
                }
            },
            createdAt: {
                type: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                }
            }
        },
        randomOffset: 0.2,
        rate: '*/5 * * * * *' // Cron pattern http://crontab.org/
    }
};

module.exports = tables;

