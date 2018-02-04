var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
var neo4j = require('../controllers/neo4JController.js');
/* GET home page. */
router.get('/test', function(req, res, next) {


});

module.exports = router;
