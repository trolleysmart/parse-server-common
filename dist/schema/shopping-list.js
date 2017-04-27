'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShoppingList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingList = function (_BaseObject) {
  _inherits(ShoppingList, _BaseObject);

  _createClass(ShoppingList, null, [{
    key: 'updateInfoInternal',
    value: function updateInfoInternal(object, info) {
      object.set('user', _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(info.get('userId')));
      object.set('items', info.get('items').toJS());
    }
  }]);

  function ShoppingList(object) {
    _classCallCheck(this, ShoppingList);

    var _this = _possibleConstructorReturn(this, (ShoppingList.__proto__ || Object.getPrototypeOf(ShoppingList)).call(this, object, 'ShoppingList'));

    _this.updateInfo = _this.updateInfo.bind(_this);
    _this.getInfo = _this.getInfo.bind(_this);
    return _this;
  }

  _createClass(ShoppingList, [{
    key: 'updateInfo',
    value: function updateInfo(info) {
      var object = this.getObject();

      ShoppingList.updateInfoInternal(object, info);

      return this;
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      return (0, _immutable.Map)({
        id: this.getId(),
        userId: this.getObject().get('user').id,
        items: _immutable2.default.fromJS(this.getObject().get('items'))
      });
    }
  }], [{
    key: 'spawn',
    value: function spawn(info) {
      var object = new ShoppingList();

      ShoppingList.updateInfoInternal(object, info);

      return object;
    }
  }]);

  return ShoppingList;
}(_microBusinessParseServerCommon.BaseObject);

exports.ShoppingList = ShoppingList;
exports.default = ShoppingList;