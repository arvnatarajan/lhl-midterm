
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('points', function(table){
    table.string('description');
  })
])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('points', function(table){
    table.dropColumn('description');
  })
])
};
