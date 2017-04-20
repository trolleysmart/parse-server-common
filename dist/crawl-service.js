'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrawlService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('./schema');

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
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreCrawlerConfiguration);

        query.equalTo('key', key);
        query.descending('createdAt');
        query.limit(1);

        return query.find().then(function (results) {
          if (results.length === 0) {
            reject('No store crawler config found for key: ' + key);
          } else {
            resolve(new _schema.StoreCrawlerConfiguration(results[0]).getConfig());
          }
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'setStoreCrawlerConfig',
    value: function setStoreCrawlerConfig(key, config) {
      return new Promise(function (resolve, reject) {
        _schema.StoreCrawlerConfiguration.spawn(key, config).save().then(function (result) {
          return resolve(result.id);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'createNewCrawlSession',
    value: function createNewCrawlSession(sessionKey, startDateTime) {
      return new Promise(function (resolve, reject) {
        _schema.CrawlSession.spawn(sessionKey, startDateTime).save().then(function (result) {
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
          return resolve(new _schema.CrawlSession(crawSession).getId());
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
    value: function getMostRecentCrawlSessionInfo(sessionKey) {
      return new Promise(function (resolve, reject) {
        CrawlService.getMostRecentCrawlSession(sessionKey).then(function (crawlSession) {
          resolve(CrawlService.mapCrawlSessionToResponseFormat(crawlSession));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'addResultSet',
    value: function addResultSet(sessionId, resultSet) {
      return new Promise(function (resolve, reject) {
        _schema.CrawlResult.spawn(sessionId, resultSet).save().then(function (object) {
          return resolve(new _schema.CrawlResult(object).getId());
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getResultSets',
    value: function getResultSets(sessionId) {
      var eventEmitter = new _events2.default();
      var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlResult);

      query.equalTo('crawlSession', _schema.CrawlSession.createWithoutData(sessionId));

      var promise = query.each(function (resultSets) {
        return eventEmitter.emit('newResultSets', _immutable2.default.fromJS(resultSets));
      });

      return {
        eventEmitter: eventEmitter,
        promise: promise
      };
    }
  }, {
    key: 'getExistingCrawlSession',
    value: function getExistingCrawlSession(id) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession);

        query.equalTo('objectId', id);

        return query.find().then(function (results) {
          if (results.length === 0) {
            reject('No session found for Id: ' + id);
          } else {
            resolve(new _schema.CrawlSession(results[0]));
          }
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getMostRecentCrawlSession',
    value: function getMostRecentCrawlSession(sessionKey) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession);

        query.equalTo('sessionKey', sessionKey);
        query.descending('startDateTime');
        query.limit(1);

        return query.find().then(function (results) {
          if (results.length === 0) {
            reject('No session found for session key: ' + sessionKey);
          } else {
            resolve(new _schema.CrawlSession(results[0]));
          }
        }).catch(function (error) {
          return reject(error);
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

exports.CrawlService = CrawlService;
exports.default = CrawlService;