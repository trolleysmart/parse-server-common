'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _stapleShoppingList = require('./staple-shopping-list');

var _stapleShoppingList2 = _interopRequireDefault(_stapleShoppingList);

var _masterProductPrice = require('./master-product-price');

var _masterProductPrice2 = _interopRequireDefault(_masterProductPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingList = function (_BaseObject) {
  _inherits(ShoppingList, _BaseObject);

  function ShoppingList(object) {
    _classCallCheck(this, ShoppingList);

    var _this = _possibleConstructorReturn(this, (ShoppingList.__proto__ || Object.getPrototypeOf(ShoppingList)).call(this, object, 'ShoppingList'));

    _initialiseProps.call(_this);

    return _this;
  }

  return ShoppingList;
}(_microBusinessParseServerCommon.BaseObject);

ShoppingList.spawn = function (info) {
  var object = new ShoppingList();

  ShoppingList.updateInfoInternal(object, info);

  return object;
};

ShoppingList.updateInfoInternal = function (object, info) {
  object.set('user', _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(info.get('userId')));

  if (info.has('stapleShoppingListIds')) {
    var stapleShoppingListIds = info.get('stapleShoppingListIds');

    if (!stapleShoppingListIds.isEmpty()) {
      object.set('stapleShoppingList', stapleShoppingListIds.map(function (stapleShoppingListId) {
        return _stapleShoppingList2.default.createWithoutData(stapleShoppingListId);
      }).toArray());
    }
  } else if (info.has('stapleShoppingList')) {
    var stapleShoppingList = info.get('stapleShoppingList');

    if (!stapleShoppingList.isEmpty()) {
      object.set('stapleShoppingList', stapleShoppingList.toArray());
    }
  }

  if (info.has('masterProductPriceIds')) {
    var masterProductPriceIds = info.get('masterProductPriceIds');

    if (!masterProductPriceIds.isEmpty()) {
      object.set('masterProductPrices', masterProductPriceIds.map(function (masterProductPriceId) {
        return _masterProductPrice2.default.createWithoutData(masterProductPriceId);
      }).toArray());
    }
  } else if (info.has('masterProductPrices')) {
    var masterProductPrices = info.get('masterProductPrices');

    if (!masterProductPrices.isEmpty()) {
      object.set('masterProductPrices', masterProductPrices.toArray());
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    ShoppingList.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    return (0, _immutable.Map)({
      id: _this2.getId(),
      userId: _this2.getObject().get('user').id,
      items: _immutable2.default.fromJS(_this2.getObject().get('items'))
    });
  };
};

exports.default = ShoppingList;