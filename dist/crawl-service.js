'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _microBusinessParseServerCommon2 = _interopRequireDefault(_microBusinessParseServerCommon);

var _crawlSession = require('./schema/crawl-session');

var _crawlSession2 = _interopRequireDefault(_crawlSession);

var _storeCrawlerConfiguration = require('./schema/store-crawler-configuration');

var _storeCrawlerConfiguration2 = _interopRequireDefault(_storeCrawlerConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrawlService = function () {
  function CrawlService() {
    _classCallCheck(this, CrawlService);
  }

  _createClass(CrawlService, null, [{
    key: 'getStoreCrawlerConfig',
    value: function getStoreCrawlerConfig(key) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon2.default.ParseWrapperService.createQuery(_storeCrawlerConfiguration2.default);

        query.equalTo('key', key);

        return query.find().then(function (results) {
          if (results.length === 0) {
            reject('No store crawler config found for key: ' + key);
          } else if (results.length !== 1) {
            reject('Multiple store crawler config found for key: ' + key);
          } else {
            resolve(new _storeCrawlerConfiguration2.default(results[0]).getConfig());
          }
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'createNewCrawlSession',
    value: function createNewCrawlSession(sessionKey, startDateTime) {
      return new Promise(function (resolve, reject) {
        _crawlSession2.default.spawn(sessionKey, startDateTime).save().then(function (result) {
          return resolve(result.id);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'updateCrawlSession',
    value: function updateCrawlSession(id, endDateTime, additionalInfo) {
      return new Promise(function (resolve, reject) {
        CrawlService.getExistingCrawlSession(id).then(function (crawlSession) {
          crawlSession.setEndDateTime(endDateTime);
          crawlSession.setAdditionalInfo(additionalInfo);

          return crawlSession.saveObject();
        }).then(function (crawSession) {
          return resolve(new _crawlSession2.default(crawSession).getId());
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getExistingCrawlSessionInfo',
    value: function getExistingCrawlSessionInfo(id) {
      return new Promise(function (resolve, reject) {
        CrawlService.getExistingCrawlSession(id).then(function (crawlSession) {
          resolve(CrawlService.mapCrawlSessionToResponseFormat(crawlSession));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getMostRecentCrawlSessionInfo',
    value: function getMostRecentCrawlSessionInfo(key) {
      return new Promise(function (resolve, reject) {
        CrawlService.getMostRecentCrawlSession(key).then(function (crawlSession) {
          resolve(CrawlService.mapCrawlSessionToResponseFormat(crawlSession));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getExistingCrawlSession',
    value: function getExistingCrawlSession(id) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon2.default.ParseWrapperService.createQuery(_crawlSession2.default);

        query.equalTo('objectId', id);

        return query.find().then(function (results) {
          if (results.length === 0) {
            reject('No session found for Id: ' + id);
          } else {
            resolve(new _crawlSession2.default(results[0]));
          }
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'getMostRecentCrawlSession',
    value: function getMostRecentCrawlSession(key) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon2.default.ParseWrapperService.createQuery(_crawlSession2.default);

        query.equalTo('key', key);
        query.descending('startDateTime');
        query.limit(1);

        return query.find().then(function (results) {
          if (results.length === 0) {
            reject('No session found for session key: ' + key);
          } else {
            resolve(new _crawlSession2.default(results[0]));
          }
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'mapCrawlSessionToResponseFormat',
    value: function mapCrawlSessionToResponseFormat(crawlSession) {
      return (0, _immutable.Map)({
        id: crawlSession.getId(),
        sessionKey: crawlSession.getSessionKey(),
        startDateTime: crawlSession.getStartDateTime(),
        endDateTime: crawlSession.getEndDateTime(),
        additionalInfo: crawlSession.getAdditionalInfo()
      });
    }
  }]);

  return CrawlService;
}();

exports.default = CrawlService;