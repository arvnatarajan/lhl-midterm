exports.seed = function(knex, Promise) {


  return knex('users').del()
    .then(function() {
        return Promise.all([
            knex('users').insert({
            id: 1,
            first_name: 'Alice',
            last_name: 'Baxter',
            username: 'ABaxtr',
            email: 'abax@bax.bax',
            password: '1234',
            picture: 'http://i0.kym-cdn.com/photos/images/facebook/000/181/907/Massimo-DAlema.jpg'
          }),
          knex('users').insert({
            id: 2,
            first_name: 'Bobby',
            last_name: 'Butts',
            username: 'BobbyButtz',
            email: 'BButz@bax.bax',
            password: '12345',
            picture: 'http://www.relatably.com/m/img/reaction-memes/2af.jpg'
          }),
          knex('users').insert({
            id: 3,
            first_name: 'Charlay',
            last_name: 'Buttle',
            username: 'CharlyButtz',
            email: 'CButz@bax.bax',
            password: '123456',
            picture: 'http://i.imgur.com/16yjafp.gif'
          })
        ]);
    })


.then(function() {
  knex('lists').del()
    .then(function() {
      return Promise.all([
        knex('lists').insert({
          id: 1,
          name: 'Famous Places List',
          description: 'list of super cool famous places',
          user_id: '2'
        }),
        knex('lists').insert({
          id: 2,
          name: 'Haunted Places List',
          description: 'list of extra spooky places',
          user_id: '1'
        }),
        knex('lists').insert({
          id: 3,
          name: 'Most Delicious of Places List',
          description: 'list of crazy delicious places',
          user_id: '3'
        }),
        knex('lists').insert({
          id: 4,
          name: 'Green Places List',
          description: 'list of crazy delicious places',
          user_id: '3'
        }),
        knex('lists').insert({
          id: 5,
          name: 'Driving For Fun List',
          description: 'list of crazy delicious places',
          user_id: '1'
        })
      ]);
    })
})


.then(function() {
  knex('points').del()
    .then(function() {
      return Promise.all([
        knex('points').insert({
          id: 1,
          lat: '43.646890',
          lng: '-79.400062',
          name: 'Fashion District',
          list_id: '1',
          picture: 'none',
          description: 'A souless place full of hate and money.'
        }),
        knex('points').insert({
          id: 2,
          lat: '43.649589',
          lng: '-79.360253',
          name: 'Distillery District',
          list_id: '3',
          picture: 'none',
          description: 'fun place where you can buy tacos from Stephen'
        }),
        knex('points').insert({
          id: 3,
          lat: '43.647387',
          lng: '-79.340321',
          name: 'Port Lands',
          list_id: '2',
          picture: 'none',
          description: 'scary place where people often get murdered'
        }),
        knex('points').insert({
          id: 4,
          lat: '43.670525',
          lng: '-79.356747',
          name: 'Riverdale Park',
          list_id: '4',
          picture: 'none',
          description: 'Super green place. full of green thigns'
        }),
        knex('points').insert({
          id: 5,
          lat: '43.310949',
          lng: '-79.889669',
          name: 'Snake Road',
          list_id: '5',
          picture: 'none',
          description: 'really cool windy road where you can go really fast and pull mad hoon maneuvers'
        }),
        knex('points').insert({
          id: 6,
          lat: '43.331052',
          lng: '-79.845761',
          name: 'King Road',
          list_id: '5',
          picture: 'none',
          description: 'really cool windy road where you can really open her up.'
        })
      ]);
    });
})



.then(function() {
  return knex('favourites').del()
    .then(function() {
      return Promise.all([
        knex('favourites').insert({
          id: 1,
          list_id: 1,
          user_id: 1
        }),
        knex('favourites').insert({
          id: 2,
          list_id: 3,
          user_id: 2
        }),
        knex('favourites').insert({
          id: 3,
          list_id: 3,
          user_id: 3
        }),
        knex('favourites').insert({
          id: 4,
          list_id: 2,
          user_id: 3
        }),
        knex('favourites').insert({
          id: 5,
          list_id: 2,
          user_id: 1
        }),
        knex('favourites').insert({
          id: 6,
          list_id: 1,
          user_id: 2
        }),
        knex('favourites').insert({
          id: 7,
          list_id: 4,
          user_id: 2
        }),
        knex('favourites').insert({
          id: 8,
          list_id: 2,
          user_id: 4
        }),
        knex('favourites').insert({
          id: 6,
          list_id: 4,
          user_id: 4
        })
      ]);
    });
})
};
