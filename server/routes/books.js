var express = require('express');
var router = express.Router();
var pg = require('pg'); // use require to use node module

// config object
var config = {
  database: 'phi', //name of the database
  host: 'localhost', // where is your database
  port: 5432, // port number
  max: 10, // how many connections allowed at one time
  idleTimoutMillis: 30000 // 30 seconds to try to connect
}; // end config

//connect to database - use require
var pool = new pg.Pool(config);

router.get('/', function(req, res){
  //this will be replaced with a SELECT statement to SQL
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500); // 500 error connecting to database serverside
    } else {
      // We connected to the database!!! Now - get stuff!!!!
      client.query('SELECT * FROM "books";', function(errorMakingQuery, result){
        done(); // must include to close out connection
        if(errorMakingQuery){
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // console.log(result);
          res.send(result.rows); // will send an array of book objects
        }
      }); // client.query
    }
  }); // end pool.connect
}); // end get


router.post('/new', function(req, res){
  var newBook = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500); // 500 error connecting to database serverside
    } else {
      // We connected to the database!!! Now - get stuff!!!!
      client.query('INSERT INTO books (title, author, edition, publisher) VALUES ($1, $2, $3, $4);', [newBook.title, newBook.author, newBook.edition, newBook.publisher], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }); // client.query
    }
  }); // end pool.connect


}); // end post

module.exports = router;
