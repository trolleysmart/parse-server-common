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

var UserFeedbackService = function (_ServiceBase) {
  _inherits(UserFeedbackService, _ServiceBase);

  function UserFeedbackService() {
    _classCallCheck(this, UserFeedbackService);

    return _possibleConstructorReturn(this, (UserFeedbackService.__proto__ || Object.getPrototypeOf(UserFeedbackService)).call(this, _schema.UserFeedback, UserFeedbackService.buildSearchQuery, UserFeedbackService.buildIncludeQuery, 'user feedback'));
  }

  return UserFeedbackService;
}(_microBusinessParseServerCommon.ServiceBase);

UserFeedbackService.fields = _immutable.List.of('feedback', 'user');

UserFeedbackService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'user');

  return query;
};

UserFeedbackService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.UserFeedback, criteria);
  var query = UserFeedbackService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  UserFeedbackService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');

  return query;
};

exports.default = UserFeedbackService;