// this is where you set everything up

const config = {
  spotifyApi: {
    "clientId": "74a8592010044440a2fd8497d8f23c1e",
    "clientSecret": "836d5f82aebe439e9381585e264c35b0",
    redirectUri: 'https://glacial-everglades-48856.herokuapp.com/callback/',
  },
  clientCredentials: {
    admin: "p3KcEpnXGDDBtKsxGdtaJdEA7H3Qmt7TEqbHxaeUhEBdkQqwVS4P7nVF6YZuk47jxMX9vMz9gFg2qm8Xuu63uvRtcup5dRAfxP7C9ptmcHDBPknG9TzBPzLB8b6SCkeZ",
    client: "RTEvkg5VHe86AhRn3S77KdHDRXdnDMj959EXYKmK4P8wbYGtjPAGbApFxrMpb4C7bY7mMWRCjy2T4VnSD72aHAdfmA4dFkGkj9JL94nzzAghEpkQAuT9ZWhpBc2qD8WB",
    postMan: "JbAxPN6LUZddh7aeexkJwZLCgxfGzPVDyBFMP3rZZ4ED5AzujDta9e6Tv3b69KNEmBQ8WHDtULjpcsRM8mkaCsyhYp4xFXCz4kUznqN5S6ryHjbPJ3NL6r5LxFtdtPrj",
  },
  key: "vTnWFQBYfWcnvENttMajWsqds5rgNdS7DYMesYPwZGv7BxkqF6zsGppyQCv9ELJvnYJ6q6x6P6JTLfhRmLCMpFTJzsaPnNCsLYgmXw98qSwAAFfCfeYb3mJwVLWxHgzeMTnwrwxuvtRZ5nGPmzgYymnvVLDAhrH9dBMLHJ4Uv95a7jCvHUfKcJjqa5BLaUNppZthqeY3eWMfnJw8JkbVmnmKafnEzhMbdATbNKSvPzvPVrRUcVT3SpsBeYPLPeay",
  neo4jCredentials: {
    url: "bolt://hobby-bbcebcehkkokgbkelefnmbal.dbs.graphenedb.com:24786",
    user: "app91814569-bWcSay",
    pwd: "b.wDDD0lyusUhy.LmNBVMmXG1LFRlMP"
  }
};

module.exports = config;
