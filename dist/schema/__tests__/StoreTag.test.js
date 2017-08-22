'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.expectStoreTag = exports.createStoreTag = exports.createStoreTagInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

var _StoreService = require('../../services/__tests__/StoreService.test');

var _StoreService2 = _interopRequireDefault(_StoreService);

var _TagService = require('../../services/__tests__/TagService.test');

var _TagService2 = _interopRequireDefault(_TagService);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            },
          );
        }
      }
      return step('next');
    });
  };
}

var createStoreTagInfo = (exports.createStoreTagInfo = (function() {
  var _ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        parentStoreTagId = _ref2.parentStoreTagId;

      var chance, store, tag, storeTag;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                chance = new _chance2.default();
                _context.next = 3;
                return (0, _StoreService2.default)(1);

              case 3:
                store = _context.sent.first();
                _context.next = 6;
                return (0, _TagService2.default)(1);

              case 6:
                tag = _context.sent.first();
                storeTag = (0, _immutable.Map)({
                  key: (0, _v2.default)(),
                  name: (0, _v2.default)(),
                  description: (0, _v2.default)(),
                  imageUrl: (0, _v2.default)(),
                  url: (0, _v2.default)(),
                  level: chance.integer({ min: 1, max: 1000 }),
                  parentStoreTagId: parentStoreTagId,
                  storeId: store.get('id'),
                  tagId: tag.get('id'),
                });
                return _context.abrupt('return', { storeTag: storeTag, store: store, tag: tag });

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        undefined,
      );
    }),
  );

  return function createStoreTagInfo() {
    return _ref.apply(this, arguments);
  };
})());

var createStoreTag = (exports.createStoreTag = (function() {
  var _ref3 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(object) {
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.t0 = _.StoreTag;
                _context2.t1 = object;

                if (_context2.t1) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return createStoreTagInfo();

              case 5:
                _context2.t1 = _context2.sent.storeTag;

              case 6:
                _context2.t2 = _context2.t1;
                return _context2.abrupt('return', _context2.t0.spawn.call(_context2.t0, _context2.t2));

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        undefined,
      );
    }),
  );

  return function createStoreTag(_x2) {
    return _ref3.apply(this, arguments);
  };
})());

var expectStoreTag = (exports.expectStoreTag = function expectStoreTag(object, expectedObject) {
  var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    storeTagId = _ref4.storeTagId,
    expectedStore = _ref4.expectedStore,
    expectedTag = _ref4.expectedTag;

  expect(object.get('key')).toBe(expectedObject.get('key'));
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('url')).toBe(expectedObject.get('url'));
  expect(object.get('level')).toBe(expectedObject.get('level'));
  expect(object.get('parentStoreTagId')).toBe(expectedObject.get('parentStoreTagId'));

  if (storeTagId) {
    expect(object.get('id')).toBe(storeTagId);
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedTag) {
    expect(object.get('tag')).toEqual(expectedTag);
  }
});

describe('constructor', function() {
  test(
    'should set class name',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.t0 = expect;
                  _context3.next = 3;
                  return createStoreTag();

                case 3:
                  _context3.t1 = _context3.sent.className;
                  (0, _context3.t0)(_context3.t1).toBe('StoreTag');

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          },
          _callee3,
          undefined,
        );
      }),
    ),
  );
});

describe('static public methods', function() {
  test(
    'spawn should set provided info',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee4() {
        var _ref7, storeTag, object, info;

        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return createStoreTagInfo();

                case 2:
                  _ref7 = _context4.sent;
                  storeTag = _ref7.storeTag;
                  _context4.next = 6;
                  return createStoreTag(storeTag);

                case 6:
                  object = _context4.sent;
                  info = object.getInfo();

                  expectStoreTag(info, storeTag);

                case 9:
                case 'end':
                  return _context4.stop();
              }
            }
          },
          _callee4,
          undefined,
        );
      }),
    ),
  );
});

describe('public methods', function() {
  test(
    'getObject should return provided object',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee5() {
        var object;
        return regeneratorRuntime.wrap(
          function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  _context5.next = 2;
                  return createStoreTag();

                case 2:
                  object = _context5.sent;

                  expect(new _.StoreTag(object).getObject()).toBe(object);

                case 4:
                case 'end':
                  return _context5.stop();
              }
            }
          },
          _callee5,
          undefined,
        );
      }),
    ),
  );

  test(
    'getId should return provided object Id',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee6() {
        var object;
        return regeneratorRuntime.wrap(
          function _callee6$(_context6) {
            while (1) {
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  _context6.next = 2;
                  return createStoreTag();

                case 2:
                  object = _context6.sent;

                  expect(new _.StoreTag(object).getId()).toBe(object.id);

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          },
          _callee6,
          undefined,
        );
      }),
    ),
  );

  test(
    'updateInfo should update object info',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee7() {
        var object, _ref11, updatedStoreTag, info;

        return regeneratorRuntime.wrap(
          function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  _context7.next = 2;
                  return createStoreTag();

                case 2:
                  object = _context7.sent;
                  _context7.next = 5;
                  return createStoreTagInfo();

                case 5:
                  _ref11 = _context7.sent;
                  updatedStoreTag = _ref11.storeTag;

                  object.updateInfo(updatedStoreTag);

                  info = object.getInfo();

                  expectStoreTag(info, updatedStoreTag);

                case 10:
                case 'end':
                  return _context7.stop();
              }
            }
          },
          _callee7,
          undefined,
        );
      }),
    ),
  );

  test(
    'getInfo should return provided info',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee8() {
        var _ref13, storeTag, object, info;

        return regeneratorRuntime.wrap(
          function _callee8$(_context8) {
            while (1) {
              switch ((_context8.prev = _context8.next)) {
                case 0:
                  _context8.next = 2;
                  return createStoreTagInfo();

                case 2:
                  _ref13 = _context8.sent;
                  storeTag = _ref13.storeTag;
                  _context8.next = 6;
                  return createStoreTag(storeTag);

                case 6:
                  object = _context8.sent;
                  info = object.getInfo();

                  expect(info.get('id')).toBe(object.getId());
                  expectStoreTag(info, storeTag);

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          },
          _callee8,
          undefined,
        );
      }),
    ),
  );
});
