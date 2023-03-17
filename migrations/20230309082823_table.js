exports.up = function (knex) {
  return knex.schema.createTable('infotable', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('password');
    table.enu('role', ['admin', 'merchant', 'user', 'delivery']).defaultTo('user');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('infotable');
};