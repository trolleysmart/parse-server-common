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
  test('should return the created crawl result Id', function (done) {
    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(id));
    }).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the crawl result', function (done) {
    var crawlSessionId = void 0;
    var crawlResultId = void 0;
    var expectedCrawlResultInfo = void 0;

    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      crawlSessionId = id;
      expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(id);

      return _.CrawlResultService.create(expectedCrawlResultInfo);
    }).then(function (id) {
      crawlResultId = id;

      return _.CrawlResultService.read(crawlResultId);
    }).then(function (crawlResultInfo) {
      expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided crawl result Id does not exist', function (done) {
    var crawlResultId = (0, _v2.default)();

    _.CrawlResultService.read(crawlResultId).catch(function (error) {
      expect(error).toBe('No crawl result found with Id: ' + crawlResultId);
      done();
    });
  });

  test('should read the existing crawl result', function (done) {
    var crawlSessionId = void 0;
    var crawlResultId = void 0;
    var expectedCrawlResultInfo = void 0;

    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      crawlSessionId = id;
      expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(id);

      return _.CrawlResultService.create(expectedCrawlResultInfo);
    }).then(function (id) {
      crawlResultId = id;

      return _.CrawlResultService.read(crawlResultId);
    }).then(function (crawlResultInfo) {
      expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided crawl result Id does not exist', function (done) {
    var crawlResultId = (0, _v2.default)();

    _.CrawlResultService.update((0, _CrawlResult.createCrawlResultInfo)().set('id', crawlResultId)).catch(function (error) {
      expect(error).toBe('No crawl result found with Id: ' + crawlResultId);
      done();
    });
  });

  test('should return the Id of the updated crawl result', function (done) {
    var crawlResultId = void 0;

    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(id));
    }).then(function (id) {
      crawlResultId = id;

      return _.CrawlResultService.update((0, _CrawlResult.createCrawlResultInfo)().set('id', crawlResultId));
    }).then(function (id) {
      expect(id).toBe(crawlResultId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing crawl result', function (done) {
    var expectedCrawlResultInfo = void 0;
    var expectedCrawlSessionId = void 0;
    var crawlResultId = void 0;

    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      expectedCrawlSessionId = id;
      expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(expectedCrawlSessionId);

      return _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)());
    }).then(function (id) {
      return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(id));
    }).then(function (id) {
      return _.CrawlResultService.update(expectedCrawlResultInfo.set('id', id));
    }).then(function (id) {
      crawlResultId = id;

      return _.CrawlResultService.read(crawlResultId);
    }).then(function (crawlResultInfo) {
      expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, expectedCrawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided crawl result Id does not exist', function (done) {
    var crawlResultId = (0, _v2.default)();

    _.CrawlResultService.delete(crawlResultId).catch(function (error) {
      expect(error).toBe('No crawl result found with Id: ' + crawlResultId);
      done();
    });
  });

  test('should delete the existing crawl result', function (done) {
    var crawlResultId = void 0;

    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(id));
    }).then(function (id) {
      crawlResultId = id;
      return _.CrawlResultService.delete(crawlResultId);
    }).then(function () {
      return _.CrawlResultService.read(crawlResultId);
    }).catch(function (error) {
      expect(error).toBe('No crawl result found with Id: ' + crawlResultId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no crawl result if provided criteria matches no crawl result', function (done) {
    _.CrawlResultService.search(createCriteria()).then(function (crawlResultInfos) {
      expect(crawlResultInfos.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the crawl results matches the criteria', function (done) {
    var expectedCrawlResultInfo = void 0;
    var crawlResultId = void 0;
    var crawlSessionId = void 0;

    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      crawlSessionId = id;
      expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(id);

      return _.CrawlResultService.create(expectedCrawlResultInfo);
    }).then(function (id) {
      crawlResultId = id;

      return _.CrawlResultService.search(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));
    }).then(function (crawlResultInfos) {
      expect(crawlResultInfos.size).toBe(1);

      var crawlResultInfo = crawlResultInfos.first();
      expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no crawl result if provided criteria matches no crawl result', function (done) {
    var result = _.CrawlResultService.searchAll(createCriteria());
    var crawlResults = (0, _immutable.List)();

    result.event.subscribe(function (crawlResult) {
      crawlResults = crawlResults.push(crawlResult);
    });
    result.promise.then(function () {
      result.event.unsubscribeAll();
      expect(crawlResults.size).toBe(0);
      done();
    }).catch(function (error) {
      result.event.unsubscribeAll();
      fail(error);
      done();
    });
  });

  test('should return the crawl results matches the criteria', function (done) {
    var crawlSessionId = void 0;
    var expectedCrawlResultInfo = void 0;

    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      crawlSessionId = id;
      expectedCrawlResultInfo = (0, _CrawlResult.createCrawlResultInfo)(crawlSessionId);

      return Promise.all([_.CrawlResultService.create(expectedCrawlResultInfo), _.CrawlResultService.create(expectedCrawlResultInfo)]);
    }).then(function (ids) {
      var crawlResultIds = _immutable.List.of(ids[0], ids[1]);
      var result = _.CrawlResultService.searchAll(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));
      var crawlResults = (0, _immutable.List)();

      result.event.subscribe(function (crawlResult) {
        crawlResults = crawlResults.push(crawlResult);
      });
      result.promise.then(function () {
        result.event.unsubscribeAll();
        expect(crawlResults.size).toBe(crawlResultIds.size);
        done();
      }).catch(function (error) {
        result.event.unsubscribeAll();
        fail(error);
        done();
      });
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('exists', function () {
  test('should return false if no crawl result match provided criteria', function (done) {
    _.CrawlResultService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any crawl resuult match provided criteria', function (done) {
    var crawlSessionId = void 0;

    _.CrawlSessionService.create((0, _CrawlSession.createCrawlSessionInfo)()).then(function (id) {
      crawlSessionId = id;

      return _.CrawlResultService.create((0, _CrawlResult.createCrawlResultInfo)(id));
    }).then(function () {
      return _.CrawlResultService.exists(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});