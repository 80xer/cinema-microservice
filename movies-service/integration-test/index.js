const supertest = require('supertest');

describe('movies-service', () => {
  const api = supertest('http://localhost:3000');

  it('returns a 200 for a collection of movies', done => {
    api.get('/movies/premiers').expect(200, done);
  });
});
