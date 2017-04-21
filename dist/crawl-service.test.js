'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _crawlService = require('./crawl-service');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getStoreCrawlerConfig', function () {
  test('should return config for the provided key', function (done) {
    var key = (0, _v2.default)();
    var expectedValue = _immutable2.default.fromJS({
      val: (0, _v2.default)()
    });

    return _schema.StoreCrawlerConfiguration.spawn(key, expectedValue).save().then(function () {
      _crawlService.CrawlService.getStoreCrawlerConfig(key).then(function (result) {
        expect(result).toEqual(expectedValue);
        done();
      });
    });
  });

  test('should reject if key does not exists', function () {
    var key = (0, _v2.default)();

    return _crawlService.CrawlService.getStoreCrawlerConfig(key).catch(function (error) {
      expect(error).toBe('No store crawler config found for key: ' + key);
    });
  });
});

describe('createNewCrawlSession', function () {
  test('should return the Id of the created session', function () {
    return _crawlService.CrawlService.createNewCrawlSession((0, _v2.default)(), new Date()).then(function (result) {
      return expect(result).toBeDefined();
    });
  });

  test('should return the created session info', function (done) {
    var expectedSessionKey = (0, _v2.default)();
    var expectedStartDateTime = new Date();

    return _crawlService.CrawlService.createNewCrawlSession(expectedSessionKey, expectedStartDateTime).then(function (id) {
      _crawlService.CrawlService.getExistingCrawlSessionInfo(id).then(function (sessionInfo) {
        expect(sessionInfo.get('sessionKey')).toEqual(expectedSessionKey);
        expect(sessionInfo.get('startDateTime')).toEqual(expectedStartDateTime);
        expect(sessionInfo.get('endDateTime').isNone()).toBeTruthy();
        expect(sessionInfo.get('additionalInfo').isNone()).toBeTruthy();

        done();
      });
    });
  });
});