'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingListService = function (_ServiceBase) {
  _inherits(ShoppingListService, _ServiceBase);

  function ShoppingListService() {
    _classCallCheck(this, ShoppingListService);

    return _possibleConstructorReturn(this, (ShoppingListService.__proto__ || Object.getPrototypeOf(ShoppingListService)).call(this, _schema.ShoppingList, ShoppingListService.buildSearchQuery, ShoppingListService.buildIncludeQuery, 'shopping list'));
  }

  return ShoppingListService;
}(_microBusinessParseServerCommon.ServiceBase);

ShoppingListService.fields = _immutable.List.of('name', 'user', 'sharedWithUsers');

ShoppingListService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'user');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'sharedWithUsers');

  return query;
};

ShoppingListService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList, criteria);
  var query = ShoppingListService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  ShoppingListService.fields.forEach(function (field) {
    return _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'name');
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'sharedWithUser', 'sharedWithUsers');

  return query;
};

exports.default = ShoppingListService;