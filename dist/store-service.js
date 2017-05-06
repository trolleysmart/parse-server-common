'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _newSearchResultReceivedEvent = require('./new-search-result-received-event');

var _newSearchResultReceivedEvent2 = _interopRequireDefault(_newSearchResultReceivedEvent);

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoreService = function StoreService() {
  _classCallCheck(this, StoreService);
};

StoreService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.Store.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StoreService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No store found with Id: ' + id);
      } else {
        resolve(new _schema.Store(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StoreService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No store found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.Store(results[0]);

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

StoreService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No store found with Id: ' + id);
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

StoreService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StoreService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.Store(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StoreService.searchAll = function (criteria) {
  var event = new _newSearchResultReceivedEvent2.default();
  var promise = StoreService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.Store(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

StoreService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StoreService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StoreService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store, criteria);

  if (!criteria.has('conditions')) {
    return _microBusinessParseServerCommon.ParseWrapperService.createQueryIncludingObjectIds(_schema.Store, query, criteria);
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('name')) {
    var value = conditions.get('name');

    if (value) {
      query.equalTo('name', value);
    }
  }

  if (conditions.has('startsWith_name')) {
    var _value = conditions.get('startsWith_name');

    if (_value) {
      query.startsWith('name', _value);
    }
  }

  if (conditions.has('contains_name')) {
    var _value2 = conditions.get('contains_name');

    if (_value2) {
      query.contains('name', _value2);
    }
  }

  return _microBusinessParseServerCommon.ParseWrapperService.createQueryIncludingObjectIds(_schema.Store, query, criteria);
};

exports.default = StoreService;