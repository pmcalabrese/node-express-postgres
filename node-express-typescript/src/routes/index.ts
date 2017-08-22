import { Router } from 'express';
import { Client } from 'pg';
const client = new Client({
  host: 'localhost',
  database: 'app',
  port: 5433
});

client.connect();

const index: Router = Router();

/* GET home page. */
index.get('/', function(request, response, next) {
  // res.render('index', { title: 'Visual Studio Code!' });
  
  client.query('SELECT $1::text as message', ['Hello world Postgres!'], (err, res) => {
    console.log("---->", res);
    response.render('index', { title: res.rows[0].message });
    // client.end();
  });

  client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)').then((value) => {
    console.log("value", value);
  });
});

index.get('/create', function(request, response, next) {

  client.connect();

  client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)').then((value) => {
    console.log("value", value);
    response.render('index', { title: 'created' });
  });
});

index.get('/create_3_items', function(request, response, next) {
  
    client.connect();
  
    client.query("INSERT INTO items (id, text, complete) VALUES (1, 'Telefono', true), (2, 'Computer', true), (3, 'Airplane', false)").then((value) => {
      console.log("value", value);
      response.render('index', { title: '3 items created' });
    });
  });

export default index;
