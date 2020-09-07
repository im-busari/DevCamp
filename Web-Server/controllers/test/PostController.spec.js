const chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = chai;
const server = require('../../server');

chai.use(chaiHttp);

let authToken = '';
