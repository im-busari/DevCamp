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
  it('should CREATE new user with unique username and email and return status code 201', (done) => {
    chai
      .request(server)
      .post('/users/signup')
      .send({
        firstName: 'Simeon',
        lastName: 'Busari',
        username: 'Lasttt',
        email: 'emi.lastt@d.com',
        password: '1234',
        content: 'Software Developer',
        caption: 'Fabulous',
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
        username: 'Lasttt',
        email: 'emi.lastt@d.com',
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
        username: 'Lasttt',
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
        expect(res.body).to.be.an.instanceof(Object);
        expect(res.body.username).to.equal('Lasttt');
        expect(res.body.email).to.equal('emi.lastt@d.com');
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

  it('should UPDATE user successfully because he/she is Auth and provided valid JWToken (status 200)', (done) => {
    chai
      .request(server)
      .patch('/users/me')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        firstName: 'Immanuella',
        city: 'Varna',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should FOLLOW another user that exists in the DB and return status code 201.', (done) => {
    chai
      .request(server)
      .post('/users/2/follow')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.followed_user)
          .to.be.an.instanceof(Object)
          .and.to.have.property('username');
        expect(res.body.followed_user.username).to.equal('jessy');
        done();
      });
  });

  it('should FAIL to FOLLOW the same user twice and return status code 404.', (done) => {
    chai
      .request(server)
      .post('/users/2/follow')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should UNFOLLOW user that is already marked as followed inside the Relationships table. Expecting status code 200.', (done) => {
    chai
      .request(server)
      .post('/users/2/unfollow')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.unfollowed_user)
          .to.be.an.instanceof(Object)
          .and.to.have.property('username');
        expect(res.body.unfollowed_user.username).to.equal('jessy');
        done();
      });
  });

  it('should NOT be able to UNFOLLOW user that is not being followed currently', (done) => {
    chai
      .request(server)
      .post('/users/2/unfollow')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
