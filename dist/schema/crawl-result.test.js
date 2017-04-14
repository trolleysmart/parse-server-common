'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _crawlSession = require('./crawl-session');

var _crawlSession2 = _interopRequireDefault(_crawlSession);

var _crawlResult = require('./crawl-result');

var _crawlResult2 = _interopRequireDefault(_crawlResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('should set class name', function () {
    var crawlSession = _crawlSession2.default.spawn();

    expect(_crawlResult2.default.spawn(crawlSession, {}).className).toBe('CrawlResult');
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var crawlSession = _crawlSession2.default.spawn();
    var object = _crawlResult2.default.spawn(crawlSession, {});

    expect(new _crawlSession2.default(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var crawlSession = _crawlSession2.default.spawn();
    var object = _crawlResult2.default.spawn(crawlSession, {});

    expect(new _crawlSession2.default(object).getId()).toBe(object.id);
  });

  test('getCrawlSession should return provided crawl session', function () {
    var crawlSession = _crawlSession2.default.spawn();
    var object = _crawlResult2.default.spawn(crawlSession, {});

    expect(new _crawlResult2.default(object).getCrawlSession().getId()).toBe(crawlSession.getId());
  });

  test('getResult should return provided result', function () {
    var expectedValue = {
      val: (0, _v2.default)()
    };
    var crawlSession = _crawlSession2.default.spawn();
    var object = _crawlResult2.default.spawn(crawlSession, expectedValue);

    expect(new _crawlResult2.default(object).getResult()).toBe(expectedValue);
  });
});