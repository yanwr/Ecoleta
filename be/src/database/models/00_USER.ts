import Knex from 'knex';

export const TABLE_NAME = "user";

export async function up(config:Knex) {
    return config.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
    });
};
export async function down(config:Knex) {
    return config.schema.dropTable(TABLE_NAME);
};