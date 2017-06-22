'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedCrawlSessionInfo = createCriteriaUsingProvidedCrawlSessionInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _CrawlSession = require('../../schema/__tests__/CrawlSession.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId) {
  expect(crawlSessionInfo.get('id')).toBe(crawlSessionId);
  expect(crawlSessionInfo.get('sessionKey')).toBe(expectedCrawlSessionInfo.get('sessionKey'));
  expect(crawlSessionInfo.get('startDateTime')).toEqual(expectedCrawlSessionInfo.get('startDateTime'));
  expect(crawlSessionInfo.get('endDateTime')).toEqual(expectedCrawlSessionInfo.get('endDateTime'));
  expect(crawlSessionInfo.get('processed')).toEqual(expectedCrawlSessionInfo.get('processed'));
  expect(crawlSessionInfo.get('additionalInfo')).toEqual(expectedCrawlSessionInfo.get('additionalInfo'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('sessionKey', 'startDateTime', 'endDateTime', 'processed', 'additionalInfo'),
    conditions: (0, _immutable.Map)({
      sessionKey: (0, _v2.default)(),
      startDateTime: Date(),
      endDateTime: Date(),
      processed: Date()
    })
  });
}

function createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('sessionKey', 'startDateTime', 'endDateTime', 'processed', 'additionalInfo'),
    conditions: (0, _immutable.Map)({
      sessionKey: crawlSessionInfo.get('sessionKey'),
      startDateTime: crawlSessionInfo.get('startDateTime'),
      endDateTime: crawlSessionInfo.get('endDateTime'),
      processed: crawlSessionInfo.get('processed')
    })
  });
}

describe('create', function () {
  test('should return the created crawl session Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _2.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            result = _context.sent;


            expect(result).toBeDefined();

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should create the crawl session', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var expectedCrawlSessionInfo, crawlSessionId, crawlSessionInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            expectedCrawlSessionInfo = (0, _CrawlSession.createCrawlSessionInfo)();
            _context2.next = 3;
            return _2.CrawlSessionService.create(expectedCrawlSessionInfo);

          case 3:
            crawlSessionId = _context2.sent;
            _context2.next = 6;
            return _2.CrawlSessionService.read(crawlSessionId);

          case 6:
            crawlSessionInfo = _context2.sent;


            expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided crawl session Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var crawlSessionId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            crawlSessionId = (0, _v2.default)();
            _context3.prev = 1;
            _context3.next = 4;
            return _2.CrawlSessionService.read(crawlSessionId);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);

            expect(_context3.t0.getErrorMessage()).toBe('No crawl session found with Id: ' + crawlSessionId);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));

  test('should read the existing crawl session', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var expectedCrawlSessionInfo, crawlSessionId, crawlSessionInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            expectedCrawlSessionInfo = (0, _CrawlSession.createCrawlSessionInfo)();
            _context4.next = 3;
            return _2.CrawlSessionService.create(expectedCrawlSessionInfo);

          case 3:
            crawlSessionId = _context4.sent;
            _context4.next = 6;
            return _2.CrawlSessionService.read(crawlSessionId);

          case 6:
            crawlSessionInfo = _context4.sent;


            expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided crawl session Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var crawlSessionId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            crawlSessionId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.CrawlSessionService.update((0, _CrawlSession.createCrawlSessionInfo)().set('id', crawlSessionId));

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No crawl session found with Id: ' + crawlSessionId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should return the Id of the updated crawl session', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var crawlSessionId, id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _2.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            crawlSessionId = _context6.sent;
            _context6.next = 5;
            return _2.CrawlSessionService.update((0, _CrawlSession.createCrawlSessionInfo)().set('id', crawlSessionId));

          case 5:
            id = _context6.sent;


            expect(id).toBe(crawlSessionId);

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('should update the existing crawl session', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var expectedCrawlSessionInfo, id, crawlSessionId, crawlSessionInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            expectedCrawlSessionInfo = (0, _CrawlSession.createCrawlSessionInfo)();
            _context7.next = 3;
            return _2.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 3:
            id = _context7.sent;
            _context7.next = 6;
            return _2.CrawlSessionService.update(expectedCrawlSessionInfo.set('id', id));

          case 6:
            crawlSessionId = _context7.sent;
            _context7.next = 9;
            return _2.CrawlSessionService.read(crawlSessionId);

          case 9:
            crawlSessionInfo = _context7.sent;


            expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided crawl session Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var crawlSessionId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            crawlSessionId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.next = 4;
            return _2.CrawlSessionService.delete(crawlSessionId);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8['catch'](1);

            expect(_context8.t0.getErrorMessage()).toBe('No crawl session found with Id: ' + crawlSessionId);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 6]]);
  })));

  test('should delete the existing crawl session', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var crawlSessionId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _2.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            crawlSessionId = _context9.sent;
            _context9.next = 5;
            return _2.CrawlSessionService.delete(crawlSessionId);

          case 5:
            _context9.prev = 5;
            _context9.next = 8;
            return _2.CrawlSessionService.read(crawlSessionId);

          case 8:
            _context9.next = 13;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9['catch'](5);

            expect(_context9.t0.getErrorMessage()).toBe('No crawl session found with Id: ' + crawlSessionId);

          case 13:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[5, 10]]);
  })));
});

