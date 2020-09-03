const assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
const server = 'http://localhost:8080';

const { expect } = chai;
const fs = require('fs');
chai.use(chaiHttp);

before(() => {
  let cats = JSON.stringify([
    { id: 1, cat: 'Dilan', meows: 0, key: '_1zthqh9zxz' },
    { id: 2, cat: 'John', meows: 0, key: '_2zthqh9zxz' },
  ]);
  let meows = JSON.stringify([
    {
      id: 1,
      createdBy: 'Dilan',
      text: 'RandomMessage',
      createdAt: '3-09-2020 03:14',
    },
    {
      id: 2,
      createdBy: 'Dilan',
      text: '2ndMessage',
      createdAt: '3-09-2020 03:14',
    },
    {
      id: 3,
      createdBy: 'John',
      text: 'RandomMessage',
      createdAt: '3-09-2020 03:14',
    },
  ]);
  fs.writeFile('cats.json', cats, (err) => {
    if (err) throw err;
  });
  fs.writeFile('meows.json', meows, (err) => {
    if (err) throw err;
  });
});

describe('Cattering_API', () => {
  it('should GET all cats in cats.json', (done) => {
    chai
      .request(server)
      .get('/cats')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  it('should GET all meows in meows.json', (done) => {
    chai
      .request(server)
      .get('/meows')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  it('should GET meow by ID', (done) => {
    chai
      .request(server)
      .get('/meows/3')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  //  TODO: Fix the below (403)
  it('should return 403 - meow doesnt exist', (done) => {
    chai
      .request(server)
      .get('/meows/23')
      .end((res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should GET only my meows', (done) => {
    chai
      .request(server)
      .get('/my_meows/Dilan/_1zthqh9zxz')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  it('should create new cat and add it to cats.json', (done) => {
    chai
      .request(server)
      .post('/register')
      .send({ cat: 'D' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  //  TODO: Fix the below
  it('should return 409 since cat exists', (done) => {
    chai
      .request(server)
      .post('/register')
      .send({ cat: 'D' })
      .end((res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
  it('should create new meow and add it to meow.json', (done) => {
    chai
      .request(server)
      .post('/meows/John/_2zthqh9zxz')
      .send({ text: 'John Meows Meows' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should delete meow from meows.json', function (done) {
    this.timeout(1000);
    chai
      .request(server)
      .delete('/meows/2/Dilan/_1zthqh9zxz')
      .then((res) => {
        expect(res).to.have.status(204);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        done();
      });
  });

  it('should fail to delete meow since it does not exist', (done) => {
    chai
      .request(server)
      .delete('/meows/2/Dilan/_1zthqh9zxz')
      .then((res) => {
        expect(res).to.have.status(403);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        done();
      });
  });
});
