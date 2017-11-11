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

var StoreService = function (_ServiceBase) {
  _inherits(StoreService, _ServiceBase);

  function StoreService() {
    _classCallCheck(this, StoreService);

    return _possibleConstructorReturn(this, (StoreService.__proto__ || Object.getPrototypeOf(StoreService)).call(this, _schema.Store, StoreService.buildSearchQuery, StoreService.buildIncludeQuery, 'store'));
  }

  return StoreService;
}(_microBusinessParseServerCommon.ServiceBase);

StoreService.fields = _immutable.List.of('key', 'name', 'imageUrl', 'address', 'phones', 'geoLocation', 'openFrom', 'openUntil', 'forDisplay', 'parentStore', 'ownedByUser', 'maintainedByUsers', 'status');

StoreService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'parentStore');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'ownedByUser');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'maintainedByUsers');

  return query;
};

StoreService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store, criteria);
  var query = StoreService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StoreService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'address', 'address');
  _microBusinessParseServerCommon.ServiceBase.addGeoLocationQuery(conditions, query, 'geoLocation', 'geoLocation');
  _microBusinessParseServerCommon.ServiceBase.addDateTimeQuery(conditions, query, 'openFrom', 'openFrom');
  _microBusinessParseServerCommon.ServiceBase.addDateTimeQuery(conditions, query, 'openUntil', 'openUntil');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'forDisplay', 'forDisplay');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'parentStore', 'parentStore', _schema.Store);
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'ownedByUser', 'ownedByUser');
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'maintainedByUser', 'maintainedByUsers');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'status', 'status');

  return query;
};

exports.default = StoreService;