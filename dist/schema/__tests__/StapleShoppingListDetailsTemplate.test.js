'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.expectStapleShoppingListDetailsTemplate = exports.createStapleShoppingListDetailsTemplate = exports.createStapleShoppingListDetailsTemplateInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

var _StapleShoppingListTemplateService = require('../../services/__tests__/StapleShoppingListTemplateService.test');

var _StapleShoppingListTemplateService2 = _interopRequireDefault(_StapleShoppingListTemplateService);

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

var createStapleShoppingListDetailsTemplateInfo = (exports.createStapleShoppingListDetailsTemplateInfo = (function() {
  var _ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee() {
      var stapleShoppingListTemplates, tags, stapleShoppingListDetailsTemplate;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return (0, _StapleShoppingListTemplateService2.default)(chance.integer({ min: 1, max: 10 }));

              case 2:
                stapleShoppingListTemplates = _context.sent;
                _context.next = 5;
                return (0, _TagService2.default)(chance.integer({ min: 1, max: 10 }));

              case 5:
                tags = _context.sent;
                stapleShoppingListDetailsTemplate = (0, _immutable.Map)({
                  name: (0, _v2.default)(),
                  description: (0, _v2.default)(),
                  imageUrl: (0, _v2.default)(),
                  stapleShoppingListTemplateIds: stapleShoppingListTemplates.map(function(stapleShoppingListTemplate) {
                    return stapleShoppingListTemplate.get('id');
                  }),
                  tagIds: tags.map(function(tag) {
                    return tag.get('id');
                  }),
                });
                return _context.abrupt('return', {
                  stapleShoppingListDetailsTemplate: stapleShoppingListDetailsTemplate,
                  stapleShoppingListTemplates: stapleShoppingListTemplates,
                  tags: tags,
                });

              case 8:
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

  return function createStapleShoppingListDetailsTemplateInfo() {
    return _ref.apply(this, arguments);
  };
})());

var createStapleShoppingListDetailsTemplate = (exports.createStapleShoppingListDetailsTemplate = (function() {
  var _ref2 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(object) {
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.t0 = _.StapleShoppingListDetailsTemplate;
                _context2.t1 = object;

                if (_context2.t1) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return createStapleShoppingListDetailsTemplateInfo();

              case 5:
                _context2.t1 = _context2.sent.stapleShoppingListDetailsTemplate;

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

  return function createStapleShoppingListDetailsTemplate(_x) {
    return _ref2.apply(this, arguments);
  };
})());

var expectStapleShoppingListDetailsTemplate = (exports.expectStapleShoppingListDetailsTemplate = function expectStapleShoppingListDetailsTemplate(
  object,
  expectedObject,
) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    stapleShoppingListDetailsTemplateId = _ref3.stapleShoppingListDetailsTemplateId,
    expectedStapleShoppingListTemplates = _ref3.expectedStapleShoppingListTemplates,
    expectedTags = _ref3.expectedTags;

  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));

  if (stapleShoppingListDetailsTemplateId) {
    expect(object.get('id')).toBe(stapleShoppingListDetailsTemplateId);
  }

  if (expectedStapleShoppingListTemplates) {
    expect(object.get('stapleShoppingListTemplates')).toEqual(expectedStapleShoppingListTemplates);
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
                  return createStapleShoppingListDetailsTemplate();

                case 3:
                  _context3.t1 = _context3.sent.className;
                  (0, _context3.t0)(_context3.t1).toBe('StapleShoppingListDetailsTemplate');

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
        var _ref6, stapleShoppingListDetailsTemplate, object, info;

        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return createStapleShoppingListDetailsTemplateInfo();

                case 2:
                  _ref6 = _context4.sent;
                  stapleShoppingListDetailsTemplate = _ref6.stapleShoppingListDetailsTemplate;
                  _context4.next = 6;
                  return createStapleShoppingListDetailsTemplate(stapleShoppingListDetailsTemplate);

                case 6:
                  object = _context4.sent;
                  info = object.getInfo();

                  expectStapleShoppingListDetailsTemplate(info, stapleShoppingListDetailsTemplate);

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
                  return createStapleShoppingListDetailsTemplate();

                case 2:
                  object = _context5.sent;

                  expect(new _.StapleShoppingListDetailsTemplate(object).getObject()).toBe(object);

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
                  return createStapleShoppingListDetailsTemplate();

                case 2:
                  object = _context6.sent;

                  expect(new _.StapleShoppingListDetailsTemplate(object).getId()).toBe(object.id);

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
        var object, _ref10, updatedStapleShoppingListDetailsTemplate, info;

        return regeneratorRuntime.wrap(
          function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  _context7.next = 2;
                  return createStapleShoppingListDetailsTemplate();

                case 2:
                  object = _context7.sent;
                  _context7.next = 5;
                  return createStapleShoppingListDetailsTemplateInfo();

                case 5:
                  _ref10 = _context7.sent;
                  updatedStapleShoppingListDetailsTemplate = _ref10.stapleShoppingListDetailsTemplate;

                  object.updateInfo(updatedStapleShoppingListDetailsTemplate);

                  info = object.getInfo();

                  expectStapleShoppingListDetailsTemplate(info, updatedStapleShoppingListDetailsTemplate);

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
        var _ref12, stapleShoppingListDetailsTemplate, object, info;

        return regeneratorRuntime.wrap(
          function _callee8$(_context8) {
            while (1) {
              switch ((_context8.prev = _context8.next)) {
                case 0:
                  _context8.next = 2;
                  return createStapleShoppingListDetailsTemplateInfo();

                case 2:
                  _ref12 = _context8.sent;
                  stapleShoppingListDetailsTemplate = _ref12.stapleShoppingListDetailsTemplate;
                  _context8.next = 6;
                  return createStapleShoppingListDetailsTemplate(stapleShoppingListDetailsTemplate);

                case 6:
                  object = _context8.sent;
                  info = object.getInfo();

                  expect(info.get('id')).toBe(object.getId());
                  expectStapleShoppingListDetailsTemplate(info, stapleShoppingListDetailsTemplate);

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
