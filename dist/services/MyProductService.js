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

var MyProductService = function (_ServiceBase) {
  _inherits(MyProductService, _ServiceBase);

  function MyProductService() {
    _classCallCheck(this, MyProductService);

    return _possibleConstructorReturn(this, (MyProductService.__proto__ || Object.getPrototypeOf(MyProductService)).call(this, _schema.MyProduct, MyProductService.buildSearchQuery, MyProductService.buildIncludeQuery, 'my product'));
  }

  return MyProductService;
}(_microBusinessParseServerCommon.ServiceBase);

MyProductService.fields = _immutable.List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'tags', 'ownedByUser');

MyProductService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'ownedByUser');

  return query;
};

MyProductService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MyProduct, criteria);
  var query = MyProductService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  MyProductService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'productPageUrl', 'productPageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'ownedByUser', 'ownedByUser');

  return query;
};

exports.default = MyProductService;