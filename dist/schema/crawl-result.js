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

  _createClass(CrawlResult, null, [{
    key: 'spawn',
    value: function spawn(info) {
      var object = new CrawlResult();

      CrawlResult.updateInfoInternal(object, info);

      return object;
    }
  }, {
    key: 'updateInfoInternal',
    value: function updateInfoInternal(object, info) {
      object.set('crawlSession', _crawlSession.CrawlSession.createWithoutData(info.get('crawlSessionId')));
      object.set('resultSet', info.get('resultSet').toJS());
    }
  }]);

  function CrawlResult(object) {
    _classCallCheck(this, CrawlResult);

    var _this = _possibleConstructorReturn(this, (CrawlResult.__proto__ || Object.getPrototypeOf(CrawlResult)).call(this, object, 'CrawlResult'));

    _this.updateInfo = _this.updateInfo.bind(_this);
    _this.getInfo = _this.getInfo.bind(_this);
    return _this;
  }

  _createClass(CrawlResult, [{
    key: 'updateInfo',
    value: function updateInfo(info) {
      var object = this.getObject();

      CrawlResult.updateInfoInternal(object, info);

      return this;
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      var crawlSession = new _crawlSession.CrawlSession(this.getObject().get('crawlSession'));

      return (0, _immutable.Map)({
        id: this.getId(),
        crawlSession: crawlSession,
        crawlSessionId: crawlSession.getId(),
        resultSet: _immutable2.default.fromJS(this.getObject().get('resultSet'))
      });
    }
  }]);

  return CrawlResult;
}(_microBusinessParseServerCommon.BaseObject);

exports.CrawlResult = CrawlResult;
exports.default = CrawlResult;