'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrawlSession = function (_BaseObject) {
  _inherits(CrawlSession, _BaseObject);

  function CrawlSession(object) {
    _classCallCheck(this, CrawlSession);

    var _this = _possibleConstructorReturn(this, (CrawlSession.__proto__ || Object.getPrototypeOf(CrawlSession)).call(this, object, 'CrawlSession'));

    _initialiseProps.call(_this);

    return _this;
  }

  return CrawlSession;
}(_microBusinessParseServerCommon.BaseObject);

CrawlSession.spawn = function (info) {
  var object = new CrawlSession();

  CrawlSession.updateInfoInternal(object, info);

  return object;
};

CrawlSession.updateInfoInternal = function (object, info) {
  object.set('sessionKey', info.get('sessionKey'));
  object.set('startDateTime', info.get('startDateTime'));
  object.set('endDateTime', info.get('endDateTime'));

  var additionalInfo = info.get('additionalInfo');

  object.set('additionalInfo', additionalInfo ? additionalInfo.toJS() : undefined);
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    CrawlSession.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    return (0, _immutable.Map)({
      id: _this2.getId(),
      sessionKey: _this2.getObject().get('sessionKey'),
      startDateTime: _this2.getObject().get('startDateTime'),
      endDateTime: _this2.getObject().get('endDateTime'),
      additionalInfo: _immutable2.default.fromJS(_this2.getObject().get('additionalInfo'))
    });
  };
};

exports.default = CrawlSession;