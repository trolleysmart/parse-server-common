'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _ShoppingList = require('./ShoppingList');

var _ShoppingList2 = _interopRequireDefault(_ShoppingList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultShoppingList = function (_BaseObject) {
  _inherits(DefaultShoppingList, _BaseObject);

  function DefaultShoppingList(object) {
    _classCallCheck(this, DefaultShoppingList);

    var _this = _possibleConstructorReturn(this, (DefaultShoppingList.__proto__ || Object.getPrototypeOf(DefaultShoppingList)).call(this, object, 'DefaultShoppingList'));

    _initialiseProps.call(_this);

    return _this;
  }

  return DefaultShoppingList;
}(_parseServerCommon.BaseObject);

DefaultShoppingList.spawn = function (info) {
  var object = new DefaultShoppingList();

  DefaultShoppingList.updateInfoInternal(object, info);

  return object;
};

DefaultShoppingList.updateInfoInternal = function (object, info) {
  _parseServerCommon.BaseObject.createUserPointer(object, info, 'user');
  _parseServerCommon.BaseObject.createPointer(object, info, 'shoppingList', _ShoppingList2.default);
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    DefaultShoppingList.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var user = object.get('user');
    var shoppingList = new _ShoppingList2.default(object.get('shoppingList'));

    return (0, _immutable.Map)({
      id: _this2.getId(),
      user: user,
      userId: user ? user.id : undefined,
      shoppingList: shoppingList.getInfo(),
      shoppingListId: shoppingList.getId()
    });
  };
};

exports.default = DefaultShoppingList;