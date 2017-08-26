'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _CrawlResult = require('../../schema/__tests__/CrawlResult.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();

var createCriteriaWthoutConditions = function createCriteriaWthoutConditions() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('crawlSession', 'resultSet'),
    include_crawlSession: true
  });
};

var createCriteria = function createCriteria(crawlResult) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      crawlSessionId: crawlResult ? crawlResult.get('crawlSessionId') : (0, _v2.default)()
    })
  }).merge(createCriteriaWthoutConditions());
};

var createCrawlResults = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(count) {
    var useSameInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var crawlResult, _ref2, tempCrawlResult;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            crawlResult = void 0;

            if (!useSameInfo) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 4:
            _ref2 = _context2.sent;
            tempCrawlResult = _ref2.crawlResult;


            crawlResult = tempCrawlResult;

          case 7:
            _context2.t0 = _immutable2.default;
            _context2.next = 10;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var finalCrawlResult, _ref4, _tempCrawlResult;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      finalCrawlResult = void 0;

                      if (!useSameInfo) {
                        _context.next = 5;
                        break;
                      }

                      finalCrawlResult = crawlResult;
                      _context.next = 10;
                      break;

                    case 5:
                      _context.next = 7;
                      return (0, _CrawlResult.createCrawlResultInfo)();

                    case 7:
                      _ref4 = _context.sent;
                      _tempCrawlResult = _ref4.crawlResult;


                      finalCrawlResult = _tempCrawlResult;

                    case 10:
                      _context.t0 = _2.CrawlResultService;
                      _context.next = 13;
                      return _2.CrawlResultService.create(finalCrawlResult);

                    case 13:
                      _context.t1 = _context.sent;
                      _context.t2 = createCriteriaWthoutConditions();
                      return _context.abrupt('return', _context.t0.read.call(_context.t0, _context.t1, _context.t2));

                    case 16:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }))).toArray());

          case 10:
            _context2.t1 = _context2.sent;
            return _context2.abrupt('return', _context2.t0.fromJS.call(_context2.t0, _context2.t1));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createCrawlResults(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = createCrawlResults;


describe('create', function () {
  test('should return the created crawl result Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var crawlResultId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = _2.CrawlResultService;
            _context3.next = 3;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 3:
            _context3.t1 = _context3.sent.crawlResult;
            _context3.next = 6;
            return _context3.t0.create.call(_context3.t0, _context3.t1);

          case 6:
            crawlResultId = _context3.sent;


            expect(crawlResultId).toBeDefined();

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('should create the crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var _ref7, crawlResult, crawlResultId, fetchedCrawlResult;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 2:
            _ref7 = _context4.sent;
            crawlResult = _ref7.crawlResult;
            _context4.next = 6;
            return _2.CrawlResultService.create(crawlResult);

          case 6:
            crawlResultId = _context4.sent;
            _context4.next = 9;
            return _2.CrawlResultService.read(crawlResultId, createCriteriaWthoutConditions());

          case 9:
            fetchedCrawlResult = _context4.sent;


            expect(fetchedCrawlResult).toBeDefined();

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided crawl result Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var crawlResultId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            crawlResultId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.CrawlResultService.read(crawlResultId);

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

  test('should read the existing crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var _ref10, expectedCrawlResult, expectedCrawlSession, crawlResultId, crawlResult;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 2:
            _ref10 = _context6.sent;
            expectedCrawlResult = _ref10.crawlResult;
            expectedCrawlSession = _ref10.crawlSession;
            _context6.next = 7;
            return _2.CrawlResultService.create(expectedCrawlResult);

          case 7:
            crawlResultId = _context6.sent;
            _context6.next = 10;
            return _2.CrawlResultService.read(crawlResultId, createCriteriaWthoutConditions());

          case 10:
            crawlResult = _context6.sent;


            (0, _CrawlResult.expectCrawlResult)(crawlResult, expectedCrawlResult, { crawlResultId: crawlResultId, expectedCrawlSession: expectedCrawlSession });

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided crawl result Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var crawlResultId, crawlResult;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            crawlResultId = (0, _v2.default)();
            _context7.prev = 1;
            _context7.t0 = _2.CrawlResultService;
            _context7.t1 = _2.CrawlResultService;
            _context7.next = 6;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 6:
            _context7.t2 = _context7.sent.crawlResult;
            _context7.next = 9;
            return _context7.t1.create.call(_context7.t1, _context7.t2);

          case 9:
            _context7.t3 = _context7.sent;
            _context7.t4 = createCriteriaWthoutConditions();
            _context7.next = 13;
            return _context7.t0.read.call(_context7.t0, _context7.t3, _context7.t4);

          case 13:
            crawlResult = _context7.sent;
            _context7.next = 16;
            return _2.CrawlResultService.update(crawlResult.set('id', crawlResultId));

          case 16:
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t5 = _context7['catch'](1);

            expect(_context7.t5.getErrorMessage()).toBe('No crawl result found with Id: ' + crawlResultId);

          case 21:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 18]]);
  })));

  test('should return the Id of the updated crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref13, expectedCrawlResult, crawlResultId, id;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 2:
            _ref13 = _context8.sent;
            expectedCrawlResult = _ref13.crawlResult;
            _context8.t0 = _2.CrawlResultService;
            _context8.next = 7;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 7:
            _context8.t1 = _context8.sent.crawlResult;
            _context8.next = 10;
            return _context8.t0.create.call(_context8.t0, _context8.t1);

          case 10:
            crawlResultId = _context8.sent;
            _context8.next = 13;
            return _2.CrawlResultService.update(expectedCrawlResult.set('id', crawlResultId));

          case 13:
            id = _context8.sent;


            expect(id).toBe(crawlResultId);

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  test('should update the existing crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var _ref15, expectedCrawlResult, expectedCrawlSession, crawlResultId, crawlResult;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 2:
            _ref15 = _context9.sent;
            expectedCrawlResult = _ref15.crawlResult;
            expectedCrawlSession = _ref15.crawlSession;
            _context9.t0 = _2.CrawlResultService;
            _context9.next = 8;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 8:
            _context9.t1 = _context9.sent.crawlResult;
            _context9.next = 11;
            return _context9.t0.create.call(_context9.t0, _context9.t1);

          case 11:
            crawlResultId = _context9.sent;
            _context9.next = 14;
            return _2.CrawlResultService.update(expectedCrawlResult.set('id', crawlResultId));

          case 14:
            _context9.next = 16;
            return _2.CrawlResultService.read(crawlResultId, createCriteriaWthoutConditions());

          case 16:
            crawlResult = _context9.sent;


            (0, _CrawlResult.expectCrawlResult)(crawlResult, expectedCrawlResult, { crawlResultId: crawlResultId, expectedCrawlSession: expectedCrawlSession });

          case 18:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided crawl result Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var crawlResultId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            crawlResultId = (0, _v2.default)();
            _context10.prev = 1;
            _context10.next = 4;
            return _2.CrawlResultService.delete(crawlResultId);

          case 4:
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10['catch'](1);

            expect(_context10.t0.getErrorMessage()).toBe('No crawl result found with Id: ' + crawlResultId);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 6]]);
  })));

  test('should delete the existing crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var crawlResultId;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.t0 = _2.CrawlResultService;
            _context11.next = 3;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 3:
            _context11.t1 = _context11.sent.crawlResult;
            _context11.next = 6;
            return _context11.t0.create.call(_context11.t0, _context11.t1);

          case 6:
            crawlResultId = _context11.sent;
            _context11.next = 9;
            return _2.CrawlResultService.delete(crawlResultId);

          case 9:
            _context11.prev = 9;
            _context11.next = 12;
            return _2.CrawlResultService.delete(crawlResultId);

          case 12:
            _context11.next = 17;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t2 = _context11['catch'](9);

            expect(_context11.t2.getErrorMessage()).toBe('No crawl result found with Id: ' + crawlResultId);

          case 17:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[9, 14]]);
  })));
});

