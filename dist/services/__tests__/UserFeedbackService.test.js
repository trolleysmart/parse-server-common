'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _UserFeedback = require('../../schema/__tests__/UserFeedback.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();
var userFeedbackService = new _2.UserFeedbackService();

var createCriteriaWthoutConditions = function createCriteriaWthoutConditions() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('feedback', 'user'),
    include_user: true
  });
};

var createCriteria = function createCriteria(userFeedback) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      userId: userFeedback ? userFeedback.get('userId') : (0, _v2.default)()
    })
  }).merge(createCriteriaWthoutConditions());
};

var createUserFeedbacks = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(count) {
    var useSameInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var userFeedback, _ref2, tempUserFeedback;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userFeedback = void 0;

            if (!useSameInfo) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 4:
            _ref2 = _context2.sent;
            tempUserFeedback = _ref2.userFeedback;


            userFeedback = tempUserFeedback;

          case 7:
            _context2.t0 = _immutable2.default;
            _context2.next = 10;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var finalUserFeedback, _ref4, _tempUserFeedback;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      finalUserFeedback = void 0;

                      if (!useSameInfo) {
                        _context.next = 5;
                        break;
                      }

                      finalUserFeedback = userFeedback;
                      _context.next = 10;
                      break;

                    case 5:
                      _context.next = 7;
                      return (0, _UserFeedback.createUserFeedbackInfo)();

                    case 7:
                      _ref4 = _context.sent;
                      _tempUserFeedback = _ref4.userFeedback;


                      finalUserFeedback = _tempUserFeedback;

                    case 10:
                      _context.t0 = userFeedbackService;
                      _context.next = 13;
                      return userFeedbackService.create(finalUserFeedback);

                    case 13:
                      _context.t1 = _context.sent;
                      _context.t2 = createCriteriaWthoutConditions();
                      return _context.abrupt('return', _context.t0.read.call(_context.t0, _context.t1, _context.t2));

                    case 16:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }))).toArray());

          case 10:
            _context2.t1 = _context2.sent;
            return _context2.abrupt('return', _context2.t0.fromJS.call(_context2.t0, _context2.t1));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createUserFeedbacks(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = createUserFeedbacks;


describe('create', function () {
  test('should return the created user feedback Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var userFeedbackId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = userFeedbackService;
            _context3.next = 3;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 3:
            _context3.t1 = _context3.sent.userFeedback;
            _context3.next = 6;
            return _context3.t0.create.call(_context3.t0, _context3.t1);

          case 6:
            userFeedbackId = _context3.sent;


            expect(userFeedbackId).toBeDefined();

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('should create the user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var _ref7, userFeedback, userFeedbackId, fetchedUserFeedback;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 2:
            _ref7 = _context4.sent;
            userFeedback = _ref7.userFeedback;
            _context4.next = 6;
            return userFeedbackService.create(userFeedback);

          case 6:
            userFeedbackId = _context4.sent;
            _context4.next = 9;
            return userFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

          case 9:
            fetchedUserFeedback = _context4.sent;


            expect(fetchedUserFeedback).toBeDefined();

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided user feedback Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var userFeedbackId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userFeedbackId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return userFeedbackService.read(userFeedbackId);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.message).toBe('No user feedback found with Id: ' + userFeedbackId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should read the existing user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var _ref10, expectedUserFeedback, expectedUser, userFeedbackId, userFeedback;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 2:
            _ref10 = _context6.sent;
            expectedUserFeedback = _ref10.userFeedback;
            expectedUser = _ref10.user;
            _context6.next = 7;
            return userFeedbackService.create(expectedUserFeedback);

          case 7:
            userFeedbackId = _context6.sent;
            _context6.next = 10;
            return userFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

          case 10:
            userFeedback = _context6.sent;


            (0, _UserFeedback.expectUserFeedback)(userFeedback, expectedUserFeedback, { userFeedbackId: userFeedbackId, expectedUser: expectedUser });

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided user feedback Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var userFeedbackId, userFeedback;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            userFeedbackId = (0, _v2.default)();
            _context7.prev = 1;
            _context7.t0 = userFeedbackService;
            _context7.t1 = userFeedbackService;
            _context7.next = 6;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 6:
            _context7.t2 = _context7.sent.userFeedback;
            _context7.next = 9;
            return _context7.t1.create.call(_context7.t1, _context7.t2);

          case 9:
            _context7.t3 = _context7.sent;
            _context7.t4 = createCriteriaWthoutConditions();
            _context7.next = 13;
            return _context7.t0.read.call(_context7.t0, _context7.t3, _context7.t4);

          case 13:
            userFeedback = _context7.sent;
            _context7.next = 16;
            return userFeedbackService.update(userFeedback.set('id', userFeedbackId));

          case 16:
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t5 = _context7['catch'](1);

            expect(_context7.t5.message).toBe('No user feedback found with Id: ' + userFeedbackId);

          case 21:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 18]]);
  })));

  test('should return the Id of the updated user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref13, expectedUserFeedback, userFeedbackId, id;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 2:
            _ref13 = _context8.sent;
            expectedUserFeedback = _ref13.userFeedback;
            _context8.t0 = userFeedbackService;
            _context8.next = 7;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 7:
            _context8.t1 = _context8.sent.userFeedback;
            _context8.next = 10;
            return _context8.t0.create.call(_context8.t0, _context8.t1);

          case 10:
            userFeedbackId = _context8.sent;
            _context8.next = 13;
            return userFeedbackService.update(expectedUserFeedback.set('id', userFeedbackId));

          case 13:
            id = _context8.sent;


            expect(id).toBe(userFeedbackId);

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  test('should update the existing user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var _ref15, expectedUserFeedback, expectedUser, userFeedbackId, userFeedback;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 2:
            _ref15 = _context9.sent;
            expectedUserFeedback = _ref15.userFeedback;
            expectedUser = _ref15.user;
            _context9.t0 = userFeedbackService;
            _context9.next = 8;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 8:
            _context9.t1 = _context9.sent.userFeedback;
            _context9.next = 11;
            return _context9.t0.create.call(_context9.t0, _context9.t1);

          case 11:
            userFeedbackId = _context9.sent;
            _context9.next = 14;
            return userFeedbackService.update(expectedUserFeedback.set('id', userFeedbackId));

          case 14:
            _context9.next = 16;
            return userFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

          case 16:
            userFeedback = _context9.sent;


            (0, _UserFeedback.expectUserFeedback)(userFeedback, expectedUserFeedback, { userFeedbackId: userFeedbackId, expectedUser: expectedUser });

          case 18:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided user feedback Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var userFeedbackId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            userFeedbackId = (0, _v2.default)();
            _context10.prev = 1;
            _context10.next = 4;
            return userFeedbackService.delete(userFeedbackId);

          case 4:
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10['catch'](1);

            expect(_context10.t0.message).toBe('No user feedback found with Id: ' + userFeedbackId);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 6]]);
  })));

  test('should delete the existing user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var userFeedbackId;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.t0 = userFeedbackService;
            _context11.next = 3;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 3:
            _context11.t1 = _context11.sent.userFeedback;
            _context11.next = 6;
            return _context11.t0.create.call(_context11.t0, _context11.t1);

          case 6:
            userFeedbackId = _context11.sent;
            _context11.next = 9;
            return userFeedbackService.delete(userFeedbackId);

          case 9:
            _context11.prev = 9;
            _context11.next = 12;
            return userFeedbackService.delete(userFeedbackId);

          case 12:
            _context11.next = 17;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t2 = _context11['catch'](9);

            expect(_context11.t2.message).toBe('No user feedback found with Id: ' + userFeedbackId);

          case 17:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[9, 14]]);
  })));
});

