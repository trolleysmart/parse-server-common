'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _StoreTag = require('./StoreTag');

var _StoreTag2 = _interopRequireDefault(_StoreTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreProduct = function (_BaseObject) {
  _inherits(StoreProduct, _BaseObject);

  function StoreProduct(object) {
    _classCallCheck(this, StoreProduct);

    var _this = _possibleConstructorReturn(this, (StoreProduct.__proto__ || Object.getPrototypeOf(StoreProduct)).call(this, object, 'StoreProduct'));

    _initialiseProps.call(_this);

    return _this;
  }

  return StoreProduct;
}(_microBusinessParseServerCommon.BaseObject);

StoreProduct.spawn = function (info) {
  var object = new StoreProduct();

  StoreProduct.updateInfoInternal(object, info);

  return object;
};

StoreProduct.updateInfoInternal = function (object, info) {
  _microBusinessParseServerCommon.BaseObject.createStringColumn(object, info, 'name');
  _microBusinessParseServerCommon.BaseObject.createStringColumn(object, info, 'description');
  object.set('barcode', info.get('barcode'));
  object.set('productPageUrl', info.get('productPageUrl'));
  object.set('imageUrl', info.get('imageUrl'));
  object.set('size', info.get('size'));
  object.set('lastCrawlDateTime', info.get('lastCrawlDateTime'));
  _microBusinessParseServerCommon.BaseObject.createArrayPointer(object, info, 'storeTag', _StoreTag2.default);
  _microBusinessParseServerCommon.BaseObject.createPointer(object, info, 'store', _Store2.default);
  object.set('createdByCrawler', info.get('createdByCrawler'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    StoreProduct.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var storeTagObjects = object.get('storeTags');
    var storeTags = storeTagObjects ? _immutable2.default.fromJS(storeTagObjects).map(function (storeTag) {
      return new _StoreTag2.default(storeTag).getInfo();
    }) : undefined;
    var store = new _Store2.default(object.get('store'));

    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: object.get('name'),
      description: object.get('description'),
      barcode: object.get('barcode'),
      productPageUrl: object.get('productPageUrl'),
      imageUrl: object.get('imageUrl'),
      size: object.get('size'),
      lastCrawlDateTime: object.get('lastCrawlDateTime'),
      storeTags: storeTags,
      storeTagIds: storeTags ? storeTags.map(function (storeTag) {
        return storeTag.get('id');
      }) : (0, _immutable.List)(),
      store: store.getInfo(),
      storeId: store.getId(),
      createdByCrawler: object.get('createdByCrawler')
    });
  };
};

exports.default = StoreProduct;