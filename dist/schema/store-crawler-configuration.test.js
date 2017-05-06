'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo;
exports.createStoreCrawlerConfiguration = createStoreCrawlerConfiguration;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _storeCrawlerConfiguration = require('./store-crawler-configuration');

var _storeCrawlerConfiguration2 = _interopRequireDefault(_storeCrawlerConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStoreCrawlerConfigurationInfo() {
  return (0, _immutable.Map)({
    key: (0, _v2.default)(),
    config: (0, _immutable.Map)({
      val: (0, _v2.default)()
    })
  });
}

function createStoreCrawlerConfiguration(storeCrawlerConfigurationInfo) {
  return _storeCrawlerConfiguration2.default.spawn(storeCrawlerConfigurationInfo || createStoreCrawlerConfigurationInfo());
}

function expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo) {
  expect(storeCrawlerConfigurationInfo.get('key')).toEqual(expectedStoreCrawlerConfigurationInfo.get('key'));
  expect(storeCrawlerConfigurationInfo.get('config')).toEqual(expectedStoreCrawlerConfigurationInfo.get('config'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createStoreCrawlerConfiguration().className).toBe('StoreCrawlerConfiguration');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var storeCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    var object = createStoreCrawlerConfiguration(storeCrawlerConfigurationInfo);
    var info = object.getInfo();

    expectStoreCrawlerConfigurationInfo(info, storeCrawlerConfigurationInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _storeCrawlerConfiguration2.default.spawn(createStoreCrawlerConfigurationInfo());

    expect(new _storeCrawlerConfiguration2.default(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createStoreCrawlerConfiguration();

    expect(new _storeCrawlerConfiguration2.default(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createStoreCrawlerConfiguration();
    var updatedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();

    object.updateInfo(updatedStoreCrawlerConfigurationInfo);

    var info = object.getInfo();

    expectStoreCrawlerConfigurationInfo(info, updatedStoreCrawlerConfigurationInfo);
  });

  test('getInfo should return provided info', function () {
    var storeCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    var object = createStoreCrawlerConfiguration(storeCrawlerConfigurationInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreCrawlerConfigurationInfo(info, storeCrawlerConfigurationInfo);
  });
});