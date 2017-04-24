'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrawlSession = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _monet = require('monet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrawlSession = function (_BaseObject) {
  _inherits(CrawlSession, _BaseObject);

  _createClass(CrawlSession, null, [{
    key: 'spawn',
    value: function spawn(info) {
      var object = new CrawlSession();

      CrawlSession.updateInfoInternal(object, info);

      return object;
    }
  }, {
    key: 'updateInfoInternal',
    value: function updateInfoInternal(object, info) {
      object.set('sessionKey', info.get('sessionKey'));
      object.set('startDateTime', info.get('startDateTime').orSome(undefined));
      object.set('endDateTime', info.get('endDateTime').orSome(undefined));

      var additionalInfo = info.get('additionalInfo');

      if (additionalInfo.isSome()) {
        object.set('additionalInfo', additionalInfo.some().toJS());
      } else {
        object.set('additionalInfo', undefined);
      }
    }
  }]);

  function CrawlSession(object) {
    _classCallCheck(this, CrawlSession);

    var _this = _possibleConstructorReturn(this, (CrawlSession.__proto__ || Object.getPrototypeOf(CrawlSession)).call(this, object, 'CrawlSession'));

    _this.updateInfo = _this.updateInfo.bind(_this);
    _this.getInfo = _this.getInfo.bind(_this);
    return _this;
  }

  _createClass(CrawlSession, [{
    key: 'updateInfo',
    value: function updateInfo(info) {
      var object = this.getObject();

      CrawlSession.updateInfoInternal(object, info);

      return this;
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      return (0, _immutable.Map)({
        id: this.getId(),
        sessionKey: this.getObject().get('sessionKey'),
        startDateTime: _monet.Maybe.fromNull(this.getObject().get('startDateTime')),
        endDateTime: _monet.Maybe.fromNull(this.getObject().get('endDateTime')),
        additionalInfo: _monet.Maybe.fromNull(_immutable2.default.fromJS(this.getObject().get('additionalInfo')))
      });
    }
  }]);

  return CrawlSession;
}(_microBusinessParseServerCommon.BaseObject);

exports.CrawlSession = CrawlSession;
exports.default = CrawlSession;