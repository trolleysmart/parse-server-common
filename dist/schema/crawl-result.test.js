'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCrawlResultInfo = createCrawlResultInfo;
exports.createCrawlResult = createCrawlResult;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _crawlResult = require('./crawl-result');

var _crawlResult2 = _interopRequireDefault(_crawlResult);

var _crawlSession = require('./crawl-session.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCrawlResultInfo(crawlSessionId) {
  return (0, _immutable.Map)({
    crawlSessionId: crawlSessionId || (0, _crawlSession.createCrawlSession)().getId(),
    resultSet: (0, _immutable.Map)({
      price: (0, _v2.default)()
    })
  });
}

function createCrawlResult(crawlSessionPriceInfo) {
  return _crawlResult2.default.spawn(crawlSessionPriceInfo || createCrawlResultInfo());
}

function expectCrawlResultInfo(crawlSessionPriceInfo, expectedCrawlResultInfo) {
  expect(crawlSessionPriceInfo.get('crawlSession').getId()).toBe(expectedCrawlResultInfo.get('crawlSessionId'));
  expect(crawlSessionPriceInfo.get('crawlSessionId')).toBe(expectedCrawlResultInfo.get('crawlSessionId'));
  expect(crawlSessionPriceInfo.get('resultSet')).toEqual(expectedCrawlResultInfo.get('resultSet'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createCrawlResult().className).toBe('CrawlResult');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var crawlSessionPriceInfo = createCrawlResultInfo();
    var object = createCrawlResult(crawlSessionPriceInfo);
    var info = object.getInfo();

    expectCrawlResultInfo(info, crawlSessionPriceInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = createCrawlResult();

    expect(new _crawlResult2.default(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createCrawlResult();

    expect(new _crawlResult2.default(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createCrawlResult();
    var updatedCrawlResultInfo = createCrawlResultInfo();

    object.updateInfo(updatedCrawlResultInfo);

    var info = object.getInfo();

    expectCrawlResultInfo(info, updatedCrawlResultInfo);
  });

  test('getInfo should return provided info', function () {
    var crawlSessionPriceInfo = createCrawlResultInfo();
    var object = createCrawlResult(crawlSessionPriceInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectCrawlResultInfo(info, crawlSessionPriceInfo);
  });
});