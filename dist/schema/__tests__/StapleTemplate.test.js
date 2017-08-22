'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.expectStapleTemplate = exports.createStapleTemplate = exports.createStapleTemplateInfo = undefined;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

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

var createStapleTemplateInfo = (exports.createStapleTemplateInfo = (function() {
  var _ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee() {
      var stapleTemplate;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                stapleTemplate = (0, _immutable.Map)({
                  name: (0, _v2.default)(),
                  description: (0, _v2.default)(),
                  imageUrl: (0, _v2.default)(),
                });
                return _context.abrupt('return', { stapleTemplate: stapleTemplate });

              case 2:
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

  return function createStapleTemplateInfo() {
    return _ref.apply(this, arguments);
  };
})());

var createStapleTemplate = (exports.createStapleTemplate = (function() {
  var _ref2 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(object) {
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.t0 = _.StapleTemplate;
                _context2.t1 = object;

                if (_context2.t1) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return createStapleTemplateInfo();

              case 5:
                _context2.t1 = _context2.sent.stapleTemplate;

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

  return function createStapleTemplate(_x) {
    return _ref2.apply(this, arguments);
  };
})());

var expectStapleTemplate = (exports.expectStapleTemplate = function expectStapleTemplate(object, expectedObject) {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
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
                  return createStapleTemplate();

                case 3:
                  _context3.t1 = _context3.sent.className;
                  (0, _context3.t0)(_context3.t1).toBe('StapleTemplate');

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
        var _ref5, stapleTemplate, object, info;

        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return createStapleTemplateInfo();

                case 2:
                  _ref5 = _context4.sent;
                  stapleTemplate = _ref5.stapleTemplate;
                  _context4.next = 6;
                  return createStapleTemplate(stapleTemplate);

                case 6:
                  object = _context4.sent;
                  info = object.getInfo();

                  expectStapleTemplate(info, stapleTemplate);

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
                  return createStapleTemplate();

                case 2:
                  object = _context5.sent;

                  expect(new _.StapleTemplate(object).getObject()).toBe(object);

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
                  return createStapleTemplate();

                case 2:
                  object = _context6.sent;

                  expect(new _.StapleTemplate(object).getId()).toBe(object.id);

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
        var object, _ref9, updatedStapleTemplate, info;

        return regeneratorRuntime.wrap(
          function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  _context7.next = 2;
                  return createStapleTemplate();

                case 2:
                  object = _context7.sent;
                  _context7.next = 5;
                  return createStapleTemplateInfo();

                case 5:
                  _ref9 = _context7.sent;
                  updatedStapleTemplate = _ref9.stapleTemplate;

                  object.updateInfo(updatedStapleTemplate);

                  info = object.getInfo();

                  expectStapleTemplate(info, updatedStapleTemplate);

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
        var _ref11, stapleTemplate, object, info;

        return regeneratorRuntime.wrap(
          function _callee8$(_context8) {
            while (1) {
              switch ((_context8.prev = _context8.next)) {
                case 0:
                  _context8.next = 2;
                  return createStapleTemplateInfo();

                case 2:
                  _ref11 = _context8.sent;
                  stapleTemplate = _ref11.stapleTemplate;
                  _context8.next = 6;
                  return createStapleTemplate(stapleTemplate);

                case 6:
                  object = _context8.sent;
                  info = object.getInfo();

                  expect(info.get('id')).toBe(object.getId());
                  expectStapleTemplate(info, stapleTemplate);

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
