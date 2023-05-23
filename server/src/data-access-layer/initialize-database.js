const database = require("./database");

module.exports = async () => {
    console.log('Seeding data...');
    // await database.migrate.latest();
    try {
        if (!await database.schema.hasTable('tasks')) {
            await database.schema
                .createTable('tasks', table => {
                    table.increments('id');
                    table.string('title').notNullable();
                    table.string('description').notNullable();
                    table.boolean('completed').defaultTo(false);
                    table.timestamp('due_date').notNullable();
                    table.timestamp('created_at').defaultTo(database.fn.now());
                    table.timestamp('updated_at').defaultTo(database.fn.now());
                });
        }
    } catch(err) {
        console.error(err);
    }
};
