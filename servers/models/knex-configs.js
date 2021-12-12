const knexConfig = {
  client: 'mysql',
  connection: {
      host: 'localhost',
      user: 'root',
      password: '111111',
      database: 'o2',
      charset: 'utf8'
  },
  debug: true,
  pool: {
      max: 10
  },
  acquireConnectionTimeout: 60000,
  useNullAsDefault: true
};

module.exports = knexConfig;


