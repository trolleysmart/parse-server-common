'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _crawlSession = require('./crawl-session');

var _crawlResult = require('./crawl-result');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCrawlSession() {
  return _crawlSession.CrawlSession.spawn('sessionKey', new Date());
}

describe('constructor', function () {
  test('should set class name', function () {
    var crawlSession = createCrawlSession();

    expect(_crawlResult.CrawlResult.spawn(crawlSession.getId(), {}).className).toBe('CrawlResult');
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var crawlSession = createCrawlSession();
    var object = _crawlResult.CrawlResult.spawn(crawlSession.getId(), {});

    expect(new _crawlSession.CrawlSession(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var crawlSession = createCrawlSession();
    var object = _crawlResult.CrawlResult.spawn(crawlSession.getId(), {});

    expect(new _crawlSession.CrawlSession(object).getId()).toBe(object.id);
  });

  test('getCrawlSession should return provided crawl session', function () {
    var crawlSession = createCrawlSession();
    var object = _crawlResult.CrawlResult.spawn(crawlSession.getId(), {});

    expect(new _crawlResult.CrawlResult(object).getCrawlSession().getId()).toBe(crawlSession.getId());
  });

  test('getResultSet should return provided result', function () {
    var expectedValue = _immutable2.default.fromJS([(0, _v2.default)(), (0, _v2.default)()]);
    var crawlSession = createCrawlSession();
    var object = _crawlResult.CrawlResult.spawn(crawlSession.getId(), expectedValue);

    expect(new _crawlResult.CrawlResult(object).getResultSet()).toBe(expectedValue);
  });
});