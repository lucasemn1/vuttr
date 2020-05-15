exports.up = function(knex) {
    return knex.schema.createTable('tools', (table) => {
        table.increments('id')
        table.string('title').notNullable();
        table.string('link').notNullable();
        table.string('description').notNullable();
        table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tools');
};
