var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
/* GET home page. */
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
module.exports = router;
