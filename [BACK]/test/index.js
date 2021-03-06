//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app/');
let should = chai.should();


chai.use(chaiHttp);
describe('Testing', () => {
	/*
  * Test the /GET route
  */
  describe('/GET', () => {
      it('it should GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

});