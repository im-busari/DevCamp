/* eslint-disable */
const chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = chai;
const server = require('../../server');
const models = require('../../models/index');

chai.use(chaiHttp);
//  TODO: Fix eslint

describe('User controller', () => {
  beforeEach(() => {
    return models.User.truncate();
  });

  it('should get all users from the server', (done) => {
    chai
      .request(server)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  it('should create new user with unique username and email and return status code 201', (done) => {
    chai
      .request(server)
      .post('/users/signup')
      .send({
        firstName: 'Johny',
        lastName: 'Dep',
        username: 'burundi',
        email: 'd.george@gmail.com',
        password: '1234',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
