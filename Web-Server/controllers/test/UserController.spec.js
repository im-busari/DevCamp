/* eslint-disable */
const chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = chai;
const server = require('../../server');
const models = require('../../models/index');

chai.use(chaiHttp);
//  TODO: Fix eslint

let authToken = '';

describe('User controller', () => {
  before(() => {
    //  empty DB tables before you run the tests
    return models.User.truncate();
  });

  it('should CREATE new user with unique username and email and return status code 201', (done) => {
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

  it('should receive req.status 403 since the username and the email address already exist', (done) => {
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
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should GET all users from the server', (done) => {
    chai
      .request(server)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  it('should login successfully and the res.body should have a token', (done) => {
    chai
      .request(server)
      .post('/users/signin')
      .send({
        username: 'burundi',
        password: '1234',
      })
      .end((err, res) => {
        authToken = res.body.token;

        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an.instanceof(Object)
          .and.to.have.property('token');
        done();
      });
  });

  it('should fail to login and receive status code 403 due to wrong login credentials', (done) => {
    chai
      .request(server)
      .post('/users/signin')
      .send({
        username: 'burundi',
        password: '2',
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should return information for the current (autheticated) user', (done) => {
    chai
      .request(server)
      .get('/users/me')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an.instanceof(Object)
          .and.to.have.property('user');
        expect(res.body.user.username).to.equal('burundi');
        expect(res.body.user.email).to.equal('d.george@gmail.com');
        done();
      });
  });

  it('should fail to return information for the current user since he is Unauthenticated (returns status code 401).', (done) => {
    chai
      .request(server)
      .get('/users/me')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
