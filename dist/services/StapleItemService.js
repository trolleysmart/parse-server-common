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

var StapleItemService = function (_ServiceBase) {
  _inherits(StapleItemService, _ServiceBase);

  function StapleItemService() {
    _classCallCheck(this, StapleItemService);

    return _possibleConstructorReturn(this, (StapleItemService.__proto__ || Object.getPrototypeOf(StapleItemService)).call(this, _schema.StapleItem, StapleItemService.buildSearchQuery, StapleItemService.buildIncludeQuery, 'staple item'));
  }

  return StapleItemService;
}(_parseServerCommon.ServiceBase);

StapleItemService.fields = _immutable.List.of('name', 'description', 'imageUrl', 'popular', 'user', 'stapleTemplateItem', 'tags');

StapleItemService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'user');
  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'stapleTemplateItem');
  _parseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');

  return query;
};

StapleItemService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _parseServerCommon.ParseWrapperService.createQuery(_schema.StapleItem, criteria);
  var query = StapleItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StapleItemService.fields.forEach(function (field) {
    _parseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _parseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _parseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'popular', 'popular');
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'stapleTemplate', 'stapleTemplates', _schema.StapleTemplate);
  _parseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'stapleTemplateItem', 'stapleTemplateItem', _schema.StapleTemplateItem);
  _parseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);

  return query;
};

exports.default = StapleItemService;