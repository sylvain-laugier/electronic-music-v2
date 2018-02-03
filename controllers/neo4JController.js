const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic("developer", "azerty"));
const session = driver.session();

module.exports = {
  createArtistNode: function(label,property, callback){
    const resultPromise = session.run(
      `CREATE (a:${label} {name: $name, genre: $genre}) RETURN a`,
      property
    );

    resultPromise.then(result => {
      session.close();

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      return callback(node.properties);
    });
  }
};
