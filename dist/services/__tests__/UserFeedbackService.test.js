'use strict';

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _UserFeedback = require('../../schema/__tests__/UserFeedback.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId) {
  expect(userFeedbackInfo.get('id')).toBe(userFeedbackId);
  expect(userFeedbackInfo.get('userId')).toBe(expectedUserFeedbackInfo.get('userId'));
  expect(userFeedbackInfo.get('feedback')).toEqual(expectedUserFeedbackInfo.get('feedback'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('user', 'feedback'),
    conditions: (0, _immutable.Map)({
      userId: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedUserFeedbackInfo(userFeedbackInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('user', 'feedback'),
    conditions: (0, _immutable.Map)({
      userId: userFeedbackInfo.get('userId')
    })
  });
}

var userId = void 0;
var sessionToken = void 0;
var acl = void 0;

beforeEach(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var username, user, result;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = (0, _v2.default)() + '@email.com';
          user = _microBusinessParseServerCommon.ParseWrapperService.createNewUser();


          user.setUsername(username);
          user.setPassword('123456');

          _context.next = 6;
          return user.signUp();

        case 6:
          result = _context.sent;


          sessionToken = result.getSessionToken();

          _context.t0 = _microBusinessParseServerCommon.ParseWrapperService;
          _context.next = 11;
          return _microBusinessParseServerCommon.UserService.getUser(username);

        case 11:
          _context.t1 = _context.sent;
          acl = _context.t0.createACL.call(_context.t0, _context.t1);

          userId = result.get('id');

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

describe('create', function () {
  test('should return the created user feedback Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _2.UserFeedbackService.create((0, _UserFeedback.createUserFeedbackInfo)(userId), acl);

          case 2:
            result = _context2.sent;


            expect(result).toBeDefined();

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  test('should create the user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var expectedUserFeedbackInfo, userFeedbackId, userFeedbackInfo;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            expectedUserFeedbackInfo = (0, _UserFeedback.createUserFeedbackInfo)(userId);
            _context3.next = 3;
            return _2.UserFeedbackService.create(expectedUserFeedbackInfo, acl);

          case 3:
            userFeedbackId = _context3.sent;
            _context3.next = 6;
            return _2.UserFeedbackService.read(userFeedbackId, sessionToken);

          case 6:
            userFeedbackInfo = _context3.sent;


            expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided user feedback Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var userFeedbackId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userFeedbackId = (0, _v2.default)();
            _context4.prev = 1;
            _context4.next = 4;
            return _2.UserFeedbackService.read(userFeedbackId, sessionToken);

          case 4:
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4['catch'](1);

            expect(_context4.t0.getErrorMessage()).toBe('No user feedback found with Id: ' + userFeedbackId);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 6]]);
  })));

  test('should read the existing user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var expectedUserFeedbackInfo, userFeedbackId, userFeedbackInfo;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            expectedUserFeedbackInfo = (0, _UserFeedback.createUserFeedbackInfo)(userId);
            _context5.next = 3;
            return _2.UserFeedbackService.create(expectedUserFeedbackInfo, acl);

          case 3:
            userFeedbackId = _context5.sent;
            _context5.next = 6;
            return _2.UserFeedbackService.read(userFeedbackId, sessionToken);

          case 6:
            userFeedbackInfo = _context5.sent;


            expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided user feedback Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var userFeedbackId;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userFeedbackId = (0, _v2.default)();
            _context6.prev = 1;
            _context6.next = 4;
            return _2.UserFeedbackService.update((0, _UserFeedback.createUserFeedbackInfo)().set('id', userFeedbackId));

          case 4:
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6['catch'](1);

            expect(_context6.t0.getErrorMessage()).toBe('No user feedback found with Id: ' + userFeedbackId);

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 6]]);
  })));

  test('should return the Id of the updated user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var userFeedbackId, id;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _2.UserFeedbackService.create((0, _UserFeedback.createUserFeedbackInfo)(userId), acl);

          case 2:
            userFeedbackId = _context7.sent;
            _context7.next = 5;
            return _2.UserFeedbackService.update((0, _UserFeedback.createUserFeedbackInfo)(userId).set('id', userFeedbackId), sessionToken);

          case 5:
            id = _context7.sent;


            expect(id).toBe(userFeedbackId);

          case 7:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('should update the existing user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var expectedUserFeedbackInfo, id, userFeedbackId, userFeedbackInfo;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            expectedUserFeedbackInfo = (0, _UserFeedback.createUserFeedbackInfo)(userId);
            _context8.next = 3;
            return _2.UserFeedbackService.create((0, _UserFeedback.createUserFeedbackInfo)(userId), acl);

          case 3:
            id = _context8.sent;
            _context8.next = 6;
            return _2.UserFeedbackService.update(expectedUserFeedbackInfo.set('id', id), sessionToken);

          case 6:
            userFeedbackId = _context8.sent;
            _context8.next = 9;
            return _2.UserFeedbackService.read(userFeedbackId, sessionToken);

          case 9:
            userFeedbackInfo = _context8.sent;


            expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId);

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided user feedback Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var userFeedbackId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            userFeedbackId = (0, _v2.default)();
            _context9.prev = 1;
            _context9.next = 4;
            return _2.UserFeedbackService.delete(userFeedbackId, sessionToken);

          case 4:
            _context9.next = 9;
            break;

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9['catch'](1);

            expect(_context9.t0.getErrorMessage()).toBe('No user feedback found with Id: ' + userFeedbackId);

          case 9:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[1, 6]]);
  })));

  test('should delete the existing user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var userFeedbackId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _2.UserFeedbackService.create((0, _UserFeedback.createUserFeedbackInfo)(userId), acl);

          case 2:
            userFeedbackId = _context10.sent;
            _context10.next = 5;
            return _2.UserFeedbackService.delete(userFeedbackId, sessionToken);

          case 5:
            _context10.prev = 5;
            _context10.next = 8;
            return _2.UserFeedbackService.read(userFeedbackId, sessionToken);

          case 8:
            _context10.next = 13;
            break;

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10['catch'](5);

            expect(_context10.t0.getErrorMessage()).toBe('No user feedback found with Id: ' + userFeedbackId);

          case 13:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[5, 10]]);
  })));
});

