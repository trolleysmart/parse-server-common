'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectStore = exports.createStore = exports.createStoreInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createStoreInfo = exports.createStoreInfo = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        parentStoreId = _ref2.parentStoreId;

    var chance, ownedByUser, maintainedByUsers, store;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            chance = new _chance2.default();
            _context.next = 3;
            return _parseServerCommon.ParseWrapperService.createNewUser({ username: (0, _v2.default)() + '@email.com', password: '123456' }).signUp();

          case 3:
            ownedByUser = _context.sent;
            _context.t0 = _immutable2.default;
            _context.next = 7;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 0, max: 3 })).map(function () {
              return _parseServerCommon.ParseWrapperService.createNewUser({ username: (0, _v2.default)() + '@email.com', password: '123456' }).signUp();
            }).toArray());

          case 7:
            _context.t1 = _context.sent;
            maintainedByUsers = _context.t0.fromJS.call(_context.t0, _context.t1);
            store = (0, _immutable.Map)({
              key: (0, _v2.default)(),
              name: (0, _v2.default)(),
              imageUrl: (0, _v2.default)(),
              address: (0, _v2.default)(),
              phones: _immutable.List.of((0, _immutable.Map)({ label: 'business', number: chance.integer({ min: 1000000, max: 999999999 }).toString() }), (0, _immutable.Map)({ label: 'business', number: chance.integer({ min: 1000000, max: 999999999 }).toString() })),
              geoLocation: _parseServerCommon.ParseWrapperService.createGeoPoint({
                latitude: chance.floating({ min: 1, max: 20 }),
                longitude: chance.floating({ min: -30, max: -1 })
              }),
              openFrom: new Date(),
              openUntil: new Date(),
              forDisplay: chance.integer({ min: 1, max: 1000 }) % 2 === 0,
              parentStoreId: parentStoreId,
              ownedByUserId: ownedByUser.id,
              maintainedByUserIds: maintainedByUsers.map(function (maintainedByUser) {
                return maintainedByUser.id;
              }),
              status: (0, _v2.default)(),
              googleMapUrl: (0, _v2.default)()
            });
            return _context.abrupt('return', { store: store, ownedByUser: ownedByUser, maintainedByUsers: maintainedByUsers });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createStoreInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createStore = exports.createStore = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(object) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _.Store;
            _context2.t1 = object;

            if (_context2.t1) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return createStoreInfo();

          case 5:
            _context2.t1 = _context2.sent.store;

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

  return function createStore(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var expectStore = exports.expectStore = function expectStore(object, expectedObject) {
  expect(object.get('key')).toBe(expectedObject.get('key'));
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('address')).toBe(expectedObject.get('address'));
  expect(object.get('phones')).toEqual(expectedObject.get('phones'));
  expect(object.get('geoLocation')).toEqual(expectedObject.get('geoLocation'));
  expect(object.get('openFrom')).toEqual(expectedObject.get('openFrom'));
  expect(object.get('openUntil')).toEqual(expectedObject.get('openUntil'));
  expect(object.get('forDisplay')).toBe(expectedObject.get('forDisplay'));
  expect(object.get('parentStoreId')).toBe(expectedObject.get('parentStoreId'));
  expect(object.get('ownedByUserId')).toBe(expectedObject.get('ownedByUserId'));
  expect(object.get('maintainedByUserIds')).toEqual(expectedObject.get('maintainedByUserIds'));
  expect(object.get('status')).toBe(expectedObject.get('status'));
  expect(object.get('googleMapUrl')).toBe(expectedObject.get('googleMapUrl'));
};

describe('constructor', function () {
  test('should set class name', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return createStore();

          case 3:
            _context3.t1 = _context3.sent.className;
            (0, _context3.t0)(_context3.t1).toBe('Store');

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
    var _ref6, store, object, info;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createStoreInfo();

          case 2:
            _ref6 = _context4.sent;
            store = _ref6.store;
            _context4.next = 6;
            return createStore(store);

          case 6:
            object = _context4.sent;
            info = object.getInfo();


            expectStore(info, store);

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
            return createStore();

          case 2:
            object = _context5.sent;


            expect(new _.Store(object).getObject()).toBe(object);

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
            return createStore();

          case 2:
            object = _context6.sent;


            expect(new _.Store(object).getId()).toBe(object.id);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('updateInfo should update object info', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var object, _ref10, updatedStore, info;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createStore();

          case 2:
            object = _context7.sent;
            _context7.next = 5;
            return createStoreInfo();

          case 5:
            _ref10 = _context7.sent;
            updatedStore = _ref10.store;


            object.updateInfo(updatedStore);

            info = object.getInfo();


            expectStore(info, updatedStore);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('getInfo should return provided info', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref12, store, object, info;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createStoreInfo();

          case 2:
            _ref12 = _context8.sent;
            store = _ref12.store;
            _context8.next = 6;
            return createStore(store);

          case 6:
            object = _context8.sent;
            info = object.getInfo();


            expect(info.get('id')).toBe(object.getId());
            expectStore(info, store);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});