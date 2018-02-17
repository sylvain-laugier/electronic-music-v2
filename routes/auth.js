var config = require('../config');
var crypto = require("crypto");

const auth = function() {
  function decrypt(key, data) {

          var decipher = crypto.createDecipher('aes-256-cbc', key);
          var decrypted = decipher.update(data, 'hex', 'utf-8');

          decrypted += decipher.final('utf-8');
          return decrypted;
  }
  function middleware(req,res,next) {
    if (typeof req.headers.user === 'undefined' || typeof req.headers.token === 'undefined') {
      return res.json({error: 'no user or bad password'});
    }
    var user = req.headers.user ;
    var token = req.headers.token;
    if (decrypt(config.key,token) === config.clientCredentials[user]) {
      next();
    } else {
      return res.json({error: 'not authorize'});
    }

  }

  return {
    middleware: middleware,
  }
}

module.exports = auth;
