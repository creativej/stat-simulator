var
    Table = require('../table'),
    Faker = require('Faker');

/**
 * List of tables and its config for simulation
 * Note: If you're changing the schema of an existing table you will need to
 * write/run a database migration for it.
 * You can do that using Sequelize's migrations feature
 *
 * http://sequelizejs.com/docs/latest/migrations
**/
module.exports = {
    /**
     * Simulate user sign in
    **/
    users: {
        fields: Table.fields({
            name: {
                type: Table.types('string'),
                value: function() {
                    return Faker.Name.findName();
                }
            },
            email: {
                type: Table.types('string'),
                value: function() {
                    return Faker.Internet.email();
                }
            }
        }),
        randomOffset: 0.2,
        disable: false,
        rate: '0 */5 * * * *' // Cron pattern http://crontab.org/
    },

    /**
     * Simulate invoice creations
    **/
    invoices: {
        fields: Table.fields({
            userId: {
                type: Table.types('integer'),
                relation: 'users'
            },
            total: {
                type: Table.types('integer'),
                value: function() {
                    return 20 + Math.round(Math.random() * 1200);
                }
            }
        }),
        randomOffset: 0.1,
        rate: '0 */10 * * * *'
    },

    /**
     * Simulate site visits
    **/
    visits: {
        fields: Table.fields(),
        randomOffset: function() {
            return 0.05 + Math.random() * 0.05;
        },
        disable: false,
        rate: '*/15 * * * * *'
    }
};

