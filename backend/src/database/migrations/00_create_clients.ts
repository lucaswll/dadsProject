import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('clients', function(table){
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('description')
        table.string('fone').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('clients')
}