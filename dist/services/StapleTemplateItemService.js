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

var StapleTemplateItemService = function (_ServiceBase) {
  _inherits(StapleTemplateItemService, _ServiceBase);

  function StapleTemplateItemService() {
    _classCallCheck(this, StapleTemplateItemService);

    return _possibleConstructorReturn(this, (StapleTemplateItemService.__proto__ || Object.getPrototypeOf(StapleTemplateItemService)).call(this, _schema.StapleTemplateItem, StapleTemplateItemService.buildSearchQuery, StapleTemplateItemService.buildIncludeQuery, 'staple template item'));
  }

  return StapleTemplateItemService;
}(_microBusinessParseServerCommon.ServiceBase);

StapleTemplateItemService.fields = _immutable.List.of('name', 'description', 'imageUrl', 'popular', 'stapleTemplates', 'tags');

StapleTemplateItemService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'stapleTemplates');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');

  return query;
};

StapleTemplateItemService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateItem, criteria);
  var query = StapleTemplateItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StapleTemplateItemService.fields.forEach(function (field) {
    return _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'name');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'description');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'popular', 'popular');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'stapleTemplate', 'stapleTemplates', _schema.StapleTemplate);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);

  return query;
};

exports.default = StapleTemplateItemService;