'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _StoreProduct = require('./StoreProduct');

var _StoreProduct2 = _interopRequireDefault(_StoreProduct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductPrice = function (_BaseObject) {
  _inherits(ProductPrice, _BaseObject);

  function ProductPrice(object) {
    _classCallCheck(this, ProductPrice);

    var _this = _possibleConstructorReturn(this, (ProductPrice.__proto__ || Object.getPrototypeOf(ProductPrice)).call(this, object, 'ProductPrice'));

    _initialiseProps.call(_this);

    return _this;
  }

  return ProductPrice;
}(_microBusinessParseServerCommon.BaseObject);

ProductPrice.spawn = function (info) {
  var object = new ProductPrice();

  ProductPrice.updateInfoInternal(object, info);

  return object;
};

ProductPrice.updateInfoInternal = function (object, info) {
  _microBusinessParseServerCommon.BaseObject.createStringColumn(object, info, 'name');
  _microBusinessParseServerCommon.BaseObject.createStringColumn(object, info, 'description');
  object.set('priceDetails', info.get('priceDetails').toJS());
  object.set('priceToDisplay', info.get('priceToDisplay'));
  object.set('saving', info.get('saving'));
  object.set('savingPercentage', info.get('savingPercentage'));
  object.set('offerEndDate', info.get('offerEndDate'));
  object.set('status', info.get('status'));
  object.set('special', info.get('special'));
  object.set('barcode', info.get('barcode'));
  object.set('size', info.get('size'));
  object.set('imageUrl', info.get('imageUrl'));
  object.set('productPageUrl', info.get('productPageUrl'));
  _microBusinessParseServerCommon.BaseObject.createPointer(object, info, 'store', _Store2.default);
  _microBusinessParseServerCommon.BaseObject.createArrayPointer(object, info, 'tag', _Tag2.default);
  _microBusinessParseServerCommon.BaseObject.createPointer(object, info, 'storeProduct', _StoreProduct2.default);
  object.set('createdByCrawler', info.get('createdByCrawler'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    ProductPrice.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var store = new _Store2.default(object.get('store'));
    var tagObjects = object.get('tags');
    var tags = tagObjects ? _immutable2.default.fromJS(tagObjects).map(function (tag) {
      return new _Tag2.default(tag).getInfo();
    }) : undefined;
    var storeProduct = new _StoreProduct2.default(object.get('storeProduct'));

    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: object.get('name'),
      description: object.get('description'),
      priceDetails: _immutable2.default.fromJS(object.get('priceDetails')),
      priceToDisplay: object.get('priceToDisplay'),
      saving: object.get('saving'),
      savingPercentage: object.get('savingPercentage'),
      offerEndDate: object.get('offerEndDate'),
      status: object.get('status'),
      special: object.get('special'),
      barcode: object.get('barcode'),
      size: object.get('size'),
      imageUrl: object.get('imageUrl'),
      productPageUrl: object.get('productPageUrl'),
      store: store.getInfo(),
      storeId: store.getId(),
      tags: tags,
      tagIds: tags ? tags.map(function (tag) {
        return tag.get('id');
      }) : (0, _immutable.List)(),
      storeProduct: storeProduct.getInfo(),
      storeProductId: storeProduct.getId(),
      createdByCrawler: object.get('createdByCrawler')
    });
  };
};

exports.default = ProductPrice;