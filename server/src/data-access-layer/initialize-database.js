const database = require("./database");

const isConnected = async () => {
    return new Promise((resolve) => {
        database.raw("SELECT 1").then(() => {
            console.log("MySQL connected");
            resolve(true);
        }).catch((e) => {
            console.log("MySQL not connected");
            console.error(e);
            resolve(false);
        });
    });
}

const wait = ms => new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
});

const untilConnected = (operation, retries = 10, delay = 100) => new Promise((resolve, reject) => {
    return operation()
        .then(resolve)
        .catch(() => {
            if (retries > 0) {
                return wait(delay)
                    .then(untilConnected.bind(null, operation, retries - 1, delay))
                    .then(resolve)
                    .catch(reject);
            }
            return reject(`Cannot connect to MySQL within ${retries} attempts`);
        });
});

module.exports = async () => {
    await untilConnected(isConnected);
    console.log('Seeding data...');

    if (!await database.schema.hasTable('tasks')) {
        await database.schema
            .createTable('tasks', table => {
                table.uuid('id').primary();
                table.string('title').notNullable();
                table.string('description').notNullable();
                table.boolean('completed').defaultTo(false);
                table.timestamp('due_date').notNullable();
                table.timestamp('created_at').defaultTo(database.fn.now());
                table.timestamp('updated_at').defaultTo(database.fn.now());
            });
    }
};
