'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _storeCrawlerConfiguration = require('./store-crawler-configuration');

var _storeCrawlerConfiguration2 = _interopRequireDefault(_storeCrawlerConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('should set class name', function () {
    expect(_storeCrawlerConfiguration2.default.spawn('key', 'config').className).toBe('StoreCrawlerConfiguration');
  });
});

describe('static public methods', function () {
  test('spawn should set provided key', function () {
    var expectedValue = (0, _v2.default)();

    expect(_storeCrawlerConfiguration2.default.spawn(expectedValue, 'config').get('key')).toBe(expectedValue);
  });

  test('spawn should set provided config', function () {
    var expectedValue = (0, _v2.default)();

    expect(_storeCrawlerConfiguration2.default.spawn('key', expectedValue).get('config')).toBe(expectedValue);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _storeCrawlerConfiguration2.default.spawn('key', 'config');

    expect(new _storeCrawlerConfiguration2.default(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = _storeCrawlerConfiguration2.default.spawn('key', 'config');

    expect(new _storeCrawlerConfiguration2.default(object).getId()).toBe(object.id);
  });

  test('getKey should return provided key', function () {
    var expectedValue = (0, _v2.default)();
    var object = _storeCrawlerConfiguration2.default.spawn(expectedValue, 'config');

    expect(new _storeCrawlerConfiguration2.default(object).getKey()).toBe(expectedValue);
  });

  test('getConfig should return provided config', function () {
    var expectedValue = {
      val: (0, _v2.default)()
    };
    var object = _storeCrawlerConfiguration2.default.spawn('key', expectedValue);

    expect(new _storeCrawlerConfiguration2.default(object).getConfig()).toBe(expectedValue);
  });
});