
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('users', function (table) {
    table.dropColumn('name');
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('email');
    table.string('password');
    table.string('picture');
  }),
  knex.schema.createTable('lists', function (table) {
    table.increments('id');
    table.string('name');
    table.string('description');
    table.integer('user_id').references('id').inTable('users');
  }),
  knex.schema.createTable('points', function (table) {
    table.increments('id');
    table.decimal('lat');
    table.decimal('lng');
    table.string('name');
    table.integer('list_id').references('id').inTable('lists');
    table.string('picture');
  }),
  knex.schema.createTable('favourites', function (table) {
    table.increments('id');
    table.integer('list_id').references('id').inTable('lists');
    table.integer('user_id').references('id').inTable('users');
  })
]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropTable('users');
    }),
    knex.schema.table('lists', function(table) {
      table.dropTable('lists');
    }),
    knex.schema.table('points', function(table) {
      table.dropTable('points');
    }),
    knex.schema.table('favourites', function(table) {
      table.dropTable('favourites');
    })
  ]);
};
