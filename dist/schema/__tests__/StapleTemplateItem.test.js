'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectStapleTemplateItem = exports.createStapleTemplateItem = exports.createStapleTemplateItemInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

var _StapleTemplateService = require('../../services/__tests__/StapleTemplateService.test');

var _StapleTemplateService2 = _interopRequireDefault(_StapleTemplateService);

var _TagService = require('../../services/__tests__/TagService.test');

var _TagService2 = _interopRequireDefault(_TagService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();

var createStapleTemplateItemInfo = exports.createStapleTemplateItemInfo = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var stapleTemplates, tags, stapleTemplateItem;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _StapleTemplateService2.default)(chance.integer({ min: 1, max: 10 }));

          case 2:
            stapleTemplates = _context.sent;
            _context.next = 5;
            return (0, _TagService2.default)(chance.integer({ min: 1, max: 10 }));

          case 5:
            tags = _context.sent;
            stapleTemplateItem = (0, _immutable.Map)({
              name: (0, _v2.default)(),
              description: (0, _v2.default)(),
              imageUrl: (0, _v2.default)(),
              popular: chance.integer({ min: 0, max: 1000 }) % 2 === 0,
              stapleTemplateIds: stapleTemplates.map(function (stapleTemplate) {
                return stapleTemplate.get('id');
              }),
              tagIds: tags.map(function (tag) {
                return tag.get('id');
              })
            });
            return _context.abrupt('return', { stapleTemplateItem: stapleTemplateItem, stapleTemplates: stapleTemplates, tags: tags });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createStapleTemplateItemInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createStapleTemplateItem = exports.createStapleTemplateItem = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(object) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _.StapleTemplateItem;
            _context2.t1 = object;

            if (_context2.t1) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return createStapleTemplateItemInfo();

          case 5:
            _context2.t1 = _context2.sent.stapleTemplateItem;

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

  return function createStapleTemplateItem(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var expectStapleTemplateItem = exports.expectStapleTemplateItem = function expectStapleTemplateItem(object, expectedObject) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      stapleTemplateItemId = _ref3.stapleTemplateItemId,
      expectedStapleTemplates = _ref3.expectedStapleTemplates,
      expectedTags = _ref3.expectedTags;

  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('popular')).toBe(expectedObject.get('popular'));
  expect(object.get('stapleTemplateIds')).toEqual(expectedObject.get('stapleTemplateIds'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));

  if (stapleTemplateItemId) {
    expect(object.get('id')).toBe(stapleTemplateItemId);
  }

  if (expectedStapleTemplates) {
    expect(object.get('stapleTemplates')).toEqual(expectedStapleTemplates);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
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
            return createStapleTemplateItem();

          case 3:
            _context3.t1 = _context3.sent.className;
            (0, _context3.t0)(_context3.t1).toBe('StapleTemplateItem');

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
    var _ref6, stapleTemplateItem, object, info;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createStapleTemplateItemInfo();

          case 2:
            _ref6 = _context4.sent;
            stapleTemplateItem = _ref6.stapleTemplateItem;
            _context4.next = 6;
            return createStapleTemplateItem(stapleTemplateItem);

          case 6:
            object = _context4.sent;
            info = object.getInfo();


            expectStapleTemplateItem(info, stapleTemplateItem);

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
            return createStapleTemplateItem();

          case 2:
            object = _context5.sent;


            expect(new _.StapleTemplateItem(object).getObject()).toBe(object);

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
            return createStapleTemplateItem();

          case 2:
            object = _context6.sent;


            expect(new _.StapleTemplateItem(object).getId()).toBe(object.id);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('updateInfo should update object info', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var object, _ref10, updatedStapleTemplateItem, info;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createStapleTemplateItem();

          case 2:
            object = _context7.sent;
            _context7.next = 5;
            return createStapleTemplateItemInfo();

          case 5:
            _ref10 = _context7.sent;
            updatedStapleTemplateItem = _ref10.stapleTemplateItem;


            object.updateInfo(updatedStapleTemplateItem);

            info = object.getInfo();


            expectStapleTemplateItem(info, updatedStapleTemplateItem);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('getInfo should return provided info', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref12, stapleTemplateItem, object, info;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createStapleTemplateItemInfo();

          case 2:
            _ref12 = _context8.sent;
            stapleTemplateItem = _ref12.stapleTemplateItem;
            _context8.next = 6;
            return createStapleTemplateItem(stapleTemplateItem);

          case 6:
            object = _context8.sent;
            info = object.getInfo();


            expect(info.get('id')).toBe(object.getId());
            expectStapleTemplateItem(info, stapleTemplateItem);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});