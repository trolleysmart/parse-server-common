'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCrawlSessionInfo = createCrawlSessionInfo;
exports.createCrawlSession = createCrawlSession;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _crawlSession = require('./crawl-session');

var _crawlSession2 = _interopRequireDefault(_crawlSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCrawlSessionInfo() {
  return (0, _immutable.Map)({
    sessionKey: (0, _v2.default)(),
    startDateTime: new Date(),
    endDateTime: new Date(),
    additionalInfo: (0, _immutable.Map)({
      val: (0, _v2.default)()
    })
  });
}

function createCrawlSession(crawlSessionInfo) {
  return _crawlSession2.default.spawn(crawlSessionInfo || createCrawlSessionInfo());
}

function expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo) {
  expect(crawlSessionInfo.get('sessionKey')).toBe(expectedCrawlSessionInfo.get('sessionKey'));
  expect(crawlSessionInfo.get('startDateTime')).toBe(expectedCrawlSessionInfo.get('startDateTime'));
  expect(crawlSessionInfo.get('endDateTime')).toBe(expectedCrawlSessionInfo.get('endDateTime'));
  expect(crawlSessionInfo.get('additionalInfo')).toEqual(expectedCrawlSessionInfo.get('additionalInfo'));
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

    expect(new _crawlSession2.default(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createCrawlSession();

    expect(new _crawlSession2.default(object).getId()).toBe(object.id);
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