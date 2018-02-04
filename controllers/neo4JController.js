const neo4j = require('neo4j-driver').v1;
const Artist = require('../models/Artist.js');
const Album = require('../models/Album.js');

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
    }).catch(err => {
      return callback(err);
    });
  },
  createAlbumNode: function(label,property, callback){
    const session = driver.session();
    const resultPromise = session.run(
      `CREATE (a:${label}
        {url: $url,
         genres: $genres,
         _id: $_id,
         image: $image,
         name: $name,
         popularity: $popularity,
         release_date: $releaseDate
         }) RETURN a`,
      new Album(property)
    );

    resultPromise.then(result => {
      session.close();

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      return callback(node.properties);
    }).catch(err => {
      return callback(err);
    });
  },
  createDryRelationship: function(property, callback){
    const session = driver.session();
    const resultPromise = session.run(
      `MATCH (a:${property.source.label}),(b:${property.source.label})
      WHERE a._id = '${property.source._id}' AND b._id = '${property.target._id}'
      CREATE (a)-[r:${property.rel.reltype}]->(b)
      RETURN r`,
      {}
    );

    resultPromise.then(result => {
      session.close();
      return callback(result.records[0]._fields[0].type);
    }).catch(err => {
      return callback(err);
    });
  }
};
