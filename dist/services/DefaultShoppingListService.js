'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _schema = require('../schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultShoppingListService = function (_ServiceBase) {
  _inherits(DefaultShoppingListService, _ServiceBase);

  function DefaultShoppingListService() {
    _classCallCheck(this, DefaultShoppingListService);

    return _possibleConstructorReturn(this, (DefaultShoppingListService.__proto__ || Object.getPrototypeOf(DefaultShoppingListService)).call(this, _schema.DefaultShoppingList, DefaultShoppingListService.buildSearchQuery, DefaultShoppingListService.buildIncludeQuery, 'default shopping list'));
  }

  return DefaultShoppingListService;
}(_parseServerCommon.ServiceBase);

DefaultShoppingListService.fields = _immutable.List.of('user', 'shoppingList');

DefaultShoppingListService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'user');
  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'shoppingList');

  return query;
};

DefaultShoppingListService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _parseServerCommon.ParseWrapperService.createQuery(_schema.DefaultShoppingList, criteria);
  var query = DefaultShoppingListService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  DefaultShoppingListService.fields.forEach(function (field) {
    _parseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _parseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'shoppingList', 'shoppingList', _schema.ShoppingList);

  return query;
};

exports.default = DefaultShoppingListService;