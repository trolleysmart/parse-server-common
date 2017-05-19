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

var StapleTemplateService = function StapleTemplateService() {
  _classCallCheck(this, StapleTemplateService);
};

StapleTemplateService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.StapleTemplate.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleTemplateService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplate).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple template found with Id: ' + id);
      } else {
        resolve(new _schema.StapleTemplate(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleTemplateService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplate).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple template found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.StapleTemplate(results[0]);

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

StapleTemplateService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplate).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple template found with Id: ' + id);
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

StapleTemplateService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StapleTemplateService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.StapleTemplate(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleTemplateService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = StapleTemplateService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.StapleTemplate(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

StapleTemplateService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StapleTemplateService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleTemplateService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplate, criteria);

  if (!criteria.has('conditions')) {
    return query;
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

  return query;
};

exports.default = StapleTemplateService;