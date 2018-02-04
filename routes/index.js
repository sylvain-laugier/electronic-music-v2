var express = require('express');
var router = express.Router();

var spotify = require('../controllers/spotifyController.js');
var neo4j = require('../controllers/neo4JController.js');
/* GET home page. */
router.get('/test', function(req, res, next) {


});

router.post('/add-relationship', function(req, res, next) {
  var property = req.body;
  neo4j.createDryRelationship(property, function(result){
    res.json(result);
  });
})
module.exports = router;
