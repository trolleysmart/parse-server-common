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

var ShoppingListService = function ShoppingListService() {
  _classCallCheck(this, ShoppingListService);
};

ShoppingListService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.ShoppingList.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

ShoppingListService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No shopping list found with Id: ' + id);
      } else {
        resolve(new _schema.ShoppingList(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

ShoppingListService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No shopping list found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.ShoppingList(results[0]);

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

ShoppingListService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No shopping list found with Id: ' + id);
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

ShoppingListService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return ShoppingListService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.ShoppingList(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

ShoppingListService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = ShoppingListService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.ShoppingList(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

ShoppingListService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return ShoppingListService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

ShoppingListService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList, criteria);

  if (criteria.has('includeStapleShoppingList')) {
    var value = criteria.get('includeStapleShoppingList');

    if (value) {
      query.include('stapleShoppingList');
    }
  }

  if (criteria.has('includeMasterProductPrices')) {
    var _value = criteria.get('includeMasterProductPrices');

    if (_value) {
      query.include('masterProductPrices');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('userId')) {
    var _value2 = conditions.get('userId');

    if (_value2) {
      query.equalTo('user', _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(_value2));
    }
  }

  return query;
};

exports.default = ShoppingListService;