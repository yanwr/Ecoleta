import Knex from 'knex';

export const TABLE_NAME = "collect_point_item";

export async function up(config:Knex) {
    return config.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary();
        table.integer('point_id').notNullable()
            .references('id').inTable('collect_point');
        table.integer('item_id').notNullable()
            .references('id').inTable('collect_item');
    });
};
export async function down(config:Knex) {
    return config.schema.dropTable(TABLE_NAME);
};