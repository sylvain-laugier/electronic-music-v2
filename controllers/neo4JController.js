const neo4j = require('../node_modules/neo4j-driver/lib/index.js').v1;
const Artist = require('../models/Artist.js');
const Album = require('../models/Album.js');

const config = require('../config.js');

const driver = neo4j.driver(config.neo4jCredentials.url, neo4j.auth.basic(config.neo4jCredentials.user, config.neo4jCredentials.pwd));
driver.onCompleted = () => {
  console.log(`connected to database : ${config.neo4jCredentials.url}`);
};

driver.onError = error => {
  console.log('couldnt connect to database', error);
};

module.exports = {
  getNodeByLabel: function(label, callback){
    const session = driver.session();
    const resultPromise = session.run(
      `MATCH (n:${label})
      RETURN n`
    );
    resultPromise.then(result => {
      session.close();
      return callback(result.records);
    }).catch(err => {
      return callback(err);
    });
  },
  getRandomNodeByLabel: function(label, callback){
    const session = driver.session();
    const resultPromise = session.run(
      `MATCH (n:${label})
      RETURN n`
    );
    resultPromise.then(result => {
      session.close();
      const random = Math.floor(Math.random() * Math.floor(result.records.length));
      return callback(result.records[random]);
    }).catch(err => {
      return callback(err);
    });
  },
  getNodeById: function(id, label, callback){
    const session = driver.session();
    const resultPromise = session.run(
      `MATCH (n:${label})
      WHERE n._id = '${id}'
      RETURN n`
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
  getRelatedNodes: function(id,callback){
    const session = driver.session();
    const resultPromise = session.run(
      `Match(n)-->(related)
      WHERE n._id = '${id}'
      RETURN related
      `
    );
    resultPromise.then(result => {
      session.close();
      const singleRecord = result.records;
      return callback(singleRecord);
    }).catch(err => {
      return callback(err);
    });
  },
  getRelatedByRelation: function(id, relation, callback){
    const session = driver.session();
    const resultPromise = session.run(
      `Match(n)<-[:${relation}]-(related)
      WHERE n._id = '${id}'
      RETURN related
      `
    );
    resultPromise.then(result => {
      session.close();
      const singleRecord = result.records[0]._fields[0].properties;
      return callback(singleRecord);
    }).catch(err => {
      return callback(err);
    });
  },
  getNodeRelationships: function(id,callback){
    const session = driver.session();
    const resultPromise = session.run(
      `Match(n)-[r]->(related)
      WHERE n._id = '${id}'
      RETURN r
      `
    );
    resultPromise.then(result => {
      session.close();
      const singleRecord = result.records;
      return callback(singleRecord);
    }).catch(err => {
      return callback(err);
    });
  },
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
      `MATCH (a:${property.source.label}),(b:${property.target.label})
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
  },
  createAlbumRelationship: function(property, callback){
    const session = driver.session();
    const resultPromise = session.run(
      `MATCH (a:${property.source.label}),(b:${property.target.label})
      WHERE a._id = '${property.source._id}' AND b._id = '${property.target._id}'
      CREATE (a)-[r:${property.rel.type}{message: $messageProp}]->(b)`,
      {messageProp: property.rel.message}
    );

    resultPromise.then(result => {
      session.close();
      console.log('album relationship created ');
      return callback(result.records[0]._fields[0].type);
    }).catch(err => {
      return callback(err);
    });
  },
  updateRelationshipMessage: function(origin, target, newMessage, callback) {
    const session = driver.session();
    console.log('hi');

    const resultPromise = session.run(
      `Match (n)-[r]->(related)
       WHERE n._id = '${origin}' AND related._id = '${target}'
       SET r.message = "${newMessage}"
       RETURN r`
    );

    resultPromise.then(result => {
      session.close();
      console.log('message updated');
      console.log(result);
      return callback(result.records[0]._fields[0].properties);
    }).catch(err => {
      console.log(err);
      return callback(err);
    })
  }
};
