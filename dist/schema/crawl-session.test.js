'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _crawlSession = require('./crawl-session');

var _crawlSession2 = _interopRequireDefault(_crawlSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('should set class name', function () {
    expect(_crawlSession2.default.spawn('sessionKey', new Date(), new Date()).className).toBe('CrawlSession');
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _crawlSession2.default.spawn('sessionKey', new Date(), new Date());

    expect(new _crawlSession2.default(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = _crawlSession2.default.spawn('sessionKey', new Date(), new Date());

    expect(new _crawlSession2.default(object).getId()).toBe(object.id);
  });

  test('getSessionKey should return provided session key', function () {
    var expectedValue = (0, _v2.default)();
    var object = _crawlSession2.default.spawn(expectedValue, new Date(), new Date());

    expect(new _crawlSession2.default(object).getSessionKey()).toBe(expectedValue);
  });

  test('getStartDateTime should return provided start date time', function () {
    var expectedValue = new Date();
    var object = _crawlSession2.default.spawn('sessionKey', expectedValue, new Date());

    expect(new _crawlSession2.default(object).getStartDateTime()).toBe(expectedValue);
  });

  test('getEndDateTime should return none if no end date time provided', function () {
    var object = _crawlSession2.default.spawn('sessionKey', new Date());

    expect(new _crawlSession2.default(object).getEndDateTime().isNone()).toBeTruthy();
  });

  test('getEndDateTime should return provided end date time', function () {
    var expectedValue = new Date();
    var object = _crawlSession2.default.spawn('sessionKey', new Date(), expectedValue);

    expect(new _crawlSession2.default(object).getEndDateTime().some()).toBe(expectedValue);
  });

  test('setEndDateTime should set end date time', function () {
    var expectedValue = new Date();
    var object = _crawlSession2.default.spawn('sessionKey', new Date());

    object.setEndDateTime(expectedValue);

    expect(new _crawlSession2.default(object).getEndDateTime().some()).toBe(expectedValue);
  });
});