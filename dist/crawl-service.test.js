'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _crawlService = require('./crawl-service');

var _crawlService2 = _interopRequireDefault(_crawlService);

var _storeCrawlerConfiguration = require('./schema/store-crawler-configuration');

var _storeCrawlerConfiguration2 = _interopRequireDefault(_storeCrawlerConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getStoreCrawlerConfig', function () {
  test('should return config for the provided key', function (done) {
    var key = (0, _v2.default)();
    var expectedValue = {
      val: (0, _v2.default)()
    };

    return _storeCrawlerConfiguration2.default.spawn(key, expectedValue).save().then(function () {
      _crawlService2.default.getStoreCrawlerConfig(key).then(function (result) {
        expect(result).toEqual(expectedValue);
        done();
      });
    });
  });

  test('should reject if key does not exists', function () {
    var key = (0, _v2.default)();

    return _crawlService2.default.getStoreCrawlerConfig(key).catch(function (error) {
      expect(error).toBe('No store crawler config found for key: ' + key);
    });
  });

  test('should reject if multiple key exist', function (done) {
    var key = (0, _v2.default)();

    return Promise.all([_storeCrawlerConfiguration2.default.spawn(key, {}).save(), _storeCrawlerConfiguration2.default.spawn(key, {}).save()]).then(function () {
      _crawlService2.default.getStoreCrawlerConfig(key).catch(function (error) {
        expect(error).toBe('Multiple store crawler config found for key: ' + key);
        done();
      });
    });
  });
});