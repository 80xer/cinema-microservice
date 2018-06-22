require('should');
const repository = require('./repository');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'movies';

describe('Repository', () => {
  it('should connect with a promise', () => {
    let result = repository.connect({}).catch(() => {});
    result.should.be.a.Promise();
  });

  it('should get movie premiers', done => {
    MongoClient.connect(
      url,
      function(err, client) {
        const db = client.db(dbName);
        repository
          .connect(db)
          .then(repo => {
            return repo.getMoviePremiers();
          })
          .then(movies => {
            console.log(movies);
            client.close();
            done();
          })
          .catch(err => {
            console.log(err);
            client.close();
            done();
          });
      }
    );
  });
  it('should get movie by id', done => {
    MongoClient.connect(
      url,
      function(err, client) {
        const db = client.db(dbName);
        repository
          .connect(db)
          .then(repo => {
            return repo.getMovieById('1');
          })
          .then(movie => {
            console.log(movie);
            client.close();
            done();
          })
          .catch(err => {
            console.log(err);
            client.close();
            done();
          });
      }
    );
  });
});
