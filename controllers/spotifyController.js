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
    console.log('Oups couldn\' connect to Spotify...', err);
  });

// spotify methods
module.exports = {
  getArtistById: function(id) {
    return new Promise(
      function(resolve, reject) {
        spotifyApi.getArtist(id)
          .then(function(data) {
            resolve(data.body);
          })
          .catch(function(error){
            reject(error);
          })
      }
    );
  },
  getRelatedArtists: function(id) {
    return new Promise(
      function(resolve, reject) {
        spotifyApi.getArtistRelatedArtists(id)
          .then(function(data) {
            resolve(data.body.artists);
          })
          .catch(function(error){
            reject(error);
          })
      }
    );
  },
  searchForArtists: function(searchTerm) {
    return new Promise(
      function(resolve, reject) {
        spotifyApi.searchArtists(searchTerm)
          .then(function(data) {
            resolve(data.body.artists);
          })
          .catch(function(error){
            reject(error);
          })
      }
    );
  },
  getAlbumById: function(id) {
    return new Promise(
      function(resolve, reject) {
        spotifyApi.getAlbum(id)
          .then(function(data) {
            resolve(data.body);
          })
          .catch(function(error){
            reject(error);
          })
      }
    );
  },
  searchForAlbums: function(searchTerm) {
    return new Promise(
      function(resolve, reject) {
        spotifyApi.searchAlbums(searchTerm)
          .then(function(data) {
            resolve(data.body.albums);
          })
          .catch(function(error){
            reject(error);
          })
      }
    );
  },
};
