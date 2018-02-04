var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
var neo4j = require('../controllers/neo4JController.js');
/* GET home page. */
router.get('/:id', function(req, res, next) {
  neo4j.getNodeById(req.params.id, 'Album', (result) => {
    res.json(result);
  })

});

router.get('/relationships/:id', function(req, res, next) {
  neo4j.getNodeRelationships(req.params.id, (result) => {
    res.json(result);
  })

});

router.get('/get-spotify/:id', function(req, res, next) {
  spotify.getAlbumById(req.params.id)
    .then(function(albumRes){
      res.json(albumRes);
    });

});

router.get('/search-spotify/:searchTerm', function(req, res, next) {
  spotify.searchForAlbums(req.params.searchTerm)
    .then(function(albumRes){
      res.json(albumRes);
    });

});

router.post('/add-album', function(req, res, next) {
  var property = req.body;
  neo4j.createAlbumNode('Album', property, function(result){
    res.json(result);
  });
});

router.post('/add-album-relationship', function(req, res, next) {
  var property = req.body;
  neo4j.createAlbumRelationship(property, function(result){
    res.json(result);
  });
})

module.exports = router;
