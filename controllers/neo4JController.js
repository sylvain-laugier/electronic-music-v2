const neo4j = require('neo4j-driver').v1;
const Artist = require('../models/Artist.js');

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic("developer", "azerty"));
driver.onCompleted = () => {
  console.log('connected to database');
};

driver.onError = error => {
  console.log('couldnt connect to database', error);
};

module.exports = {
  createArtistNode: function(label,property, callback){
    const session = driver.session();
    const resultPromise = session.run(
      `CREATE (a:${label}
        {url: $url,
         genres: $genres,
         _id: $_id,
         image: $image,
         name: $name,
         popularity: $popularity
         }) RETURN a`,
      new Artist(property)
    );

    resultPromise.then(result => {
      session.close();

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      return callback(node.properties);
    });
  },
  createArtistRelationship: function(){
    return true;
  }
};
