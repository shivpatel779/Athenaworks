const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../index');
const {Demographics} = require('./../models/demographics');
const {Allergies} = require('./../models/allergies');
const {demographics, populateDemographics, allergies, populateAllergies} = require('./seed/seed');

beforeEach(populateDemographics);
beforeEach(populateAllergies);

describe('POST /demographics/create', () => {
  it('should create a new demographics', (done) => {
    var text = 'Test demographics text';

    request(app)
      .post('/demographics/create')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Demographics.find({text}).then((demographics) => {
          expect(demographics.length).toBe(1);
          expect(demographics[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create demographics with invalid body data', (done) => {
    request(app)
      .post('/demographics/create')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Demographics.find().then((demographics) => {
          expect(demographics.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /demographics', () => {
  it('should get all /demographics', (done) => {
    request(app)
      .get('/demographics')
      .expect(200)
      .expect((res) => {
        expect(res.body.demographics.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /demographics/:id', () => {
  it('should return demographics doc', (done) => {
    request(app)
      .get(`/demographics/${demographics[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.demographics.text).toBe(demographics[0].text);
      })
      .end(done);
  });

  it('should not return demographics doc created by other user', (done) => {
    request(app)
      .get(`/demographics/${demographics[1]._id.toHexString()}`)
      .expect(404)
      .end(done);
  });

describe('DELETE /demographics/delete/:id', () => {
  it('should remove a demographics', (done) => {
    var hexId = demographics[1]._id.toHexString();

    request(app)
      .delete(`/demographics/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.demographics._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Demographics.findById(hexId).then((demographics) => {
          expect(demographics).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should remove a demographics', (done) => {
    var hexId = demographics[0]._id.toHexString();

    request(app)
      .delete(`/demographics/${hexId}`)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Demographics.findById(hexId).then((demographics) => {
          expect(demographics).toBeTruthy();
          done();
        }).catch((e) => done(e));
      });
  });

describe('PATCH /demographics/update/:id', () => {
  it('should update the demographics', (done) => {
    var hexId = demographics[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/demographics/${hexId}`)
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.demographics.text).toBe(text);
      })
      .end(done);
  });

  it('should not update the demographics created by other user', (done) => {
    var hexId = demographics[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/demographics/${hexId}`)
      .send({
        text
      })
      .expect(404)
      .end(done);
  });





//fgdsggdsgsdgfg
  

  describe('POST /allergy/create', () => {
  it('should create a new allergies', (done) => {
    var text = 'Test allergies text';

    request(app)
      .post('/allergies/create')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Allergies.find({text}).then((allergies) => {
          expect(allergies.length).toBe(1);
          expect(allergies[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create allergies with invalid body data', (done) => {
    request(app)
      .post('/allergies/create')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Allergies.find().then((allergies) => {
          expect(allergies.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /allergies', () => {
  it('should get all /allergies', (done) => {
    request(app)
      .get('/allergies')
      .expect(200)
      .expect((res) => {
        expect(res.body.allergies.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /allergies/:id', () => {
  it('should return allergies doc', (done) => {
    request(app)
      .get(`/allergies/${allergies[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.allergies.text).toBe(allergies[0].text);
      })
      .end(done);
  });

  it('should not return allergies doc created by other user', (done) => {
    request(app)
      .get(`/allergies/${allergies[1]._id.toHexString()}`)
      .expect(404)
      .end(done);
  });

describe('DELETE /allergies/delete/:id', () => {
  it('should remove a allergies', (done) => {
    var hexId = allergies[1]._id.toHexString();

    request(app)
      .delete(`/allergies/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.allergies._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Allergies.findById(hexId).then((allergies) => {
          expect(allergies).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should remove a allergies', (done) => {
    var hexId = allergies[0]._id.toHexString();

    request(app)
      .delete(`/allergies/${hexId}`)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Allergies.findById(hexId).then((allergies) => {
          expect(allergies).toBeTruthy();
          done();
        }).catch((e) => done(e));
      });
  });

describe('PATCH /allergies/update/:id', () => {
  it('should update the allergies', (done) => {
    var hexId = allergies[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/allergies/${hexId}`)
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.allergies.text).toBe(text);
      })
      .end(done);
  });

  it('should not update the allergies created by other user', (done) => {
    var hexId = allergies[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/allergies/${hexId}`)
      .send({
        text
      })
      .expect(404)
      .end(done);
  });
