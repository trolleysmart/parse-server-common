'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedCrawlResultInfo = createCriteriaUsingProvidedCrawlResultInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

var _CrawlSession = require('../../schema/__tests__/CrawlSession.test');

var _CrawlResult = require('../../schema/__tests__/CrawlResult.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId) {
  expect(crawlResultInfo.get('id')).toBe(crawlResultId);
  expect(crawlResultInfo.get('crawlSession').getId()).toBe(crawlSessionId);
  expect(crawlResultInfo.get('resultSet')).toEqual(expectedCrawlResultInfo.get('resultSet'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('crawlSession', 'resultSet'),
    conditions: (0, _immutable.Map)({
      crawlSessionId: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('crawlSession', 'resultSet'),
    conditions: (0, _immutable.Map)({
      crawlSessionId: crawlSessionId
    })
  });
}

describe('create', function () {
  test('should return the created crawl result Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var id, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            id = _context.sent;
            _context.next = 5;
            return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(id));

          case 5:
            result = _context.sent;


            expect(result).toBeDefined();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should create the crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var crawlSessionId, expectedCrawlResultInfo, crawlResultId, crawlResultInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            crawlSessionId = _context2.sent;
            expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(crawlSessionId);
            _context2.next = 6;
            return _.CrawlResultService.create(expectedCrawlResultInfo);

          case 6:
            crawlResultId = _context2.sent;
            _context2.next = 9;
            return _.CrawlResultService.read(crawlResultId);

          case 9:
            crawlResultInfo = _context2.sent;


            expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided crawl result Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var crawlResultId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            crawlResultId = (0, _v2.default)();
            _context3.prev = 1;
            _context3.next = 4;
            return _.CrawlResultService.read(crawlResultId);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);

            expect(_context3.t0.getErrorMessage()).toBe('No crawl result found with Id: ' + crawlResultId);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));

  test('should read the existing crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var crawlSessionId, expectedCrawlResultInfo, crawlResultId, crawlResultInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            crawlSessionId = _context4.sent;
            expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(crawlSessionId);
            _context4.next = 6;
            return _.CrawlResultService.create(expectedCrawlResultInfo);

          case 6:
            crawlResultId = _context4.sent;
            _context4.next = 9;
            return _.CrawlResultService.read(crawlResultId);

          case 9:
            crawlResultInfo = _context4.sent;


            expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided crawl result Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var crawlResultId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            crawlResultId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _.CrawlResultService.update((0, _CrawlResult.createCrawlResultInfo)().set('id', crawlResultId));

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No crawl result found with Id: ' + crawlResultId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should return the Id of the updated crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var crawlSessionId, crawlResultId, id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            crawlSessionId = _context6.sent;
            _context6.next = 5;
            return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(crawlSessionId));

          case 5:
            crawlResultId = _context6.sent;
            _context6.next = 8;
            return _.CrawlResultService.update((0, _CrawlResult.createCrawlResultInfo)().set('id', crawlResultId));

          case 8:
            id = _context6.sent;


            expect(id).toBe(crawlResultId);

          case 10:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('should update the existing crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var expectedCrawlSessionId, expectedCrawlResultInfo, crawlSessionId, id, crawlResultId, crawlResultInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            expectedCrawlSessionId = _context7.sent;
            expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(expectedCrawlSessionId);
            _context7.next = 6;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 6:
            crawlSessionId = _context7.sent;
            _context7.next = 9;
            return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(crawlSessionId));

          case 9:
            id = _context7.sent;
            _context7.next = 12;
            return _.CrawlResultService.update(expectedCrawlResultInfo.set('id', id));

          case 12:
            crawlResultId = _context7.sent;
            _context7.next = 15;
            return _.CrawlResultService.read(crawlResultId);

          case 15:
            crawlResultInfo = _context7.sent;


            expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, expectedCrawlSessionId);

          case 17:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided crawl result Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var crawlResultId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            crawlResultId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.next = 4;
            return _.CrawlResultService.delete(crawlResultId);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8['catch'](1);

            expect(_context8.t0.getErrorMessage()).toBe('No crawl result found with Id: ' + crawlResultId);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 6]]);
  })));

  test('should delete the existing crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var crawlResultId, id;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            crawlResultId = void 0;
            _context9.prev = 1;
            _context9.next = 4;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 4:
            id = _context9.sent;
            _context9.next = 7;
            return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(id));

          case 7:
            crawlResultId = _context9.sent;
            _context9.next = 10;
            return _.CrawlResultService.delete(crawlResultId);

          case 10:
            _context9.next = 12;
            return _.CrawlResultService.read(crawlResultId);

          case 12:
            _context9.next = 17;
            break;

          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9['catch'](1);

            expect(_context9.t0.getErrorMessage()).toBe('No crawl result found with Id: ' + crawlResultId);

          case 17:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[1, 14]]);
  })));
});

