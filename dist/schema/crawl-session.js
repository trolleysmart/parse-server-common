'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _monet = require('monet');

var _baseObject = require('./base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrawlSession = function (_BaseObject) {
  _inherits(CrawlSession, _BaseObject);

  function CrawlSession(object) {
    _classCallCheck(this, CrawlSession);

    var _this = _possibleConstructorReturn(this, (CrawlSession.__proto__ || Object.getPrototypeOf(CrawlSession)).call(this, object, 'CrawlSession'));

    _this.getSessionKey = _this.getSessionKey.bind(_this);
    _this.getStartDateTime = _this.getStartDateTime.bind(_this);
    _this.getEndDateTime = _this.getEndDateTime.bind(_this);
    return _this;
  }

  _createClass(CrawlSession, [{
    key: 'getSessionKey',
    value: function getSessionKey() {
      return this.getObject().get('sessionKey');
    }
  }, {
    key: 'getStartDateTime',
    value: function getStartDateTime() {
      return this.getObject().get('startDateTime');
    }
  }, {
    key: 'getEndDateTime',
    value: function getEndDateTime() {
      return _monet.Maybe.fromNull(this.getObject().get('endDateTime'));
    }
  }, {
    key: 'setEndDateTime',
    value: function setEndDateTime(endDateTime) {
      return this.getObject().set('endDateTime', endDateTime);
    }
  }], [{
    key: 'spawn',
    value: function spawn(sessionKey, startDateTime, endDateTime) {
      var object = new CrawlSession();

      object.set('sessionKey', sessionKey);
      object.set('startDateTime', startDateTime);
      object.set('endDateTime', endDateTime);

      return object;
    }
  }]);

  return CrawlSession;
}(_baseObject2.default);

exports.default = CrawlSession;