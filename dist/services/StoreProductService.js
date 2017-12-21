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

var StoreProductService = function (_ServiceBase) {
  _inherits(StoreProductService, _ServiceBase);

  function StoreProductService() {
    _classCallCheck(this, StoreProductService);

    return _possibleConstructorReturn(this, (StoreProductService.__proto__ || Object.getPrototypeOf(StoreProductService)).call(this, _schema.StoreProduct, StoreProductService.buildSearchQuery, StoreProductService.buildIncludeQuery, 'store product'));
  }

  return StoreProductService;
}(_parseServerCommon.ServiceBase);

StoreProductService.fields = _immutable.List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'lastCrawlDateTime', 'store', 'storeTags', 'tags', 'createdByCrawler', 'authorizedToDisplay');

StoreProductService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'store');
  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'storeTags');
  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');

  return query;
};

StoreProductService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _parseServerCommon.ParseWrapperService.createQuery(_schema.StoreProduct, criteria);
  var query = StoreProductService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StoreProductService.fields.forEach(function (field) {
    _parseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
  _parseServerCommon.ServiceBase.addDateTimeQuery(conditions, query, 'lastCrawlDateTime', 'lastCrawlDateTime');
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'store', 'store', _schema.Store);
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'storeTag', 'storeTags', _schema.StoreTag);
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'createdByCrawler', 'createdByCrawler');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'authorizedToDisplay', 'authorizedToDisplay');

  return query;
};

exports.default = StoreProductService;