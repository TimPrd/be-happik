//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app/');
let should = chai.should();


chai.use(chaiHttp);
describe('User', () => {
    var token;
    var user;
    describe('/login', () => {
        it('it should log user', (done) => {
            chai.request(server)
                .post('/api/login')
                .send({
                    email: "rogue@severus.com",
                    password: "lilypotter"
                })
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.have.property('token');
                    res.body.should.have.property('user');
                    res.type.should.equal('application/json');
                    user = res.body.user;
                    token = res.body.token;
                    done();
                });
        });
    });

    describe('/me', () => {
        it('it should get user data', (done) => {
            chai.request(server)
                .get('/api/user/me')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    done();
                });
        });
    });


});

describe('Survey', () => {
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


describe('Analytic', () => {
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

describe('Mood', () => {
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