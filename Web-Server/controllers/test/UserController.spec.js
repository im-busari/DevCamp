/* eslint-disable */
const chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = chai;
const server = require('../../server');

chai.use(chaiHttp);
//  TODO: Fix eslint

describe('User controller', () => {
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
});
