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

var TagService = function TagService() {
  _classCallCheck(this, TagService);
};

TagService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.Tag.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

TagService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Tag).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No tag found with Id: ' + id);
      } else {
        resolve(new _schema.Tag(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

TagService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Tag).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No tag found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.Tag(results[0]);

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

TagService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Tag).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No tag found with Id: ' + id);
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

TagService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return TagService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.Tag(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

TagService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = TagService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.Tag(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

TagService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return TagService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

TagService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Tag, criteria);
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

  if (conditions.has('weight')) {
    var _value3 = conditions.get('weight');

    if (_value3) {
      query.equalTo('weight', _value3);
    }
  }

  return query;
};

exports.default = TagService;