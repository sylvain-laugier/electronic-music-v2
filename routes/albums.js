var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
/* GET home page. */
router.get('/get/:id', function(req, res, next) {
  spotify.getArtistById(req.params.id)
    .then(function(artistRes){
      res.json(artistRes);
    });

});

module.exports = router;

// 0X380XXQSNBYuleKzav5UO
