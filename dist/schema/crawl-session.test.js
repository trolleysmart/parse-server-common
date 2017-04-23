'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCrawlSessionInfo = createCrawlSessionInfo;
exports.createCrawlSession = createCrawlSession;

var _immutable = require('immutable');

var _monet = require('monet');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _crawlSession = require('./crawl-session');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCrawlSessionInfo() {
  return (0, _immutable.Map)({
    sessionKey: (0, _v2.default)(),
    startDateTime: _monet.Maybe.Some(new Date()),
    endDateTime: _monet.Maybe.Some(new Date()),
    additionalInfo: _monet.Maybe.Some((0, _immutable.Map)({
      val: (0, _v2.default)()
    }))
  });
}

function createCrawlSession(crawlSessionInfo) {
  return _crawlSession.CrawlSession.spawn(crawlSessionInfo || createCrawlSessionInfo());
}

function expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo) {
  expect(crawlSessionInfo.get('sessionKey')).toBe(expectedCrawlSessionInfo.get('sessionKey'));
  expect(crawlSessionInfo.get('startDateTime').some()).toBe(expectedCrawlSessionInfo.get('startDateTime').some());
  expect(crawlSessionInfo.get('endDateTime').some()).toBe(expectedCrawlSessionInfo.get('endDateTime').some());
  expect(crawlSessionInfo.get('additionalInfo').some()).toEqual(expectedCrawlSessionInfo.get('additionalInfo').some());
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createCrawlSession().className).toBe('CrawlSession');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var crawlSessionInfo = createCrawlSessionInfo();
    var object = createCrawlSession(crawlSessionInfo);
    var info = object.getInfo();

    expectCrawlSessionInfo(info, crawlSessionInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = createCrawlSession();

    expect(new _crawlSession.CrawlSession(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createCrawlSession();

    expect(new _crawlSession.CrawlSession(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createCrawlSession();
    var updatedCrawlSessionInfo = createCrawlSessionInfo();

    object.updateInfo(updatedCrawlSessionInfo);

    var info = object.getInfo();

    expectCrawlSessionInfo(info, updatedCrawlSessionInfo);
  });

  test('getInfo should return provided info', function () {
    var crawlSessionInfo = createCrawlSessionInfo();
    var object = createCrawlSession(crawlSessionInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectCrawlSessionInfo(info, crawlSessionInfo);
  });
});