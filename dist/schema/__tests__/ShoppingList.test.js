'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectShoppingList = exports.createShoppingList = exports.createShoppingListInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();

var createShoppingListInfo = exports.createShoppingListInfo = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var user, sharedWithUsers, shoppingList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _parseServerCommon.ParseWrapperService.createNewUser({ username: (0, _v2.default)() + '@email.com', password: '123456' }).signUp();

          case 2:
            user = _context.sent;
            _context.t0 = _immutable2.default;
            _context.next = 6;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 0, max: 3 })).map(function () {
              return _parseServerCommon.ParseWrapperService.createNewUser({ username: (0, _v2.default)() + '@email.com', password: '123456' }).signUp();
            }).toArray());

          case 6:
            _context.t1 = _context.sent;
            sharedWithUsers = _context.t0.fromJS.call(_context.t0, _context.t1);
            shoppingList = (0, _immutable.Map)({
              name: (0, _v2.default)(),
              userId: user.id,
              sharedWithUserIds: sharedWithUsers.map(function (sharedWithUser) {
                return sharedWithUser.id;
              }),
              status: (0, _v2.default)()
            });
            return _context.abrupt('return', { shoppingList: shoppingList, user: user, sharedWithUsers: sharedWithUsers });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createShoppingListInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createShoppingList = exports.createShoppingList = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(object) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _2.ShoppingList;
            _context2.t1 = object;

            if (_context2.t1) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return createShoppingListInfo();

          case 5:
            _context2.t1 = _context2.sent.shoppingList;

          case 6:
            _context2.t2 = _context2.t1;
            return _context2.abrupt('return', _context2.t0.spawn.call(_context2.t0, _context2.t2));

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createShoppingList(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var expectShoppingList = exports.expectShoppingList = function expectShoppingList(object, expectedObject) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      shoppingListId = _ref3.shoppingListId,
      expectedUser = _ref3.expectedUser,
      expectedSharedWithUsers = _ref3.expectedSharedWithUsers;

  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('userId')).toBe(expectedObject.get('userId'));
  expect(object.get('sharedWithUserIds')).toEqual(expectedObject.get('sharedWithUserIds'));
  expect(object.get('status')).toBe(expectedObject.get('status'));

  if (shoppingListId) {
    expect(object.get('id')).toBe(shoppingListId);
  }

  if (expectedUser) {
    expect(object.get('user').id).toEqual(expectedUser.id);
    expect(object.get('user').username).toEqual(expectedUser.username);
  }

  if (expectedSharedWithUsers) {
    expectedSharedWithUsers.forEach(function (expectedSharedWithUser) {
      var sharedWithUser = object.get('sharedWithUsers').find(function (_) {
        return _.id.localeCompare(expectedSharedWithUser.id) === 0;
      });

      expect(sharedWithUser).toBeTruthy();
      expect(sharedWithUser.username).toEqual(expectedSharedWithUser.username);
    });
  }
};

describe('constructor', function () {
  test('should set class name', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return createShoppingList();

          case 3:
            _context3.t1 = _context3.sent.className;
            (0, _context3.t0)(_context3.t1).toBe('ShoppingList');

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});

describe('static public methods', function () {
  test('spawn should set provided info', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var _ref6, shoppingList, object, info;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createShoppingListInfo();

          case 2:
            _ref6 = _context4.sent;
            shoppingList = _ref6.shoppingList;
            _context4.next = 6;
            return createShoppingList(shoppingList);

          case 6:
            object = _context4.sent;
            info = object.getInfo();


            expectShoppingList(info, shoppingList);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('public methods', function () {
  test('getObject should return provided object', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var object;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return createShoppingList();

          case 2:
            object = _context5.sent;


            expect(new _2.ShoppingList(object).getObject()).toBe(object);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  test('getId should return provided object Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var object;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return createShoppingList();

          case 2:
            object = _context6.sent;


            expect(new _2.ShoppingList(object).getId()).toBe(object.id);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('updateInfo should update object info', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var object, _ref10, updatedShoppingList, info;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createShoppingList();

          case 2:
            object = _context7.sent;
            _context7.next = 5;
            return createShoppingListInfo();

          case 5:
            _ref10 = _context7.sent;
            updatedShoppingList = _ref10.shoppingList;


            object.updateInfo(updatedShoppingList);

            info = object.getInfo();


            expectShoppingList(info, updatedShoppingList);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('getInfo should return provided info', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref12, shoppingList, object, info;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createShoppingListInfo();

          case 2:
            _ref12 = _context8.sent;
            shoppingList = _ref12.shoppingList;
            _context8.next = 6;
            return createShoppingList(shoppingList);

          case 6:
            object = _context8.sent;
            info = object.getInfo();


            expect(info.get('id')).toBe(object.getId());
            expectShoppingList(info, shoppingList);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});