describe('search', function () {
  test('should return no user feedback if provided criteria matches no user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var userFeedbackInfos;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _2.UserFeedbackService.search(createCriteria(), sessionToken);

          case 2:
            userFeedbackInfos = _context11.sent;


            expect(userFeedbackInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));

  test('should return the user feedbacks matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var expectedUserFeedbackInfo, userFeedbackId, userFeedbackInfos, userFeedbackInfo;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            expectedUserFeedbackInfo = (0, _UserFeedback.createUserFeedbackInfo)(userId);
            _context12.next = 3;
            return _2.UserFeedbackService.create(expectedUserFeedbackInfo, acl);

          case 3:
            userFeedbackId = _context12.sent;
            _context12.next = 6;
            return _2.UserFeedbackService.search(createCriteriaUsingProvidedUserFeedbackInfo(expectedUserFeedbackInfo), sessionToken);

          case 6:
            userFeedbackInfos = _context12.sent;


            expect(userFeedbackInfos.count()).toBe(1);

            userFeedbackInfo = userFeedbackInfos.first();


            expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId);

          case 10:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no user feedback if provided criteria matches no user feedback', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var result, userFeedbackInfos;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            result = _2.UserFeedbackService.searchAll(createCriteria(), sessionToken);
            _context13.prev = 1;
            userFeedbackInfos = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              userFeedbackInfos = userFeedbackInfos.push(info);
            });

            _context13.next = 6;
            return result.promise;

          case 6:
            expect(userFeedbackInfos.count()).toBe(0);

          case 7:
            _context13.prev = 7;

            result.event.unsubscribeAll();
            return _context13.finish(7);

          case 10:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[1,, 7, 10]]);
  })));

  test('should return the user feedback matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var expectedUserFeedbackInfo, userFeedbackId1, userFeedbackId2, result, userFeedbackInfos;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            expectedUserFeedbackInfo = (0, _UserFeedback.createUserFeedbackInfo)(userId);
            _context14.next = 3;
            return _2.UserFeedbackService.create(expectedUserFeedbackInfo, acl);

          case 3:
            userFeedbackId1 = _context14.sent;
            _context14.next = 6;
            return _2.UserFeedbackService.create(expectedUserFeedbackInfo, acl);

          case 6:
            userFeedbackId2 = _context14.sent;
            result = _2.UserFeedbackService.searchAll(createCriteriaUsingProvidedUserFeedbackInfo(expectedUserFeedbackInfo), sessionToken);
            _context14.prev = 8;
            userFeedbackInfos = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              userFeedbackInfos = userFeedbackInfos.push(info);
            });

            _context14.next = 13;
            return result.promise;

          case 13:
            expect(userFeedbackInfos.count()).toBe(2);
            expect(userFeedbackInfos.find(function (_) {
              return _.get('id').localeCompare(userFeedbackId1) === 0;
            })).toBeTruthy();
            expect(userFeedbackInfos.find(function (_) {
              return _.get('id').localeCompare(userFeedbackId2) === 0;
            })).toBeTruthy();

          case 16:
            _context14.prev = 16;

            result.event.unsubscribeAll();
            return _context14.finish(16);

          case 19:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined, [[8,, 16, 19]]);
  })));
});

describe('exists', function () {
  test('should return false if no user feedback match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _2.UserFeedbackService.exists(createCriteria(), sessionToken);

          case 2:
            response = _context15.sent;


            expect(response).toBeFalsy();

          case 4:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));

  test('should return true if any user feedback match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var userFeedbackInfo, response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            userFeedbackInfo = (0, _UserFeedback.createUserFeedbackInfo)(userId);
            _context16.next = 3;
            return _2.UserFeedbackService.create(userFeedbackInfo, acl);

          case 3:
            _context16.next = 5;
            return _2.UserFeedbackService.exists(createCriteriaUsingProvidedUserFeedbackInfo(userFeedbackInfo), sessionToken);

          case 5:
            response = _context16.sent;


            expect(response).toBeTruthy();

          case 7:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no user feedback match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _2.UserFeedbackService.count(createCriteria(), sessionToken);

          case 2:
            response = _context17.sent;


            expect(response).toBe(0);

          case 4:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));

  test('should return the count of user feedback match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
    var userFeedbackInfo, response;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            userFeedbackInfo = (0, _UserFeedback.createUserFeedbackInfo)();
            _context18.next = 3;
            return _2.UserFeedbackService.create(userFeedbackInfo, acl);

          case 3:
            _context18.next = 5;
            return _2.UserFeedbackService.create(userFeedbackInfo, acl);

          case 5:
            _context18.next = 7;
            return _2.UserFeedbackService.count(createCriteriaUsingProvidedUserFeedbackInfo(userFeedbackInfo), sessionToken);

          case 7:
            response = _context18.sent;


            expect(response).toBe(2);

          case 9:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  })));
});