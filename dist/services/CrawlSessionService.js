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

var CrawlSessionService = function CrawlSessionService() {
  _classCallCheck(this, CrawlSessionService);
};

CrawlSessionService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.CrawlSession.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlSessionService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No crawl session found with Id: ' + id);
      } else {
        resolve(new _schema.CrawlSession(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlSessionService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No crawl session found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.CrawlSession(results[0]);

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

CrawlSessionService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No crawl session found with Id: ' + id);
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

CrawlSessionService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return CrawlSessionService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.CrawlSession(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlSessionService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = CrawlSessionService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.CrawlSession(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

CrawlSessionService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return CrawlSessionService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

CrawlSessionService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession, criteria);
  var conditions = criteria.get('conditions');

  if (conditions.has('sessionKey')) {
    var value = conditions.get('sessionKey');

    if (value) {
      query.equalTo('sessionKey', value);
    }
  }

  if (conditions.has('startsWith_sessionKey')) {
    var _value = conditions.get('startsWith_sessionKey');

    if (_value) {
      query.startsWith('sessionKey', _value);
    }
  }

  if (conditions.has('contains_sessionKey')) {
    var _value2 = conditions.get('contains_sessionKey');

    if (_value2) {
      query.contains('sessionKey', _value2);
    }
  }

  if (conditions.has('startDateTime')) {
    var _value3 = conditions.get('startDateTime');

    if (_value3) {
      query.equalTo('startDateTime', _value3);
    }
  }

  if (conditions.has('lessThanOrEqualTo_startDateTime')) {
    var _value4 = conditions.get('lessThanOrEqualTo_startDateTime');

    if (_value4) {
      query.lessThanOrEqualTo('startDateTime', _value4);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_startDateTime')) {
    var _value5 = conditions.get('greaterThanOrEqualTo_startDateTime');

    if (_value5) {
      query.greaterThanOrEqualTo('startDateTime', _value5);
    }
  }

  if (conditions.has('endDateTime')) {
    var _value6 = conditions.get('endDateTime');

    if (_value6) {
      query.equalTo('endDateTime', _value6);
    }
  }

  if (conditions.has('lessThanOrEqualTo_endDateTime')) {
    var _value7 = conditions.get('lessThanOrEqualTo_endDateTime');

    if (_value7) {
      query.lessThanOrEqualTo('endDateTime', _value7);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_endDateTime')) {
    var _value8 = conditions.get('greaterThanOrEqualTo_endDateTime');

    if (_value8) {
      query.greaterThanOrEqualTo('endDateTime', _value8);
    }
  }

  return query;
};

exports.default = CrawlSessionService;