var SpotifyWebApi = require('spotify-web-api-node');

const config = require('../config.js');

// initialize spotify
var spotifyApi = new SpotifyWebApi(config.spotifyApi);
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body.access_token);
    console.log('connected to Spotify');
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  });

module.exports = {
  getArtistById: function(id, callback) {
    spotifyApi.getArtist(id)
    .then(function(data) {
      callback(data.body)
    }, function(err) {
      console.error(err);
      callback(err);
    });
  }
};
