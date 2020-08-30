import Knex from 'knex';

export const TABLE_NAME = "collect_point";

export async function up(config:Knex) {
    return config.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable()
            .references('id').inTable('user');
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('image').notNullable();
        table.decimal('address_latitude').notNullable();
        table.decimal('address_longitude').notNullable();
        table.string('address_number').notNullable();
        table.string('address_city').notNullable();
        table.string('address_uf', 2).notNullable();
    });
};
export async function down(config:Knex) {
    return config.schema.dropTable(TABLE_NAME);
};