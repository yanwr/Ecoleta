import Knex from 'knex';

export const TABLE_NAME = "collect_item";

export async function up(config:Knex) {
    return config.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('image').notNullable();
    });
};

export async function down(config:Knex) {
    return config.schema.dropTable(TABLE_NAME);
};