describe('search', function () {
  test('should return no crawl result if provided criteria matches no crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var crawlResults;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _2.CrawlResultService.search(createCriteria());

          case 2:
            crawlResults = _context12.sent;


            expect(crawlResults.count()).toBe(0);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  test('should return the crawl result matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var _ref20, expectedCrawlResult, expectedCrawlSession, results, crawlResults;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 2:
            _ref20 = _context14.sent;
            expectedCrawlResult = _ref20.crawlResult;
            expectedCrawlSession = _ref20.crawlSession;
            _context14.t0 = _immutable2.default;
            _context14.next = 8;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      return _context13.abrupt('return', _2.CrawlResultService.create(expectedCrawlResult));

                    case 1:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, undefined);
            }))).toArray());

          case 8:
            _context14.t1 = _context14.sent;
            results = _context14.t0.fromJS.call(_context14.t0, _context14.t1);
            _context14.next = 12;
            return _2.CrawlResultService.search(createCriteria(expectedCrawlResult));

          case 12:
            crawlResults = _context14.sent;


            expect(crawlResults.count).toBe(results.count);
            crawlResults.forEach(function (crawlResult) {
              expect(results.find(function (_) {
                return _.localeCompare(crawlResult.get('id')) === 0;
              })).toBeDefined();
              (0, _CrawlResult.expectCrawlResult)(crawlResult, expectedCrawlResult, { crawlResultId: crawlResult.get('id'), expectedCrawlSession: expectedCrawlSession });
            });

          case 15:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no crawl result if provided criteria matches no crawl result', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var crawlResults, result;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            crawlResults = (0, _immutable.List)();
            result = _2.CrawlResultService.searchAll(createCriteria());
            _context15.prev = 2;

            result.event.subscribe(function (info) {
              crawlResults = crawlResults.push(info);
            });

            _context15.next = 6;
            return result.promise;

          case 6:
            _context15.prev = 6;

            result.event.unsubscribeAll();
            return _context15.finish(6);

          case 9:

            expect(crawlResults.count()).toBe(0);

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[2,, 6, 9]]);
  })));

  test('should return the crawl result matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var _ref24, expectedCrawlResult, expectedCrawlSession, results, crawlResults, result;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _CrawlResult.createCrawlResultInfo)();

          case 2:
            _ref24 = _context17.sent;
            expectedCrawlResult = _ref24.crawlResult;
            expectedCrawlSession = _ref24.crawlSession;
            _context17.t0 = _immutable2.default;
            _context17.next = 8;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      return _context16.abrupt('return', _2.CrawlResultService.create(expectedCrawlResult));

                    case 1:
                    case 'end':
                      return _context16.stop();
                  }
                }
              }, _callee16, undefined);
            }))).toArray());

          case 8:
            _context17.t1 = _context17.sent;
            results = _context17.t0.fromJS.call(_context17.t0, _context17.t1);
            crawlResults = (0, _immutable.List)();
            result = _2.CrawlResultService.searchAll(createCriteria(expectedCrawlResult));
            _context17.prev = 12;

            result.event.subscribe(function (info) {
              crawlResults = crawlResults.push(info);
            });

            _context17.next = 16;
            return result.promise;

          case 16:
            _context17.prev = 16;

            result.event.unsubscribeAll();
            return _context17.finish(16);

          case 19:

            expect(crawlResults.count).toBe(results.count);
            crawlResults.forEach(function (crawlResult) {
              expect(results.find(function (_) {
                return _.localeCompare(crawlResult.get('id')) === 0;
              })).toBeDefined();
              (0, _CrawlResult.expectCrawlResult)(crawlResult, expectedCrawlResult, { crawlResultId: crawlResult.get('id'), expectedCrawlSession: expectedCrawlSession });
            });

          case 21:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[12,, 16, 19]]);
  })));
});

