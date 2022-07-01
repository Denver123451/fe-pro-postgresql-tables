import { Client } from 'pg';

export const initConnection = () => {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST,
  } = process.env;
  const client = new Client({
    user: POSTGRES_USER || 'postgres',
    host: POSTGRES_HOST || 'localhost',
    database: POSTGRES_DB || 'postgres',
    password: POSTGRES_PASSWORD || ' ',
    port: POSTGRES_PORT || 5432,
  });

  return client;
};

export const createStructure = async () => {
  const client = initConnection();
  client.connect();

  await client.query(
    `drop table if exists books, authors, categories, users, descriptions, reviews`
  );

  await client.query(
    `create table users (
    id serial primary key, name varchar(30) not null,
    date timestamp default now())`
  );

  await client.query(
    `create table categories(
    id serial primary key,
    name varchar(30) not null )`
  );

  await client.query(
    `create table authors(
    id serial primary key,
    name varchar(30) not null )`
  );

  await client.query(
    `create table books(id serial primary key,
    title varchar(30) not null,
    userid integer not null,
    authorid integer not null,
    categoryid integer not null,
    foreign key(userid) references users (id) on delete cascade,
    foreign key(authorid) references authors (id) on delete cascade,
    foreign key(categoryid) references categories (id) on delete cascade)`
  );

  await client.query(`create table descriptions(
    id serial primary key,
    description varchar(10000) not null,
    bookid integer not null,
    foreign key(bookid) references books (id) on delete cascade)
    `);

  await client.query(`create table reviews(
    id serial primary key,
    message varchar(10000) not null,
    userid integer not null,
    bookid integer not null,
    foreign key(userid) references users (id) on delete cascade,
    foreign key(bookid) references books (id) on delete cascade)
    `);

  client.end();
};

export const createItems = async () => {
  const client = initConnection();
  client.connect();

  // Your code is here...

  client.end();
};

export const dropTables = async () => {
  const client = initConnection();
  client.connect();

  await client.query('DROP TABLE reviews;');
  await client.query('DROP TABLE descriptions;');
  await client.query('DROP TABLE books;');
  await client.query('DROP TABLE authors;');
  await client.query('DROP TABLE categories;');
  await client.query('DROP TABLE users;');

  client.end();
};
