import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('product_sale', function(table){
        table.increments('id').primary()
        table.decimal('qty').notNullable()

        table.integer('id_product')
        .notNullable()
        .references('id')
        .inTable('products')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('product_sale')
}