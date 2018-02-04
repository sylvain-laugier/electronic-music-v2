var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
var neo4j = require('../controllers/neo4JController.js');
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

router.post('/add-artist', function(req, res, next) {
  var property = req.body;
  neo4j.createArtistNode('Artist', property, function(result){
    res.json(result);
  });
})

router.post('/add-artist-relationship', function(req, res, next) {
  var property = req.body;
  neo4j.createArtistRelationship(property, function(result){
    res.json(result);
  });
})

module.exports = router;
