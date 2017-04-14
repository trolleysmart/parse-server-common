'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseObject = require('./base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

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

    _this.getCrawlSession = _this.getCrawlSession.bind(_this);
    _this.getResult = _this.getResult.bind(_this);
    return _this;
  }

  _createClass(CrawlResult, [{
    key: 'getCrawlSession',
    value: function getCrawlSession() {
      return new _crawlSession2.default(this.getObject().get('crawlSession'));
    }
  }, {
    key: 'getResult',
    value: function getResult() {
      return this.getObject().get('result');
    }
  }], [{
    key: 'spawn',
    value: function spawn(crawlSession, result) {
      var object = new CrawlResult();

      object.set('crawlSession', _crawlSession2.default.createWithoutData(crawlSession.getId()));
      object.set('result', result);

      return object;
    }
  }]);

  return CrawlResult;
}(_baseObject2.default);

exports.default = CrawlResult;