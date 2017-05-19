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

var StoreCrawlerConfigurationService = function StoreCrawlerConfigurationService() {
  _classCallCheck(this, StoreCrawlerConfigurationService);
};

StoreCrawlerConfigurationService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.StoreCrawlerConfiguration.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StoreCrawlerConfigurationService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreCrawlerConfiguration).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No store crawler configuration found with Id: ' + id);
      } else {
        resolve(new _schema.StoreCrawlerConfiguration(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StoreCrawlerConfigurationService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreCrawlerConfiguration).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No store crawler configuration found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.StoreCrawlerConfiguration(results[0]);

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

StoreCrawlerConfigurationService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreCrawlerConfiguration).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No store crawler configuration found with Id: ' + id);
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

StoreCrawlerConfigurationService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StoreCrawlerConfigurationService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.StoreCrawlerConfiguration(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StoreCrawlerConfigurationService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = StoreCrawlerConfigurationService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.StoreCrawlerConfiguration(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

StoreCrawlerConfigurationService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StoreCrawlerConfigurationService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StoreCrawlerConfigurationService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreCrawlerConfiguration, criteria);
  var conditions = criteria.get('conditions');

  if (conditions.has('key')) {
    var value = conditions.get('key');

    if (value) {
      query.equalTo('key', value);
    }
  }

  return query;
};

exports.default = StoreCrawlerConfigurationService;