describe('exists', function () {
  test('should return false if no crawl result match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.t0 = expect;
            _context18.next = 3;
            return _2.CrawlResultService.exists(createCriteria());

          case 3:
            _context18.t1 = _context18.sent;
            (0, _context18.t0)(_context18.t1).toBeFalsy();

          case 5:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  })));

  test('should return true if any crawl result match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
    var crawlResults;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return createCrawlResults(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            crawlResults = _context19.sent;
            _context19.t0 = expect;
            _context19.next = 6;
            return _2.CrawlResultService.exists(createCriteria(crawlResults.first()));

          case 6:
            _context19.t1 = _context19.sent;
            (0, _context19.t0)(_context19.t1).toBeTruthy();

          case 8:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no crawl result match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.t0 = expect;
            _context20.next = 3;
            return _2.CrawlResultService.count(createCriteria());

          case 3:
            _context20.t1 = _context20.sent;
            (0, _context20.t0)(_context20.t1).toBe(0);

          case 5:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  })));

  test('should return the count of crawl result match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee21() {
    var crawlResults;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return createCrawlResults(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            crawlResults = _context21.sent;
            _context21.t0 = expect;
            _context21.next = 6;
            return _2.CrawlResultService.count(createCriteria(crawlResults.first()));

          case 6:
            _context21.t1 = _context21.sent;
            _context21.t2 = crawlResults.count();
            (0, _context21.t0)(_context21.t1).toBe(_context21.t2);

          case 9:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  })));
});