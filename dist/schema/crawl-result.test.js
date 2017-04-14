'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _crawlSession = require('./crawl-session');

var _crawlSession2 = _interopRequireDefault(_crawlSession);

var _crawlResult = require('./crawl-result');

var _crawlResult2 = _interopRequireDefault(_crawlResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCrawlSession() {
  return _crawlSession2.default.spawn('sessionKey', new Date());
}

describe('constructor', function () {
  test('should set class name', function () {
    var crawlSession = createCrawlSession();

    expect(_crawlResult2.default.spawn(crawlSession.getId(), {}).className).toBe('CrawlResult');
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var crawlSession = createCrawlSession();
    var object = _crawlResult2.default.spawn(crawlSession.getId(), {});

    expect(new _crawlSession2.default(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var crawlSession = createCrawlSession();
    var object = _crawlResult2.default.spawn(crawlSession.getId(), {});

    expect(new _crawlSession2.default(object).getId()).toBe(object.id);
  });

  test('getCrawlSession should return provided crawl session', function () {
    var crawlSession = createCrawlSession();
    var object = _crawlResult2.default.spawn(crawlSession.getId(), {});

    expect(new _crawlResult2.default(object).getCrawlSession().getId()).toBe(crawlSession.getId());
  });

  test('getResultSet should return provided result', function () {
    var expectedValue = [(0, _v2.default)(), (0, _v2.default)()];
    var crawlSession = createCrawlSession();
    var object = _crawlResult2.default.spawn(crawlSession.getId(), expectedValue);

    expect(new _crawlResult2.default(object).getResultSet()).toBe(expectedValue);
  });
});