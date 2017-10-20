'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

var ProductPriceService = (function(_ServiceBase) {
  _inherits(ProductPriceService, _ServiceBase);

  function ProductPriceService() {
    _classCallCheck(this, ProductPriceService);

    return _possibleConstructorReturn(
      this,
      (ProductPriceService.__proto__ || Object.getPrototypeOf(ProductPriceService)).call(
        this,
        _schema.ProductPrice,
        ProductPriceService.buildSearchQuery,
        ProductPriceService.buildIncludeQuery,
        'product price',
      ),
    );
  }

  return ProductPriceService;
})(_microBusinessParseServerCommon.ServiceBase);

ProductPriceService.fields = _immutable.List.of(
  'name',
  'description',
  'priceDetails',
  'priceToDisplay',
  'saving',
  'savingPercentage',
  'offerEndDate',
  'status',
  'special',
  'barcode',
  'size',
  'imageUrl',
  'productPageUrl',
  'store',
  'tags',
  'storeProduct',
  'createdByCrawler',
);

ProductPriceService.buildIncludeQuery = function(query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'store');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'storeProduct');

  return query;
};

ProductPriceService.buildSearchQuery = function(criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ProductPrice, criteria);
  var query = ProductPriceService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  ProductPriceService.fields.forEach(function(field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addNumberQuery(conditions, query, 'priceToDisplay', 'priceToDisplay');
  _microBusinessParseServerCommon.ServiceBase.addNumberQuery(conditions, query, 'saving', 'saving');
  _microBusinessParseServerCommon.ServiceBase.addNumberQuery(conditions, query, 'savingPercentage', 'savingPercentage');
  _microBusinessParseServerCommon.ServiceBase.addDateTimeQuery(conditions, query, 'offerEndDate', 'offerEndDate');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'status', 'status');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'special', 'special');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'store', 'store', _schema.Store);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'storeProduct', 'storeProduct', _schema.StoreProduct);
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'createdByCrawler', 'createdByCrawler');

  return query;
};

exports.default = ProductPriceService;
