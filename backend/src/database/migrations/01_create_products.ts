import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('products', function(table){
        table.increments('id').primary()
        table.string('name').notNullable()
        table.decimal('price').notNullable()
        table.decimal('commission').notNullable()
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('products')
}