describe('search', function () {
  test('should return no user feedback if provided criteria matches no user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var userFeedbacks;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return userFeedbackService.search(createCriteria());

          case 2:
            userFeedbacks = _context12.sent;


            expect(userFeedbacks.count()).toBe(0);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  test('should return the user feedback matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var _ref20, expectedUserFeedback, expectedUser, results, userFeedbacks;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 2:
            _ref20 = _context14.sent;
            expectedUserFeedback = _ref20.userFeedback;
            expectedUser = _ref20.user;
            _context14.t0 = _immutable2.default;
            _context14.next = 8;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      return _context13.abrupt('return', userFeedbackService.create(expectedUserFeedback));

                    case 1:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, undefined);
            }))).toArray());

          case 8:
            _context14.t1 = _context14.sent;
            results = _context14.t0.fromJS.call(_context14.t0, _context14.t1);
            _context14.next = 12;
            return userFeedbackService.search(createCriteria(expectedUserFeedback));

          case 12:
            userFeedbacks = _context14.sent;


            expect(userFeedbacks.count).toBe(results.count);
            userFeedbacks.forEach(function (userFeedback) {
              expect(results.find(function (_) {
                return _.localeCompare(userFeedback.get('id')) === 0;
              })).toBeDefined();
              (0, _UserFeedback.expectUserFeedback)(userFeedback, expectedUserFeedback, { userFeedbackId: userFeedback.get('id'), expectedUser: expectedUser });
            });

          case 15:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no user feedback if provided criteria matches no user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var userFeedbacks, result;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            userFeedbacks = (0, _immutable.List)();
            result = userFeedbackService.searchAll(createCriteria());
            _context15.prev = 2;

            result.event.subscribe(function (info) {
              userFeedbacks = userFeedbacks.push(info);
            });

            _context15.next = 6;
            return result.promise;

          case 6:
            _context15.prev = 6;

            result.event.unsubscribeAll();
            return _context15.finish(6);

          case 9:

            expect(userFeedbacks.count()).toBe(0);

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[2,, 6, 9]]);
  })));

  test('should return the user feedback matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var _ref24, expectedUserFeedback, expectedUser, results, userFeedbacks, result;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _UserFeedback.createUserFeedbackInfo)();

          case 2:
            _ref24 = _context17.sent;
            expectedUserFeedback = _ref24.userFeedback;
            expectedUser = _ref24.user;
            _context17.t0 = _immutable2.default;
            _context17.next = 8;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      return _context16.abrupt('return', userFeedbackService.create(expectedUserFeedback));

                    case 1:
                    case 'end':
                      return _context16.stop();
                  }
                }
              }, _callee16, undefined);
            }))).toArray());

          case 8:
            _context17.t1 = _context17.sent;
            results = _context17.t0.fromJS.call(_context17.t0, _context17.t1);
            userFeedbacks = (0, _immutable.List)();
            result = userFeedbackService.searchAll(createCriteria(expectedUserFeedback));
            _context17.prev = 12;

            result.event.subscribe(function (info) {
              userFeedbacks = userFeedbacks.push(info);
            });

            _context17.next = 16;
            return result.promise;

          case 16:
            _context17.prev = 16;

            result.event.unsubscribeAll();
            return _context17.finish(16);

          case 19:

            expect(userFeedbacks.count).toBe(results.count);
            userFeedbacks.forEach(function (userFeedback) {
              expect(results.find(function (_) {
                return _.localeCompare(userFeedback.get('id')) === 0;
              })).toBeDefined();
              (0, _UserFeedback.expectUserFeedback)(userFeedback, expectedUserFeedback, { userFeedbackId: userFeedback.get('id'), expectedUser: expectedUser });
            });

          case 21:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[12,, 16, 19]]);
  })));
});

