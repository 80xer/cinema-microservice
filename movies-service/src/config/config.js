const dbSettings = {
  db: process.env.DB || 'movies',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  servers: process.env.DB_SERVERS
    ? process.env.DB_SERVERS.split(' ')
    : ['localhost:27017'],
  dbParameters: () => ({
    w: 'majority',
    wtimeout: 10000,
    j: true,
    readPreference: 'ReadPreference.SECONDARY_PREFERRED',
    native_parser: false,
  }),
  serverParameters: () => ({
    autoReconnect: true,
    poolSize: 10,
    socketoptions: {
      keepAlive: 300,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    },
  }),
  replsetParameters: (replset = 'rs1') => ({
    replicaSet: replset,
    ha: true,
    haInterval: 10000,
    poolSize: 10,
    socketoptions: {
      keepAlive: 300,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    },
  }),
};

// server parameters
const serverSettings = {
  port: process.env.PORT || 3000,
};

module.exports = Object.assign({}, { dbSettings, serverSettings });
