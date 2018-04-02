var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
var neo4j = require('../controllers/neo4JController.js');
var auth = require('./auth');

var authMiddleware = auth().middleware;

router.use(authMiddleware);
router.get('/', function(req, res, next) {
  res.json({message: 'wake up'});

});

router.post('/add-relationship', function(req, res, next) {
  var property = req.body;
  neo4j.createDryRelationship(property, function(result){
    res.json(result);
  });
})
module.exports = router;
