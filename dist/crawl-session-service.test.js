'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedCrawlSessionInfo = createCriteriaUsingProvidedCrawlSessionInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _crawlSessionService = require('./crawl-session-service');

var _crawlSession = require('./schema/crawl-session.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId) {
  expect(crawlSessionInfo.get('id')).toBe(crawlSessionId);
  expect(crawlSessionInfo.get('sessionKey')).toBe(expectedCrawlSessionInfo.get('sessionKey'));
  expect(crawlSessionInfo.get('startDateTime').some()).toEqual(expectedCrawlSessionInfo.get('startDateTime').some());
  expect(crawlSessionInfo.get('endDateTime').some()).toEqual(expectedCrawlSessionInfo.get('endDateTime').some());
  expect(crawlSessionInfo.get('additionalInfo').some()).toEqual(expectedCrawlSessionInfo.get('additionalInfo').some());
}

function createCriteria() {
  return (0, _immutable.Map)({
    sessionKey: (0, _v2.default)()
  });
}

function createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo) {
  return (0, _immutable.Map)({
    sessionKey: crawlSessionInfo.get('sessionKey')
  });
}

describe('create', function () {
  test('should return the created crawl session Id', function (done) {
    _crawlSessionService.CrawlSessionService.create((0, _crawlSession.createCrawlSessionInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the crawl session', function (done) {
    var expectedCrawlSessionInfo = (0, _crawlSession.createCrawlSessionInfo)();
    var crawlSessionId = void 0;

    _crawlSessionService.CrawlSessionService.create(expectedCrawlSessionInfo).then(function (id) {
      crawlSessionId = id;

      return _crawlSessionService.CrawlSessionService.read(crawlSessionId);
    }).then(function (crawlSessionInfo) {
      expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided crawl session Id does not exist', function (done) {
    var crawlSessionId = (0, _v2.default)();

    _crawlSessionService.CrawlSessionService.read(crawlSessionId).catch(function (error) {
      expect(error).toBe('No crawl session found with Id: ' + crawlSessionId);
      done();
    });
  });

  test('should read the existing crawl session', function (done) {
    var expectedCrawlSessionInfo = (0, _crawlSession.createCrawlSessionInfo)();
    var crawlSessionId = void 0;

    _crawlSessionService.CrawlSessionService.create(expectedCrawlSessionInfo).then(function (id) {
      crawlSessionId = id;

      return _crawlSessionService.CrawlSessionService.read(crawlSessionId);
    }).then(function (crawlSessionInfo) {
      expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided crawl session Id does not exist', function (done) {
    var crawlSessionId = (0, _v2.default)();

    _crawlSessionService.CrawlSessionService.update((0, _crawlSession.createCrawlSessionInfo)().set('id', crawlSessionId)).catch(function (error) {
      expect(error).toBe('No crawl session found with Id: ' + crawlSessionId);
      done();
    });
  });

  test('should return the Id of the updated crawl session', function (done) {
    var crawlSessionId = void 0;

    _crawlSessionService.CrawlSessionService.create((0, _crawlSession.createCrawlSessionInfo)()).then(function (id) {
      crawlSessionId = id;

      return _crawlSessionService.CrawlSessionService.update((0, _crawlSession.createCrawlSessionInfo)().set('id', crawlSessionId));
    }).then(function (id) {
      expect(id).toBe(crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing crawl session', function (done) {
    var expectedCrawlSessionInfo = (0, _crawlSession.createCrawlSessionInfo)();
    var crawlSessionId = void 0;

    _crawlSessionService.CrawlSessionService.create((0, _crawlSession.createCrawlSessionInfo)()).then(function (id) {
      return _crawlSessionService.CrawlSessionService.update(expectedCrawlSessionInfo.set('id', id));
    }).then(function (id) {
      crawlSessionId = id;

      return _crawlSessionService.CrawlSessionService.read(crawlSessionId);
    }).then(function (crawlSessionInfo) {
      expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided crawl session Id does not exist', function (done) {
    var crawlSessionId = (0, _v2.default)();

    _crawlSessionService.CrawlSessionService.delete(crawlSessionId).catch(function (error) {
      expect(error).toBe('No crawl session found with Id: ' + crawlSessionId);
      done();
    });
  });

  test('should delete the existing crawl session', function (done) {
    var crawlSessionId = void 0;

    _crawlSessionService.CrawlSessionService.create((0, _crawlSession.createCrawlSessionInfo)()).then(function (id) {
      crawlSessionId = id;
      return _crawlSessionService.CrawlSessionService.delete(crawlSessionId);
    }).then(function () {
      return _crawlSessionService.CrawlSessionService.read(crawlSessionId);
    }).catch(function (error) {
      expect(error).toBe('No crawl session found with Id: ' + crawlSessionId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no crawl session if provided criteria matches no crawl session', function (done) {
    _crawlSessionService.CrawlSessionService.search(createCriteria()).then(function (crawlSessionInfos) {
      expect(crawlSessionInfos.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the crawl sessions matches the criteria', function (done) {
    var expectedCrawlSessionInfo = (0, _crawlSession.createCrawlSessionInfo)();
    var crawlSessionId = void 0;

    _crawlSessionService.CrawlSessionService.create(expectedCrawlSessionInfo).then(function (id) {
      crawlSessionId = id;

      return _crawlSessionService.CrawlSessionService.search(createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo));
    }).then(function (crawlSessionInfos) {
      expect(crawlSessionInfos.size).toBe(1);

      var crawlSessionInfo = crawlSessionInfos.first();
      expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the the latest crawl sessions matches the criteria when latest is set', function (done) {
    var expectedCrawlSessionInfo = (0, _crawlSession.createCrawlSessionInfo)();
    var crawlSessionId = void 0;

    _crawlSessionService.CrawlSessionService.create(expectedCrawlSessionInfo).then(function () {
      return _crawlSessionService.CrawlSessionService.create(expectedCrawlSessionInfo);
    }).then(function (id) {
      crawlSessionId = id;

      var criteria = createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo);

      return _crawlSessionService.CrawlSessionService.search(criteria.set('latest', true));
    }).then(function (crawlSessionInfos) {
      expect(crawlSessionInfos.size).toBe(1);

      var crawlSessionInfo = crawlSessionInfos.first();
      expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no crawl session if provided criteria matches no crawl session', function (done) {
    var result = _crawlSessionService.CrawlSessionService.searchAll(createCriteria());
    var crawlSessions = (0, _immutable.List)();

    result.event.subscribe(function (crawlSession) {
      crawlSessions = crawlSessions.push(crawlSession);
    });
    result.promise.then(function () {
      expect(crawlSessions.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the crawl sessions matches the criteria', function (done) {
    var expectedCrawlSessionInfo = (0, _crawlSession.createCrawlSessionInfo)();

    Promise.all([_crawlSessionService.CrawlSessionService.create(expectedCrawlSessionInfo), _crawlSessionService.CrawlSessionService.create(expectedCrawlSessionInfo)]).then(function (ids) {
      var crawlSessionIds = _immutable.List.of(ids[0], ids[1]);
      var result = _crawlSessionService.CrawlSessionService.searchAll(createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo));
      var crawlSessions = (0, _immutable.List)();

      result.event.subscribe(function (crawlSession) {
        crawlSessions = crawlSessions.push(crawlSession);
      });
      result.promise.then(function () {
        expect(crawlSessions.size).toBe(crawlSessionIds.size);
        done();
      }).catch(function (error) {
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
  test('should return false if no crawl session match provided criteria', function (done) {
    _crawlSessionService.CrawlSessionService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any crawl session match provided criteria', function (done) {
    var crawlSessionInfo = (0, _crawlSession.createCrawlSessionInfo)();

    _crawlSessionService.CrawlSessionService.create(crawlSessionInfo).then(function () {
      return _crawlSessionService.CrawlSessionService.exists(createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});