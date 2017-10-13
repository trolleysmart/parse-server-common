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

var StoreProductService = function (_ServiceBase) {
  _inherits(StoreProductService, _ServiceBase);

  function StoreProductService() {
    _classCallCheck(this, StoreProductService);

    return _possibleConstructorReturn(this, (StoreProductService.__proto__ || Object.getPrototypeOf(StoreProductService)).call(this, _schema.StoreProduct, StoreProductService.buildSearchQuery, StoreProductService.buildIncludeQuery, 'store product'));
  }

  return StoreProductService;
}(_microBusinessParseServerCommon.ServiceBase);

StoreProductService.fields = _immutable.List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'store', 'storeTags');

StoreProductService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'store');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'storeTags');

  return query;
};

StoreProductService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreProduct, criteria);
  var query = StoreProductService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StoreProductService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'store', 'store', _schema.Store);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'storeTag', 'storeTags', _schema.StoreTag);

  return query;
};

exports.default = StoreProductService;