'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StapleTemplateShoppingListService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _newSearchResultReceivedEvent = require('./new-search-result-received-event');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StapleTemplateShoppingListService = function () {
  function StapleTemplateShoppingListService() {
    _classCallCheck(this, StapleTemplateShoppingListService);
  }

  _createClass(StapleTemplateShoppingListService, null, [{
    key: 'create',
    value: function create(info) {
      return new Promise(function (resolve, reject) {
        _schema.StapleTemplateShoppingList.spawn(info).save().then(function (result) {
          return resolve(result.id);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'read',
    value: function read(id) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList);

        query.equalTo('objectId', id);
        query.limit(1);

        query.find().then(function (results) {
          if (results.length === 0) {
            reject('No staple template shopping list found with Id: ' + id);
          } else {
            resolve(new _schema.StapleTemplateShoppingList(results[0]).getInfo());
          }
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'update',
    value: function update(info) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList);

        query.equalTo('objectId', info.get('id'));
        query.limit(1);

        query.find().then(function (results) {
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
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList);

        query.equalTo('objectId', id);
        query.limit(1);

        query.find().then(function (results) {
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
    }
  }, {
    key: 'search',
    value: function search(criteria) {
      return new Promise(function (resolve, reject) {
        return StapleTemplateShoppingListService.buildSearchQuery(criteria).find().then(function (results) {
          return resolve(_immutable2.default.fromJS(results).map(function (_) {
            return new _schema.StapleTemplateShoppingList(_).getInfo();
          }));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'searchAll',
    value: function searchAll(criteria) {
      var event = new _newSearchResultReceivedEvent.NewSearchResultReceivedEvent();
      var promise = StapleTemplateShoppingListService.buildSearchQuery(criteria).each(function (_) {
        return event.raise(new _schema.StapleTemplateShoppingList(_).getInfo());
      });

      return {
        event: event,
        promise: promise
      };
    }
  }, {
    key: 'exists',
    value: function exists(criteria) {
      return new Promise(function (resolve, reject) {
        return StapleTemplateShoppingListService.buildSearchQuery(criteria).count().then(function (total) {
          return resolve(total > 0);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'buildSearchQuery',
    value: function buildSearchQuery(criteria) {
      var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList);

      if (criteria.has('description') && criteria.get('description')) {
        query.equalTo('description', criteria.get('description'));
      }

      if (criteria.has('templateId') && criteria.get('templateId')) {
        query.equalTo('templates', criteria.get('templateId'));
      }

      return query;
    }
  }]);

  return StapleTemplateShoppingListService;
}();

exports.StapleTemplateShoppingListService = StapleTemplateShoppingListService;
exports.default = StapleTemplateShoppingListService;