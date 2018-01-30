module.exports = {
  createNode: function(label,property, session, callback){
    const resultPromise = session.run(
      `CREATE (a:${label} {name: $name}) RETURN a`,
      property
    );

    resultPromise.then(result => {
      session.close();

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      return callback(node.properties.name);
    });
  } 
};