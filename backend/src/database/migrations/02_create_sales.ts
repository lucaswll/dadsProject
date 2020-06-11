import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('sales', function(table){
        table.increments('id').primary()
        table.text('date').notNullable()
    
        table.integer('id_client')
        .notNullable()
        .references('id')
        .inTable('clients')
      })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('sales')
}