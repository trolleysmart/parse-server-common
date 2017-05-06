'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _crawlSession = require('./crawl-session');

var _crawlSession2 = _interopRequireDefault(_crawlSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrawlResult = function (_BaseObject) {
  _inherits(CrawlResult, _BaseObject);

  function CrawlResult(object) {
    _classCallCheck(this, CrawlResult);

    var _this = _possibleConstructorReturn(this, (CrawlResult.__proto__ || Object.getPrototypeOf(CrawlResult)).call(this, object, 'CrawlResult'));

    _initialiseProps.call(_this);

    return _this;
  }

  return CrawlResult;
}(_microBusinessParseServerCommon.BaseObject);

CrawlResult.spawn = function (info) {
  var object = new CrawlResult();

  CrawlResult.updateInfoInternal(object, info);

  return object;
};

CrawlResult.updateInfoInternal = function (object, info) {
  object.set('crawlSession', _crawlSession2.default.createWithoutData(info.get('crawlSessionId')));
  object.set('resultSet', info.get('resultSet').toJS());
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    CrawlResult.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var crawlSession = new _crawlSession2.default(_this2.getObject().get('crawlSession'));

    return (0, _immutable.Map)({
      id: _this2.getId(),
      crawlSession: crawlSession,
      crawlSessionId: crawlSession.getId(),
      resultSet: _immutable2.default.fromJS(_this2.getObject().get('resultSet'))
    });
  };
};

exports.default = CrawlResult;