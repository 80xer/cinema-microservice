const MongoClient = require('mongodb').MongoClient;

const getMongoURL = options => {
  const url = options.servers.reduce(
    (prev, cur) => prev + cur + ', ',
    'mongodb://'
  );

  return `${url.substr(0, url.length - 2)}/${options.db}`;
};

const connect = (options, mediator) => {
  const dbOptions = {};
  if (options.user && options.pass) {
    dbOptions = {
      auth: {
        user: options.user,
        password: options.pass,
      },
    };
  }
  mediator.once('boot.ready', () => {
    MongoClient.connect(
      getMongoURL(options),
      dbOptions,
      (err, client) => {
        if (err) {
          mediator.emit('db.error', err);
        }
        const db = client.db(options.db);
        mediator.emit('db.ready', db, () => {
          client.close();
        });
        // db.authenticate(options.user, options.pass, (err, result) => {
        //   if (err) {
        //     mediator.emit('db.error', err);
        //   }

        //   mediator.emit('db.ready', db);
        // });
      }
    );
  });
};

module.exports = Object.assign({}, { connect });
