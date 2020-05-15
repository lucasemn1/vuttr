exports.up = function (knex) {
    return knex.schema.createTable('tagsTools', (table) => {
        table.increments('id')
        table.integer('toolId').unsigned().references('id').inTable('tools').onDelete('CASCADE')
        table.integer('tagId').unsigned().references('id').inTable('tags').onDelete('CASCADE')
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tagsTools');
};
