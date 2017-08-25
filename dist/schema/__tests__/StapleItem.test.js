'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.expectStapleItem = exports.createStapleItem = exports.createStapleItemInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

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

var chance = new _chance2.default();

var createStapleItemInfo = (exports.createStapleItemInfo = (function() {
  var _ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee() {
      var tags, username, user, userSignUpResult, userId, stapleItem;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return (0, _TagService2.default)(chance.integer({ min: 1, max: 10 }));

              case 2:
                tags = _context.sent;
                username = (0, _v2.default)() + '@email.com';
                user = _microBusinessParseServerCommon.ParseWrapperService.createNewUser();

                user.setUsername(username);
                user.setPassword('123456');

                _context.next = 9;
                return user.signUp();

              case 9:
                userSignUpResult = _context.sent;
                userId = userSignUpResult.id;
                stapleItem = (0, _immutable.Map)({
                  name: (0, _v2.default)(),
                  description: (0, _v2.default)(),
                  imageUrl: (0, _v2.default)(),
                  userId: userId,
                  tagIds: tags.map(function(tag) {
                    return tag.get('id');
                  }),
                });
                return _context.abrupt('return', { stapleItem: stapleItem, user: userSignUpResult, tags: tags });

              case 13:
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

  return function createStapleItemInfo() {
    return _ref.apply(this, arguments);
  };
})());

var createStapleItem = (exports.createStapleItem = (function() {
  var _ref2 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(object) {
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.t0 = _.StapleItem;
                _context2.t1 = object;

                if (_context2.t1) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return createStapleItemInfo();

              case 5:
                _context2.t1 = _context2.sent.stapleItem;

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

  return function createStapleItem(_x) {
    return _ref2.apply(this, arguments);
  };
})());

var expectStapleItem = (exports.expectStapleItem = function expectStapleItem(object, expectedObject) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    stapleItemId = _ref3.stapleItemId,
    expectedTags = _ref3.expectedTags;

  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('userId')).toBe(expectedObject.get('userId'));

  if (stapleItemId) {
    expect(object.get('id')).toBe(stapleItemId);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
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
                  return createStapleItem();

                case 3:
                  _context3.t1 = _context3.sent.className;
                  (0, _context3.t0)(_context3.t1).toBe('StapleItem');

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
        var _ref6, stapleItem, object, info;

        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return createStapleItemInfo();

                case 2:
                  _ref6 = _context4.sent;
                  stapleItem = _ref6.stapleItem;
                  _context4.next = 6;
                  return createStapleItem(stapleItem);

                case 6:
                  object = _context4.sent;
                  info = object.getInfo();

                  expectStapleItem(info, stapleItem);

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
                  return createStapleItem();

                case 2:
                  object = _context5.sent;

                  expect(new _.StapleItem(object).getObject()).toBe(object);

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
                  return createStapleItem();

                case 2:
                  object = _context6.sent;

                  expect(new _.StapleItem(object).getId()).toBe(object.id);

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
        var object, _ref10, updatedStapleItem, info;

        return regeneratorRuntime.wrap(
          function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  _context7.next = 2;
                  return createStapleItem();

                case 2:
                  object = _context7.sent;
                  _context7.next = 5;
                  return createStapleItemInfo();

                case 5:
                  _ref10 = _context7.sent;
                  updatedStapleItem = _ref10.stapleItem;

                  object.updateInfo(updatedStapleItem);

                  info = object.getInfo();

                  expectStapleItem(info, updatedStapleItem);

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
        var _ref12, stapleItem, object, info;

        return regeneratorRuntime.wrap(
          function _callee8$(_context8) {
            while (1) {
              switch ((_context8.prev = _context8.next)) {
                case 0:
                  _context8.next = 2;
                  return createStapleItemInfo();

                case 2:
                  _ref12 = _context8.sent;
                  stapleItem = _ref12.stapleItem;
                  _context8.next = 6;
                  return createStapleItem(stapleItem);

                case 6:
                  object = _context8.sent;
                  info = object.getInfo();

                  expect(info.get('id')).toBe(object.getId());
                  expectStapleItem(info, stapleItem);

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
