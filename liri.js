require("dotenv").config();
const request = require("request");
const inquirer = require("inquirer");
const moment = require('moment');
const fs = require("fs");
var Spotify = require('node-spotify-api');
const keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);

inquirer
    .prompt([
        {
            name: 'command',
            type: 'list',
            choices: [
                'Search Spotify',
                'Search concerts',
                'Search movies',
                'Search file'
            ],
            message: 'What would you like to do?'
        },
        {
            name: 'searchTerm',
            message: 'What would you like to search for?'
        }
    ])
    .then(function(answers) {
        console.log(answers);
        switch(answers.command) {
            case 'Search concerts':
              searchConcert(answers.searchTerm);
              break;
            case 'Search Spotify':
              searchSpotify(answers.searchTerm)
              break;
            case 'Search movies':
              searchMovie(answers.searchTerm)
              break;
            case 'Search file':
              searchFile(answers.searchTerm)
              break;
            default:
              console.log("Didn't recognize the command");
          }
    })

// Searches concerts
function searchConcert(artist) {
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response) {
      if (error) throw error
  console.log(JSON.parse(response.body));
  });
}

// Searches spotify songs
function searchSpotify(songName){
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } 
  console.log(data); 
  });
}

// Searches movies
function searchMovie(movie){
  request("http://www.omdbapi.com/?&apikey=trilogy&t="+ movie, function (error, response) {
    if (error) throw error
  console.log(JSON.parse(response.body));
});
}

// Read the random.txt file and print its contents.
function searchFile(filename){
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    console.log(data)
  });
}