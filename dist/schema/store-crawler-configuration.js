'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreCrawlerConfiguration = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreCrawlerConfiguration = function (_BaseObject) {
  _inherits(StoreCrawlerConfiguration, _BaseObject);

  function StoreCrawlerConfiguration(object) {
    _classCallCheck(this, StoreCrawlerConfiguration);

    var _this = _possibleConstructorReturn(this, (StoreCrawlerConfiguration.__proto__ || Object.getPrototypeOf(StoreCrawlerConfiguration)).call(this, object, 'StoreCrawlerConfiguration'));

    _this.getKey = _this.getKey.bind(_this);
    _this.getConfig = _this.getConfig.bind(_this);
    return _this;
  }

  _createClass(StoreCrawlerConfiguration, [{
    key: 'getKey',
    value: function getKey() {
      return this.getObject().get('key');
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return _immutable2.default.fromJS(this.getObject().get('config'));
    }
  }], [{
    key: 'spawn',
    value: function spawn(key, config) {
      var object = new StoreCrawlerConfiguration();

      object.set('key', key);
      object.set('config', config);

      return object;
    }
  }]);

  return StoreCrawlerConfiguration;
}(_microBusinessParseServerCommon.BaseObject);

exports.StoreCrawlerConfiguration = StoreCrawlerConfiguration;
exports.default = StoreCrawlerConfiguration;