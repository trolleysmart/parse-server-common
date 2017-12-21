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

var ProductPriceService = function (_ServiceBase) {
  _inherits(ProductPriceService, _ServiceBase);

  function ProductPriceService() {
    _classCallCheck(this, ProductPriceService);

    return _possibleConstructorReturn(this, (ProductPriceService.__proto__ || Object.getPrototypeOf(ProductPriceService)).call(this, _schema.ProductPrice, ProductPriceService.buildSearchQuery, ProductPriceService.buildIncludeQuery, 'product price'));
  }

  return ProductPriceService;
}(_parseServerCommon.ServiceBase);

ProductPriceService.fields = _immutable.List.of('name', 'description', 'priceDetails', 'priceToDisplay', 'saving', 'savingPercentage', 'offerEndDate', 'status', 'special', 'barcode', 'size', 'imageUrl', 'productPageUrl', 'store', 'tags', 'storeProduct', 'createdByCrawler', 'authorizedToDisplay');

ProductPriceService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'store');
  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');
  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'storeProduct');

  return query;
};

ProductPriceService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _parseServerCommon.ParseWrapperService.createQuery(_schema.ProductPrice, criteria);
  var query = ProductPriceService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  ProductPriceService.fields.forEach(function (field) {
    _parseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _parseServerCommon.ServiceBase.addNumberQuery(conditions, query, 'priceToDisplay', 'priceToDisplay');
  _parseServerCommon.ServiceBase.addNumberQuery(conditions, query, 'saving', 'saving');
  _parseServerCommon.ServiceBase.addNumberQuery(conditions, query, 'savingPercentage', 'savingPercentage');
  _parseServerCommon.ServiceBase.addDateTimeQuery(conditions, query, 'offerEndDate', 'offerEndDate');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'status', 'status');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'special', 'special');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'store', 'store', _schema.Store);
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'storeProduct', 'storeProduct', _schema.StoreProduct);
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'createdByCrawler', 'createdByCrawler');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'authorizedToDisplay', 'authorizedToDisplay');

  return query;
};

exports.default = ProductPriceService;