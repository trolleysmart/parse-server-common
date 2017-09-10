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

var StapleTemplateService = function (_ServiceBase) {
  _inherits(StapleTemplateService, _ServiceBase);

  function StapleTemplateService() {
    _classCallCheck(this, StapleTemplateService);

    return _possibleConstructorReturn(this, (StapleTemplateService.__proto__ || Object.getPrototypeOf(StapleTemplateService)).call(this, _schema.StapleTemplate, StapleTemplateService.buildSearchQuery, StapleTemplateService.buildIncludeQuery, 'staple template'));
  }

  return StapleTemplateService;
}(_microBusinessParseServerCommon.ServiceBase);

StapleTemplateService.fields = _immutable.List.of('name', 'description', 'imageUrl');

StapleTemplateService.buildIncludeQuery = function (query) {
  return query;
};

StapleTemplateService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplate, criteria);
  var query = StapleTemplateService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StapleTemplateService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'name');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'description');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');

  return query;
};

exports.default = StapleTemplateService;