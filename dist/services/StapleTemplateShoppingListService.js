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

var StapleTemplateShoppingListService = function StapleTemplateShoppingListService() {
  _classCallCheck(this, StapleTemplateShoppingListService);
};

StapleTemplateShoppingListService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.StapleTemplateShoppingList.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleTemplateShoppingListService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple template shopping list found with Id: ' + id);
      } else {
        resolve(new _schema.StapleTemplateShoppingList(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleTemplateShoppingListService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple template shopping list found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.StapleTemplateShoppingList(results[0]);

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

StapleTemplateShoppingListService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple template shopping list found with Id: ' + id);
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

StapleTemplateShoppingListService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StapleTemplateShoppingListService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.StapleTemplateShoppingList(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleTemplateShoppingListService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = StapleTemplateShoppingListService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.StapleTemplateShoppingList(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

StapleTemplateShoppingListService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StapleTemplateShoppingListService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleTemplateShoppingListService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList, criteria);

  if (criteria.has('includeStapleTemplates')) {
    var value = criteria.get('includeStapleTemplates');

    if (value) {
      query.include('stapleTemplates');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('description')) {
    var _value = conditions.get('description');

    if (_value) {
      query.equalTo('description', _value);
    }
  }

  if (conditions.has('startsWith_description')) {
    var _value2 = conditions.get('startsWith_description');

    if (_value2) {
      query.startsWith('description', _value2);
    }
  }

  if (conditions.has('contains_description')) {
    var _value3 = conditions.get('contains_description');

    if (_value3) {
      query.contains('description', _value3);
    }
  }

  if (conditions.has('stapleTemplate')) {
    var _value4 = conditions.get('stapleTemplate');

    if (_value4) {
      query.equalTo('stapleTemplates', _value4);
    }
  }

  if (conditions.has('stapleTemplates')) {
    var _value5 = conditions.get('stapleTemplates');

    if (_value5) {
      query.containedIn('stapleTemplates', _value5.toArray());
    }
  }

  if (conditions.has('stapleTemplateId')) {
    var _value6 = conditions.get('stapleTemplateId');

    if (_value6) {
      query.equalTo('stapleTemplates', _schema.StapleTemplate.createWithoutData(_value6));
    }
  }

  if (conditions.has('stapleTemplateIds')) {
    var _value7 = conditions.get('stapleTemplateIds');

    if (_value7) {
      query.containedIn('stapleTemplates', _value7.map(function (stapleTemplateId) {
        return _schema.StapleTemplate.createWithoutData(stapleTemplateId);
      }).toArray());
    }
  }

  return query;
};

exports.default = StapleTemplateShoppingListService;