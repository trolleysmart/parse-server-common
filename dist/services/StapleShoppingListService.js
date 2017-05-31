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

var StapleShoppingListService = function StapleShoppingListService() {
  _classCallCheck(this, StapleShoppingListService);
};

StapleShoppingListService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.StapleShoppingList.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple shopping list found with Id: ' + id);
      } else {
        resolve(new _schema.StapleShoppingList(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple shopping list found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.StapleShoppingList(results[0]);

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

StapleShoppingListService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple shopping list found with Id: ' + id);
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

StapleShoppingListService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StapleShoppingListService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.StapleShoppingList(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = StapleShoppingListService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.StapleShoppingList(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

StapleShoppingListService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StapleShoppingListService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList, criteria);

  if (criteria.has('includeTags')) {
    var value = criteria.get('includeTags');

    if (value) {
      query.include('tags');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('userId')) {
    var _value = conditions.get('userId');

    if (_value) {
      query.equalTo('user', _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(_value));
    }
  }

  if (conditions.has('description')) {
    var _value2 = conditions.get('description');

    if (_value2) {
      query.equalTo('lowerCaseDescription', _value2.toLowerCase());
    }
  }

  if (conditions.has('startsWith_description')) {
    var _value3 = conditions.get('startsWith_description');

    if (_value3) {
      query.startsWith('lowerCaseDescription', _value3.toLowerCase());
    }
  }

  if (conditions.has('contains_description')) {
    var _value4 = conditions.get('contains_description');

    if (_value4) {
      query.contains('lowerCaseDescription', _value4.toLowerCase());
    }
  }

  return query;
};

exports.default = StapleShoppingListService;