import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('sales_products', function(table){
        table.increments('id').primary()

        table.integer('id_sales')
        .notNullable()
        .references('id')
        .inTable('sales')
        
        table.integer('id_prodSale')
        .notNullable()
        .references('id')
        .inTable('product_sale')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('sales_products')
}