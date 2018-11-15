require("dotenv").config();
const request = require("request");
const inquirer = require("inquirer");
const moment = require('moment');
const fs = require("fs");
var Spotify = require('node-spotify-api');
const keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);
const artist = process.argv[2]
const songName = process.argv[2]
const movie = process.argv[2]

// var command = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
// for (i = 0; i < command.length; i++) { 
//     command[i]=process.argv[2]
// }

// 1. node liri.js concert-this <artist/band name here>
request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response) {
    if (error) throw error
console.log(JSON.parse(response.body))
});

// 2. node liri.js spotify-this-song <song name here>
 spotify.search({ type: 'track', query: songName }, function(err, data) {
   if (err) {
     return console.log('Error occurred: ' + err);
   } 
 console.log(data); 
 });

// 3. node liri.js movie-this <movie name here>
request("http://www.omdbapi.com/?&apikey=trilogy&t="+movie, function (error, response) {
    if (error) throw error
  console.log(JSON.parse(response.body));
});

// 4. node liri.js do-what-it-says
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

