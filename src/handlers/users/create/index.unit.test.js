import { stub, spy } from 'sinon';
import createUser from '.';
import assert from 'assert';

const createStubs = {
  success: () => stub().resolves({ _id: 'foo' }),
  validationError: () =>
    stub().rejects({ name: 'ValidationError', message: 'validation error' }),
  mongoError: () =>
    stub().rejects({ name: 'MongoError', message: 'mongo error' }),
  otherError: () => stub().rejects(new Error('Internal Server Error'))
};

describe('Create User request handler', function() {
  let req = {};
  let res;
  let db = {};
  let generateMessage = {};

  describe("When Create User Engine resolve with the new user's ID", function() {
    beforeEach(function() {
      db = {};
      req = {};
      res = {
        status: spy(),
        set: spy(),
        send: spy()
      };

      return createUser(req, res, db, createStubs.success(), generateMessage);
    });

    describe('should call res.status()', function() {
      it('once', function() {
        assert(res.status.calledOnce);
      });

      it('with the argument 201', function() {
        assert(res.status.calledWithExactly(201));
      });
    });

    describe('should call res.set()', function() {
      it('once', function() {
        assert(res.set.calledOnce);
      });

      it('with the arguments "Content-Type" and "text/plain"', function() {
        assert(res.set.calledWithExactly('Content-Type', 'text/plain'));
      });
    });

    describe('should call res.send()', function() {
      it('once', function() {
        assert(res.send.calledOnce);
      });

      it("with the user's ID as argument", function() {
        assert(res.send.calledWithExactly('foo'));
      });
    });
  });

  describe('When Create User Engine reject with ValidationError', function() {
    beforeEach(function() {
      res = {
        status: spy(),
        set: spy(),
        json: spy()
      };

      return createUser(
        req,
        res,
        db,
        createStubs.validationError(),
        generateMessage
      );
    });

    describe('should call res.status()', function() {
      it('once', function() {
        assert(res.status.calledOnce);
      });

      it('with the argument 400', function() {
        assert(res.status.calledWithExactly(400));
      });
    });

    describe('should call res.set()', function() {
      it('once', function() {
        assert(res.set.calledOnce);
      });

      it('with the arguments "Content-Type" and "application/json"', function() {
        assert(res.set.calledWithExactly('Content-Type', 'application/json'));
      });
    });

    describe('should call res.json()', function() {
      it('once', function() {
        assert(res.json.calledOnce);
      });

      it('with the error object', function() {
        assert(res.json.calledWithExactly({ message: 'validation error' }));
      });
    });
  });

  describe('When Create User Engine reject with MongoError', function() {
    beforeEach(function() {
      res = {
        status: spy(),
        set: spy(),
        json: spy()
      };

      return createUser(
        req,
        res,
        db,
        createStubs.mongoError(),
        generateMessage
      );
    });

    describe('should call res.status()', function() {
      it('once', function() {
        assert(res.status.calledOnce);
      });

      it('with the argument 400', function() {
        assert(res.status.calledWithExactly(400));
      });
    });

    describe('should call res.set()', function() {
      it('once', function() {
        assert(res.set.calledOnce);
      });

      it('with the arguments "Content-Type" and "application/json"', function() {
        assert(res.set.calledWithExactly('Content-Type', 'application/json'));
      });
    });

    describe('should call res.json()', function() {
      it('once', function() {
        assert(res.json.calledOnce);
      });

      it('with the error object', function() {
        assert(res.json.calledWithExactly({ message: 'mongo error' }));
      });
    });
  });

  describe('When Create User Engine reject with another king of error', function() {
    beforeEach(function() {
      res = {
        set: spy(),
        status: spy(),
        json: spy()
      };

      return createUser(
        req,
        res,
        db,
        createStubs.otherError(),
        generateMessage
      );
    });

    describe('should call res.status()', function() {
      it('once', function() {
        assert(res.status.calledOnce);
      });

      it('with the argument 500', function() {
        assert(res.status.calledWithExactly(500));
      });
    });

    describe('should call res.set()', function() {
      it('once', function() {
        assert(res.set.calledOnce);
      });

      it('with the arguments "Content-Type" and "application/json"', function() {
        assert(res.set.calledWithExactly('Content-Type', 'application/json'));
      });
    });

    describe('should call res.json()', function() {
      it('once', function() {
        assert(res.json.calledOnce);
      });

      it('with InternalError object as argument', function() {
        assert(
          res.json.calledWithExactly({ message: 'Internal Server Error' })
        );
      });
    });
  });
});
