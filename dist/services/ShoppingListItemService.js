'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingListItemService = function (_ServiceBase) {
  _inherits(ShoppingListItemService, _ServiceBase);

  function ShoppingListItemService() {
    _classCallCheck(this, ShoppingListItemService);

    return _possibleConstructorReturn(this, (ShoppingListItemService.__proto__ || Object.getPrototypeOf(ShoppingListItemService)).call(this, _schema.ShoppingListItem, ShoppingListItemService.buildSearchQuery, ShoppingListItemService.buildIncludeQuery, 'shopping list item'));
  }

  return ShoppingListItemService;
}(_microBusinessParseServerCommon.ServiceBase);

ShoppingListItemService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'user');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'shoppingList');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'productPrice');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'stapleItem');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'store');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');

  return query;
};

ShoppingListItemService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingListItem, criteria);
  var query = ShoppingListItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'name');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'description');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'shoppingList', 'shoppingList', _schema.ShoppingList);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'productPrice', 'productPrice', _schema.ProductPrice);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'stapleItem', 'stapleItem', _schema.StapleItem);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'store', 'store', _schema.Store);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);

  return query;
};

exports.default = ShoppingListItemService;