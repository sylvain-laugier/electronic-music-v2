var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  spotify.getArtistById('0X380XXQSNBYuleKzav5UO',function(artistRes){
    res.json(artistRes);
  })

});

module.exports = router;
