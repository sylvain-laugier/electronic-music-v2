var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
/* GET home page. */
router.get('/get-spotify/:id', function(req, res, next) {
  spotify.getArtistById(req.params.id)
    .then(function(artistRes){
      res.json(artistRes);
    });

});

router.get('/get-spotify-related/:id', function(req, res, next) {
  spotify.getRelatedArtists(req.params.id)
    .then(function(artistRes){
      res.json(artistRes);
    });

});

router.get('/search-spotify/:searchTerm', function(req, res, next) {
  spotify.searchForArtists(req.params.searchTerm)
    .then(function(artistRes){
      res.json(artistRes);
    });

});

module.exports = router;
