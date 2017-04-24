'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StapleTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StapleTemplate = function (_BaseObject) {
  _inherits(StapleTemplate, _BaseObject);

  _createClass(StapleTemplate, null, [{
    key: 'spawn',
    value: function spawn(info) {
      var object = new StapleTemplate();

      StapleTemplate.updateInfoInternal(object, info);

      return object;
    }
  }, {
    key: 'updateInfoInternal',
    value: function updateInfoInternal(object, info) {
      object.set('name', info.get('name'));
    }
  }]);

  function StapleTemplate(object) {
    _classCallCheck(this, StapleTemplate);

    var _this = _possibleConstructorReturn(this, (StapleTemplate.__proto__ || Object.getPrototypeOf(StapleTemplate)).call(this, object, 'StapleTemplate'));

    _this.updateInfo = _this.updateInfo.bind(_this);
    _this.getInfo = _this.getInfo.bind(_this);
    return _this;
  }

  _createClass(StapleTemplate, [{
    key: 'updateInfo',
    value: function updateInfo(info) {
      var object = this.getObject();

      StapleTemplate.updateInfoInternal(object, info);

      return this;
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      return (0, _immutable.Map)({
        id: this.getId(),
        name: this.getObject().get('name')
      });
    }
  }]);

  return StapleTemplate;
}(_microBusinessParseServerCommon.BaseObject);

exports.StapleTemplate = StapleTemplate;
exports.default = StapleTemplate;