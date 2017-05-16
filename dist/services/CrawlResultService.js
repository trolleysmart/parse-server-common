'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _NewSearchResultReceivedEvent = require('./NewSearchResultReceivedEvent');

var _NewSearchResultReceivedEvent2 = _interopRequireDefault(_NewSearchResultReceivedEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrawlResultService = function CrawlResultService() {
  _classCallCheck(this, CrawlResultService);
};

CrawlResultService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.CrawlResult.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlResultService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlResult).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No crawl result found with Id: ' + id);
      } else {
        resolve(new _schema.CrawlResult(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlResultService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlResult).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No crawl result found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.CrawlResult(results[0]);

        object.updateInfo(info).saveObject().then(function () {
          return resolve(object.getId());
        }).catch(function (error) {
          return reject(error);
        });
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlResultService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlResult).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No crawl result found with Id: ' + id);
      } else {
        results[0].destroy().then(function () {
          return resolve();
        }).catch(function (error) {
          return reject(error);
        });
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlResultService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return CrawlResultService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.CrawlResult(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlResultService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = CrawlResultService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.CrawlResult(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

CrawlResultService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return CrawlResultService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlResultService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlResult, criteria);

  if (!criteria.has('conditions')) {
    return _microBusinessParseServerCommon.ParseWrapperService.createQueryIncludingObjectIds(_schema.CrawlResult, query, criteria);
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('crawlSessionId')) {
    var value = conditions.get('crawlSessionId');

    if (value) {
      query.equalTo('crawlSession', _schema.CrawlSession.createWithoutData(value));
    }
  }

  return _microBusinessParseServerCommon.ParseWrapperService.createQueryIncludingObjectIds(_schema.CrawlResult, query, criteria);
};

exports.default = CrawlResultService;