describe('exists', function () {
  test('should return false if no user feedback match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.t0 = expect;
            _context18.next = 3;
            return userFeedbackService.exists(createCriteria());

          case 3:
            _context18.t1 = _context18.sent;
            (0, _context18.t0)(_context18.t1).toBeFalsy();

          case 5:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  })));

  test('should return true if any user feedback match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
    var userFeedbacks;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return createUserFeedbacks(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            userFeedbacks = _context19.sent;
            _context19.t0 = expect;
            _context19.next = 6;
            return userFeedbackService.exists(createCriteria(userFeedbacks.first()));

          case 6:
            _context19.t1 = _context19.sent;
            (0, _context19.t0)(_context19.t1).toBeTruthy();

          case 8:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no user feedback match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.t0 = expect;
            _context20.next = 3;
            return userFeedbackService.count(createCriteria());

          case 3:
            _context20.t1 = _context20.sent;
            (0, _context20.t0)(_context20.t1).toBe(0);

          case 5:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  })));

  test('should return the count of user feedback match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee21() {
    var userFeedbacks;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return createUserFeedbacks(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            userFeedbacks = _context21.sent;
            _context21.t0 = expect;
            _context21.next = 6;
            return userFeedbackService.count(createCriteria(userFeedbacks.first()));

          case 6:
            _context21.t1 = _context21.sent;
            _context21.t2 = userFeedbacks.count();
            (0, _context21.t0)(_context21.t1).toBe(_context21.t2);

          case 9:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  })));
});