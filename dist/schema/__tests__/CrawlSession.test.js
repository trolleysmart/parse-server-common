'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectCrawlSession = exports.createCrawlSession = exports.createCrawlSessionInfo = undefined;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createCrawlSessionInfo = exports.createCrawlSessionInfo = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var crawlSession;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            crawlSession = (0, _immutable.Map)({
              key: (0, _v2.default)(),
              startDateTime: new Date(),
              endDateTime: new Date(),
              additionalInfo: (0, _immutable.Map)({ info1: (0, _v2.default)(), info2: (0, _v2.default)() })
            });
            return _context.abrupt('return', { crawlSession: crawlSession });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createCrawlSessionInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createCrawlSession = exports.createCrawlSession = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(object) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _.CrawlSession;
            _context2.t1 = object;

            if (_context2.t1) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return createCrawlSessionInfo();

          case 5:
            _context2.t1 = _context2.sent.crawlSession;

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

  return function createCrawlSession(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var expectCrawlSession = exports.expectCrawlSession = function expectCrawlSession(object, expectedObject) {
  expect(object.get('key')).toBe(expectedObject.get('key'));
  expect(object.get('startDateTime')).toEqual(expectedObject.get('startDateTime'));
  expect(object.get('endDateTime')).toEqual(expectedObject.get('endDateTime'));
  expect(object.get('additionalInfo')).toEqual(expectedObject.get('additionalInfo'));
};

describe('constructor', function () {
  test('should set class name', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return createCrawlSession();

          case 3:
            _context3.t1 = _context3.sent.className;
            (0, _context3.t0)(_context3.t1).toBe('CrawlSession');

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
    var _ref5, crawlSession, object, info;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createCrawlSessionInfo();

          case 2:
            _ref5 = _context4.sent;
            crawlSession = _ref5.crawlSession;
            _context4.next = 6;
            return createCrawlSession(crawlSession);

          case 6:
            object = _context4.sent;
            info = object.getInfo();


            expectCrawlSession(info, crawlSession);

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
            return createCrawlSession();

          case 2:
            object = _context5.sent;


            expect(new _.CrawlSession(object).getObject()).toBe(object);

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
            return createCrawlSession();

          case 2:
            object = _context6.sent;


            expect(new _.CrawlSession(object).getId()).toBe(object.id);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('updateInfo should update object info', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var object, _ref9, updatedCrawlSession, info;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createCrawlSession();

          case 2:
            object = _context7.sent;
            _context7.next = 5;
            return createCrawlSessionInfo();

          case 5:
            _ref9 = _context7.sent;
            updatedCrawlSession = _ref9.crawlSession;


            object.updateInfo(updatedCrawlSession);

            info = object.getInfo();


            expectCrawlSession(info, updatedCrawlSession);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('getInfo should return provided info', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref11, crawlSession, object, info;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createCrawlSessionInfo();

          case 2:
            _ref11 = _context8.sent;
            crawlSession = _ref11.crawlSession;
            _context8.next = 6;
            return createCrawlSession(crawlSession);

          case 6:
            object = _context8.sent;
            info = object.getInfo();


            expect(info.get('id')).toBe(object.getId());
            expectCrawlSession(info, crawlSession);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});