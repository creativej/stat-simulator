var Faker = require('Faker');

var tables = {
    users: {
        fields: {
            name: function() {
                return Faker.Name.findName();
            },
            email: function() {
                return Faker.Internet.email();
            }
        },
        randomOffset: 0.2,
        rate: '*/5 * * * * *' // Cron pattern http://crontab.org/
    }
};

module.exports = tables;

