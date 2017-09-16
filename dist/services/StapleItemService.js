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

var StapleItemService = function (_ServiceBase) {
  _inherits(StapleItemService, _ServiceBase);

  function StapleItemService() {
    _classCallCheck(this, StapleItemService);

    return _possibleConstructorReturn(this, (StapleItemService.__proto__ || Object.getPrototypeOf(StapleItemService)).call(this, _schema.StapleItem, StapleItemService.buildSearchQuery, StapleItemService.buildIncludeQuery, 'staple item'));
  }

  return StapleItemService;
}(_microBusinessParseServerCommon.ServiceBase);

StapleItemService.fields = _immutable.List.of('name', 'description', 'imageUrl', 'popular', 'user', 'stapleTemplateItem', 'tags');

StapleItemService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'user');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'stapleTemplateItem');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');

  return query;
};

StapleItemService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleItem, criteria);
  var query = StapleItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StapleItemService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'popular', 'popular');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'stapleTemplate', 'stapleTemplates', _schema.StapleTemplate);
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'stapleTemplateItem', 'stapleTemplateItem', _schema.StapleTemplateItem);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);

  return query;
};

exports.default = StapleItemService;