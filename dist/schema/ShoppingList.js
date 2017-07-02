'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _StapleShoppingList = require('./StapleShoppingList');

var _StapleShoppingList2 = _interopRequireDefault(_StapleShoppingList);

var _MasterProductPrice = require('./MasterProductPrice');

var _MasterProductPrice2 = _interopRequireDefault(_MasterProductPrice);

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
  object.set('doneDate', info.get('doneDate'));

  if (info.has('stapleShoppingListId')) {
    var stapleShoppingListId = info.get('stapleShoppingListId');

    object.set('stapleShoppingList', _StapleShoppingList2.default.createWithoutData(stapleShoppingListId));
  } else if (info.has('stapleShoppingList')) {
    var stapleShoppingList = info.get('stapleShoppingList');

    object.set('stapleShoppingList', stapleShoppingList);
  }

  if (info.has('masterProductPriceId')) {
    var masterProductPriceId = info.get('masterProductPriceId');

    object.set('masterProductPrice', _MasterProductPrice2.default.createWithoutData(masterProductPriceId));
  } else if (info.has('masterProductPrice')) {
    var masterProductPrice = info.get('masterProductPrice');

    object.set('masterProductPrice', masterProductPrice);
  }

  var name = info.get('name');

  object.set('name', name ? name.toLowerCase() : undefined);
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    ShoppingList.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var user = _this2.getObject().get('user');
    var stapleShoppingListObject = _this2.getObject().get('stapleShoppingList');
    var stapleShoppingList = stapleShoppingListObject ? new _StapleShoppingList2.default(stapleShoppingListObject).getInfo() : undefined;
    var masterProductPriceObject = _this2.getObject().get('masterProductPrice');
    var masterProductPrice = masterProductPriceObject ? new _MasterProductPrice2.default(masterProductPriceObject).getInfo() : undefined;

    var info = (0, _immutable.Map)({
      id: _this2.getId(),
      userId: user ? user.id : undefined,
      doneDate: _this2.getObject().get('doneDate'),
      name: _this2.getObject().get('name')
    });

    if (stapleShoppingList) {
      info = info.merge((0, _immutable.Map)({
        stapleShoppingList: stapleShoppingList,
        stapleShoppingListId: stapleShoppingList ? stapleShoppingList.get('id') : undefined
      }));
    }

    if (masterProductPrice) {
      info = info.merge((0, _immutable.Map)({
        masterProductPrice: masterProductPrice,
        masterProductPriceId: masterProductPrice ? masterProductPrice.get('id') : undefined
      }));
    }

    return info;
  };
};

exports.default = ShoppingList;