var http = require('http');
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var wstream = fs.createWriteStream('amazon_song_id.csv');
var base_url = 'http://www.amazon.com/s/ref=nb_sb_ss_i_1_9?url=search-alias%3Ddigital-music&field-keywords=';

module.exports = function(songArtist, songTitle){
  var song = songArtist.split(" ").concat(songTitle.split(" "));
  var url = "";
  var result = "";

  for(var i in song){
     i != song.length-1 ? result += song[i] + "+" : result += song[i]
  }

  url = base_url + result;

  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      $ = cheerio.load(body);
      var songID = $('.mp3Tracks tr:first-child a:first-child').attr('id');
      songID = songID.substr(songID.indexOf('_') + 1, songID.length);
      wstream.write(songID);
      wstream.end();
    }
  })
}