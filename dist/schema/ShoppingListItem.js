'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _ProductPrice = require('./ProductPrice');

var _ProductPrice2 = _interopRequireDefault(_ProductPrice);

var _ShoppingList = require('./ShoppingList');

var _ShoppingList2 = _interopRequireDefault(_ShoppingList);

var _StapleItem = require('./StapleItem');

var _StapleItem2 = _interopRequireDefault(_StapleItem);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingListItem = function (_BaseObject) {
  _inherits(ShoppingListItem, _BaseObject);

  function ShoppingListItem(object) {
    _classCallCheck(this, ShoppingListItem);

    var _this = _possibleConstructorReturn(this, (ShoppingListItem.__proto__ || Object.getPrototypeOf(ShoppingListItem)).call(this, object, 'ShoppingListItem'));

    _initialiseProps.call(_this);

    return _this;
  }

  return ShoppingListItem;
}(_microBusinessParseServerCommon.BaseObject);

ShoppingListItem.spawn = function (info) {
  var object = new ShoppingListItem();

  ShoppingListItem.updateInfoInternal(object, info);

  return object;
};

ShoppingListItem.updateInfoInternal = function (object, info) {
  object.set('name', info.get('name'));
  object.set('description', info.get('description'));
  object.set('imageUrl', info.get('imageUrl'));
  _microBusinessParseServerCommon.BaseObject.createUserPointer(object, info, 'user');
  _microBusinessParseServerCommon.BaseObject.createPointer(object, info, 'shoppingList', _ShoppingList2.default);
  _microBusinessParseServerCommon.BaseObject.createPointer(object, info, 'productPrice', _ProductPrice2.default);
  _microBusinessParseServerCommon.BaseObject.createPointer(object, info, 'stapleItem', _StapleItem2.default);
  _microBusinessParseServerCommon.BaseObject.createPointer(object, info, 'store', _Store2.default);
  _microBusinessParseServerCommon.BaseObject.createArrayPointer(object, info, 'tag', _Tag2.default);
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    ShoppingListItem.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var user = _this2.getObject().get('user');
    var shoppingList = new _ShoppingList2.default(_this2.getObject().get('shoppingList'));
    var productPriceObject = _this2.getObject().get('productPrice');
    var productPrice = productPriceObject ? new _ProductPrice2.default(productPriceObject) : undefined;
    var stapleItemObject = _this2.getObject().get('stapleItem');
    var stapleItem = stapleItemObject ? new _StapleItem2.default(stapleItemObject) : undefined;
    var tagObjects = _this2.getObject().get('tags');
    var tags = tagObjects ? _immutable2.default.fromJS(tagObjects).map(function (tag) {
      return new _Tag2.default(tag).getInfo();
    }) : undefined;
    var storeObject = _this2.getObject().get('store');
    var store = storeObject ? new _Store2.default(storeObject) : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: _this2.getObject().get('name'),
      description: _this2.getObject().get('description'),
      imageUrl: _this2.getObject().get('imageUrl'),
      user: user,
      userId: user ? user.id : undefined,
      shoppingList: shoppingList.getInfo(),
      shoppingListId: shoppingList.getId(),
      productPrice: productPrice ? productPrice.getInfo() : undefined,
      productPriceId: productPrice ? productPrice.getId() : undefined,
      stapleItem: stapleItem ? stapleItem.getInfo() : undefined,
      stapleItemId: stapleItem ? stapleItem.getId() : undefined,
      tags: tags,
      tagIds: tags ? tags.map(function (tag) {
        return tag.get('id');
      }) : (0, _immutable.List)(),
      store: store ? store.getInfo() : undefined,
      storeId: store ? store.getId() : undefined
    });
  };
};

exports.default = ShoppingListItem;