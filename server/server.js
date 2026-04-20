const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

/* Task 1.2: Add a GET /genres endpoint:
   This endpoint returns a sorted array of all the genres of the movies
   that are currently in the movie model.
*/
app.get('/genres', function (req,res){
  const genres = ["Adventure", "Biography", "Crime", "Drama", "Fantasy", "Horror"]
  res.send(genres)
})

/* Task 1.4: Extend the GET /movies endpoint:
   When a query parameter for a specific genre is given, 
   return only movies that have the given genre
 */


app.get('/movies', function (req, res) {
  console.log(req.query)
  const genre = req.query.genres;
  let movies = Object.values(movieModel);

  if(genre) {
    movies = movies.filter(movie => movie.Genres.includes(genre));
  }

  res.send(movies)
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
    const movie = movieModel[req.params.imdbID];
  if(movie){
    res.send(movie)
    res.sendStatus(200)
  }
  else{
    res.sendStatus(404)
  }
})

app.put('/movies/:imdbID', function (req,res){
  const movie = movieModel[req.params.imdbID];
  const id = req.params.imdbID;
  if(movie){
    Object.assign(movie, req.body)
    res.sendStatus(200)
  }
  if(!movie){
    movieModel[id] = req.body;
    res.sendStatus(201)
  }
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