describe('search', function () {
  test('should return no crawl result if provided criteria matches no crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var crawlResultInfos;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _.CrawlResultService.search(createCriteria());

          case 2:
            crawlResultInfos = _context10.sent;


            expect(crawlResultInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  test('should return the crawl results matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var crawlSessionId, expectedCrawlResultInfo, crawlResultId, crawlResultInfos, crawlResultInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            crawlSessionId = _context11.sent;
            expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(crawlSessionId);
            _context11.next = 6;
            return _.CrawlResultService.create(expectedCrawlResultInfo);

          case 6:
            crawlResultId = _context11.sent;
            _context11.next = 9;
            return _.CrawlResultService.search(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));

          case 9:
            crawlResultInfos = _context11.sent;


            expect(crawlResultInfos.count()).toBe(1);

            crawlResultInfo = crawlResultInfos.first();


            expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);

          case 13:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no crawl result if provided criteria matches no crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var result, crawlResults;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            result = _.CrawlResultService.searchAll(createCriteria());
            _context12.prev = 1;
            crawlResults = (0, _immutable.List)();


            result.event.subscribe(function (crawlResult) {
              return crawlResults = crawlResults.push(crawlResult);
            });

            _context12.next = 6;
            return result.promise;

          case 6:
            expect(crawlResults.count()).toBe(0);

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

  test('should return the crawl results matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var crawlSessionId, expectedCrawlResultInfo, ids, crawlResultIds, result, crawlResults;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            crawlSessionId = _context13.sent;
            expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(crawlSessionId);
            _context13.next = 6;
            return Promise.all([_.CrawlResultService.create(expectedCrawlResultInfo), _.CrawlResultService.create(expectedCrawlResultInfo)]);

          case 6:
            ids = _context13.sent;
            crawlResultIds = _immutable.List.of(ids[0], ids[1]);
            result = _.CrawlResultService.searchAll(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));
            _context13.prev = 9;
            crawlResults = (0, _immutable.List)();


            result.event.subscribe(function (crawlResult) {
              crawlResults = crawlResults.push(crawlResult);
            });

            _context13.next = 14;
            return result.promise;

          case 14:
            expect(crawlResults.count()).toBe(crawlResultIds.count());

          case 15:
            _context13.prev = 15;

            result.event.unsubscribeAll();
            return _context13.finish(15);

          case 18:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[9,, 15, 18]]);
  })));
});

describe('exists', function () {
  test('should return false if no crawl result match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _.CrawlResultService.exists(createCriteria());

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

  test('should return true if any crawl resuult match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var crawlSessionId, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());

          case 2:
            crawlSessionId = _context15.sent;
            _context15.next = 5;
            return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(crawlSessionId));

          case 5:
            _context15.next = 7;
            return _.CrawlResultService.exists(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));

          case 7:
            response = _context15.sent;


            expect(response).toBeTruthy();

          case 9:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});