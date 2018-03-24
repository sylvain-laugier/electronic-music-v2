// this is where you set everything up

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const config = {
  spotifyApi: {
    "clientId": process.env.SPOTIFY_ID,
    "clientSecret": process.env.SPOTIFY_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT,
  },
  clientCredentials: {
    admin: process.env.ADMIN_CRED,
    client: process.env.CLIENT_CRED,
    postMan: process.env.POSTMAN_CRED,
  },
  key: process.env.KEY_CRYPT,
  neo4jCredentials: {
    url: process.env.GRAPHENEDB_BOLT_URL,
    user: process.env.GRAPHENEDB_BOLT_USER,
    pwd: process.env.GRAPHENEDB_BOLT_PASSWORD
  }
};

module.exports = config;
