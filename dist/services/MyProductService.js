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

var MyProductService = function (_ServiceBase) {
  _inherits(MyProductService, _ServiceBase);

  function MyProductService() {
    _classCallCheck(this, MyProductService);

    return _possibleConstructorReturn(this, (MyProductService.__proto__ || Object.getPrototypeOf(MyProductService)).call(this, _schema.MyProduct, MyProductService.buildSearchQuery, MyProductService.buildIncludeQuery, 'my product'));
  }

  return MyProductService;
}(_parseServerCommon.ServiceBase);

MyProductService.fields = _immutable.List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'tags', 'ownedByUser');

MyProductService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');
  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'ownedByUser');

  return query;
};

MyProductService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _parseServerCommon.ParseWrapperService.createQuery(_schema.MyProduct, criteria);
  var query = MyProductService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  MyProductService.fields.forEach(function (field) {
    _parseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);
  _parseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'ownedByUser', 'ownedByUser');

  return query;
};

exports.default = MyProductService;