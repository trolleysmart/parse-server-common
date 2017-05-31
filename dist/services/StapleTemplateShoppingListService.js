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

  if (criteria.has('includeTags')) {
    var _value = criteria.get('includeTags');

    if (_value) {
      query.include('tags');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('description')) {
    var _value2 = conditions.get('description');

    if (_value2) {
      query.equalTo('description', _value2);
    }
  }

  if (conditions.has('description')) {
    var _value3 = conditions.get('description');

    if (_value3) {
      query.equalTo('lowerCaseDescription', _value3.toLowerCase());
    }
  }

  if (conditions.has('startsWith_description')) {
    var _value4 = conditions.get('startsWith_description');

    if (_value4) {
      query.startsWith('lowerCaseDescription', _value4.toLowerCase());
    }
  }

  if (conditions.has('contains_description')) {
    var _value5 = conditions.get('contains_description');

    if (_value5) {
      query.contains('lowerCaseDescription', _value5.toLowerCase());
    }
  }

  if (conditions.has('stapleTemplate')) {
    var _value6 = conditions.get('stapleTemplate');

    if (_value6) {
      query.equalTo('stapleTemplates', _value6);
    }
  }

  if (conditions.has('stapleTemplates')) {
    var _value7 = conditions.get('stapleTemplates');

    if (_value7) {
      query.containedIn('stapleTemplates', _value7.toArray());
    }
  }

  if (conditions.has('stapleTemplateId')) {
    var _value8 = conditions.get('stapleTemplateId');

    if (_value8) {
      query.equalTo('stapleTemplates', _schema.StapleTemplate.createWithoutData(_value8));
    }
  }

  if (conditions.has('stapleTemplateIds')) {
    var _value9 = conditions.get('stapleTemplateIds');

    if (_value9) {
      query.containedIn('stapleTemplates', _value9.map(function (stapleTemplateId) {
        return _schema.StapleTemplate.createWithoutData(stapleTemplateId);
      }).toArray());
    }
  }

  return query;
};

exports.default = StapleTemplateShoppingListService;