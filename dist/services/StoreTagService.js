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

var StoreTagService = function (_ServiceBase) {
  _inherits(StoreTagService, _ServiceBase);

  function StoreTagService() {
    _classCallCheck(this, StoreTagService);

    return _possibleConstructorReturn(this, (StoreTagService.__proto__ || Object.getPrototypeOf(StoreTagService)).call(this, _schema.StoreTag, StoreTagService.buildSearchQuery, StoreTagService.buildIncludeQuery, 'store tag'));
  }

  return StoreTagService;
}(_microBusinessParseServerCommon.ServiceBase);

StoreTagService.fields = _immutable.List.of('key', 'name', 'description', 'imageUrl', 'url', 'level', 'parentStoreTag', 'store', 'tag');

StoreTagService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'parentStoreTag');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'store');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tag');

  return query;
};

StoreTagService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreTag, criteria);
  var query = StoreTagService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StoreTagService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'name');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'description');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'url', 'url');
  _microBusinessParseServerCommon.ServiceBase.addNumberQuery(conditions, query, 'level', 'level');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'parentStoreTag', 'parentStoreTag', _schema.StoreTag);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'store', 'store', _schema.Store);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tag', _schema.Tag);

  return query;
};

exports.default = StoreTagService;