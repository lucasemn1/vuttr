exports.up = function (knex) {
    return knex.schema.createTable('tags', (table) => {
        table.increments('id')
        table.string('tag').notNullable().unique();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tags');
};
