'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrawlResult = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _crawlSession = require('./crawl-session');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrawlResult = function (_BaseObject) {
  _inherits(CrawlResult, _BaseObject);

  function CrawlResult(object) {
    _classCallCheck(this, CrawlResult);

    var _this = _possibleConstructorReturn(this, (CrawlResult.__proto__ || Object.getPrototypeOf(CrawlResult)).call(this, object, 'CrawlResult'));

    _this.getCrawlSession = _this.getCrawlSession.bind(_this);
    _this.getResultSet = _this.getResultSet.bind(_this);
    return _this;
  }

  _createClass(CrawlResult, [{
    key: 'getCrawlSession',
    value: function getCrawlSession() {
      return new _crawlSession.CrawlSession(this.getObject().get('crawlSession'));
    }
  }, {
    key: 'getResultSet',
    value: function getResultSet() {
      return _immutable2.default.fromJS(this.getObject().get('resultSet'));
    }
  }], [{
    key: 'spawn',
    value: function spawn(sessionId, resultSet) {
      var object = new CrawlResult();

      object.set('crawlSession', _crawlSession.CrawlSession.createWithoutData(sessionId));
      object.set('resultSet', resultSet);

      return object;
    }
  }]);

  return CrawlResult;
}(_microBusinessParseServerCommon.BaseObject);

exports.CrawlResult = CrawlResult;
exports.default = CrawlResult;