describe('search', function () {
  test('should return no crawl session if provided criteria matches no crawl session', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var crawlSessionInfos;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _2.CrawlSessionService.search(createCriteria());

          case 2:
            crawlSessionInfos = _context10.sent;


            expect(crawlSessionInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  test('should return the crawl sessions matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var expectedCrawlSessionInfo, crawlSessionId, crawlSessionInfos, crawlSessionInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            expectedCrawlSessionInfo = (0, _CrawlSession.createCrawlSessionInfo)();
            _context11.next = 3;
            return _2.CrawlSessionService.create(expectedCrawlSessionInfo);

          case 3:
            crawlSessionId = _context11.sent;
            _context11.next = 6;
            return _2.CrawlSessionService.search(createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo));

          case 6:
            crawlSessionInfos = _context11.sent;


            expect(crawlSessionInfos.count()).toBe(1);

            crawlSessionInfo = crawlSessionInfos.first();

            expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);

          case 10:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no crawl session if provided criteria matches no crawl session', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var result, crawlSessions;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            result = _2.CrawlSessionService.searchAll(createCriteria());
            _context12.prev = 1;
            crawlSessions = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return crawlSessions = crawlSessions.push(info);
            });

            _context12.next = 6;
            return result.promise;

          case 6:
            expect(crawlSessions.count()).toBe(0);

          case 7:
            _context12.prev = 7;

            result.event.unsubscribeAll();
            return _context12.finish(7);

          case 10:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[1,, 7, 10]]);
  })));

  test('should return the crawl sessions matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var expectedCrawlSessionInfo, crawlSessionId1, crawlSessionId2, result, crawlSessions;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            expectedCrawlSessionInfo = (0, _CrawlSession.createCrawlSessionInfo)();
            _context13.next = 3;
            return _2.CrawlSessionService.create(expectedCrawlSessionInfo);

          case 3:
            crawlSessionId1 = _context13.sent;
            _context13.next = 6;
            return _2.CrawlSessionService.create(expectedCrawlSessionInfo);

          case 6:
            crawlSessionId2 = _context13.sent;
            result = _2.CrawlSessionService.searchAll(createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo));
            _context13.prev = 8;
            crawlSessions = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return crawlSessions = crawlSessions.push(info);
            });

            _context13.next = 13;
            return result.promise;

          case 13:
            expect(crawlSessions.count()).toBe(2);
            expect(crawlSessions.find(function (_) {
              return _.get('id').localeCompare(crawlSessionId1) === 0;
            })).toBeTruthy();
            expect(crawlSessions.find(function (_) {
              return _.get('id').localeCompare(crawlSessionId2) === 0;
            })).toBeTruthy();

          case 16:
            _context13.prev = 16;

            result.event.unsubscribeAll();
            return _context13.finish(16);

          case 19:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[8,, 16, 19]]);
  })));
});

describe('exists', function () {
  test('should return false if no crawl session match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _2.CrawlSessionService.exists(createCriteria());

          case 2:
            response = _context14.sent;


            expect(response).toBeFalsy();

          case 4:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));

  test('should return true if any crawl session match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var crawlSessionInfo, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            crawlSessionInfo = (0, _CrawlSession.createCrawlSessionInfo)();
            _context15.next = 3;
            return _2.CrawlSessionService.create(crawlSessionInfo);

          case 3:
            response = _2.CrawlSessionService.exists(createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo));


            expect(response).toBeTruthy();

          case 5:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no crawl session match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _2.CrawlSessionService.count(createCriteria());

          case 2:
            response = _context16.sent;


            expect(response).toBe(0);

          case 4:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  })));

  test('should return the count of crawl session match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var crawlSessionInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            crawlSessionInfo = (0, _CrawlSession.createCrawlSessionInfo)();
            _context17.next = 3;
            return _2.CrawlSessionService.create(crawlSessionInfo);

          case 3:
            _context17.next = 5;
            return _2.CrawlSessionService.create(crawlSessionInfo);

          case 5:
            _context17.next = 7;
            return _2.CrawlSessionService.count(createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo));

          case 7:
            response = _context17.sent;


            expect(response).toBe(2);

          case 9:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});