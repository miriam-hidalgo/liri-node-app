require("dotenv").config();
const request = require("request");
const inquirer = require("inquirer");
const moment = require('moment');
const fs = require("fs");
var Spotify = require('node-spotify-api');
const keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);
// const artist = process.argv[2]
// const songName = process.argv[2]
// const movie = process.argv[2]
// const command = process.argv[2];
// const searchTerm = process.argv[3];

inquirer
    .prompt([
        {
            name: 'command',
            type: 'list',
            choices: [
                'Search Spotify',
                'Search concerts',
                'Search movies'
            ],
            message: 'What would you like to do'
        },
        {
            name: 'searchTerm',
            message: 'What would like to search for?'
        }
    ])
    .then(function(answers) {
        console.log(answers);
        switch(answers.command) {
            case 'Search concerts':
              concert(answers.searchTerm);
              break;
            case 'Search Spotify':
              searchSpotify(answers.searchTerm)
              break;
            case 'Search movies':
              searchMovie(answers.searchTerm)
              break;
            default:
              console.log('Didn\'t recognize the command');
          }
    })


// var command = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
// for (i = 0; i < command.length; i++) { 
//     command[i]=process.argv[2]
// }

// 1. node liri.js concert-this <artist/band name here>
function concert(artist) {
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response) {
      if (error) throw error
  console.log(JSON.parse(response.body))
  });
}

// 2. node liri.js spotify-this-song <song name here>
function searchSpotify(songName){
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } 
  console.log(data); 
  });
}


// 3. node liri.js movie-this <movie name here>
function searchMovie(movie){
  request("http://www.omdbapi.com/?&apikey=trilogy&t="+movie, function (error, response) {
    if (error) throw error
  console.log(JSON.parse(response.body));
});
}


// 4. node liri.js do-what-it-says
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

