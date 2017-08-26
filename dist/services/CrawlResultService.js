'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrawlResultService = function (_ServiceBase) {
  _inherits(CrawlResultService, _ServiceBase);

  function CrawlResultService() {
    _classCallCheck(this, CrawlResultService);

    return _possibleConstructorReturn(this, (CrawlResultService.__proto__ || Object.getPrototypeOf(CrawlResultService)).call(this, _schema.CrawlResult, CrawlResultService.buildSearchQuery, CrawlResultService.buildIncludeQuery, 'crawl result'));
  }

  return CrawlResultService;
}(_microBusinessParseServerCommon.ServiceBase);

CrawlResultService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'crawlSession');

  return query;
};

CrawlResultService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlResult, criteria);
  var query = CrawlResultService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'crawlSession', 'crawlSession', _schema.CrawlSession);

  return query;
};

exports.default = CrawlResultService;