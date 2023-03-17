exports.up = function (knex) {
    return knex.schema.createTable('producttable', function (table) {
        table.increments('id').primary();
        table.string('product_name');
        table.string('product_description');
        table.integer('product_cost');
        table.string('product_color');
        table.string('product_brand');
        table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('producttable');
  };
  