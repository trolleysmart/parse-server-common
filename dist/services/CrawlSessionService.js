'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrawlSessionService = function (_ServiceBase) {
  _inherits(CrawlSessionService, _ServiceBase);

  function CrawlSessionService() {
    _classCallCheck(this, CrawlSessionService);

    return _possibleConstructorReturn(this, (CrawlSessionService.__proto__ || Object.getPrototypeOf(CrawlSessionService)).call(this, _schema.CrawlSession, CrawlSessionService.buildSearchQuery, CrawlSessionService.buildIncludeQuery, 'crawl session'));
  }

  return CrawlSessionService;
}(_microBusinessParseServerCommon.ServiceBase);

CrawlSessionService.buildIncludeQuery = function (query) {
  return query;
};

CrawlSessionService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession, criteria);
  var query = CrawlSessionService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
  _microBusinessParseServerCommon.ServiceBase.addDateTimeQuery(conditions, query, 'startDateTime', 'startDateTime');
  _microBusinessParseServerCommon.ServiceBase.addDateTimeQuery(conditions, query, 'endDateTime', 'endDateTime');

  return query;
};

exports.default = CrawlSessionService;