exports.up = function(knex) {
    return knex.schema.createTable('tagsTools', (table) => {
        table.increments('id')
        table.integer('toolId').unsigned().references('id').inTable('tools')
        table.integer('tagId').unsigned().references('id').inTable('tags')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tools');
};
