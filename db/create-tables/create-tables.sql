/*CREATE TABLES FOR WIKIMAPS DATABASE*/

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50),
  password VARCHAR(50),
  picture VARCHAR(100)
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(500),
  user_id INT references users(id)
);

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  lat INT NOT NULL,
  lng INT NOT NULL,
  name VARCHAR(100),
  list_id INT references lists(id),
  picture VARCHAR(600)
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY,
  user_id INT references users(id),
  list_id INT references lists(id)
);
