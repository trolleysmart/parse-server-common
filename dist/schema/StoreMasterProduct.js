'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _MasterProduct = require('./MasterProduct');

var _MasterProduct2 = _interopRequireDefault(_MasterProduct);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _StoreTag = require('./StoreTag');

var _StoreTag2 = _interopRequireDefault(_StoreTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreMasterProduct = function (_BaseObject) {
  _inherits(StoreMasterProduct, _BaseObject);

  function StoreMasterProduct(object) {
    _classCallCheck(this, StoreMasterProduct);

    var _this = _possibleConstructorReturn(this, (StoreMasterProduct.__proto__ || Object.getPrototypeOf(StoreMasterProduct)).call(this, object, 'StoreMasterProduct'));

    _initialiseProps.call(_this);

    return _this;
  }

  return StoreMasterProduct;
}(_microBusinessParseServerCommon.BaseObject);

StoreMasterProduct.spawn = function (info) {
  var object = new StoreMasterProduct();

  StoreMasterProduct.updateInfoInternal(object, info);

  return object;
};

StoreMasterProduct.updateInfoInternal = function (object, info) {
  object.set('description', info.get('description'));
  object.set('lowerCaseDescription', info.get('description').toLowerCase());
  object.set('barcode', info.get('barcode'));
  object.set('productPageUrl', info.get('productPageUrl'));
  object.set('imageUrl', info.get('imageUrl'));

  if (info.has('storeTagIds')) {
    var storeTagIds = info.get('storeTagIds');

    if (storeTagIds.isEmpty()) {
      object.set('storeTags', []);
    } else {
      object.set('storeTags', storeTagIds.map(function (storeTagId) {
        return _StoreTag2.default.createWithoutData(storeTagId);
      }).toArray());
    }
  } else if (info.has('storeTags')) {
    var storeTags = info.get('storeTags');

    if (storeTags.isEmpty()) {
      object.set('storeTags', []);
    } else {
      object.set('storeTags', storeTags.toArray());
    }
  }

  if (info.has('storeId')) {
    var storeId = info.get('storeId');

    if (storeId) {
      object.set('store', _Store2.default.createWithoutData(storeId));
    }
  } else if (info.has('store')) {
    var store = info.get('store');

    if (store) {
      object.set('store', store);
    }
  }

  if (info.has('masterProductId')) {
    var masterProductId = info.get('masterProductId');

    if (masterProductId) {
      object.set('masterProduct', _MasterProduct2.default.createWithoutData(masterProductId));
    }
  } else if (info.has('masterProduct')) {
    var masterProduct = info.get('masterProduct');

    if (masterProduct) {
      object.set('masterProduct', masterProduct);
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    StoreMasterProduct.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var storeTagObjects = _this2.getObject().get('storeTags');
    var storeTags = storeTagObjects ? _immutable2.default.fromJS(storeTagObjects).map(function (storeTag) {
      return new _StoreTag2.default(storeTag).getInfo();
    }) : undefined;
    var storeObject = _this2.getObject().get('store');
    var store = storeObject ? new _Store2.default(storeObject).getInfo() : undefined;
    var masterProductObject = _this2.getObject().get('masterProduct');
    var masterProduct = masterProductObject ? new _MasterProduct2.default(masterProductObject).getInfo() : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      description: _this2.getObject().get('description'),
      barcode: _this2.getObject().get('barcode'),
      productPageUrl: _this2.getObject().get('productPageUrl'),
      imageUrl: _this2.getObject().get('imageUrl'),
      storeTags: storeTags,
      storeTagIds: storeTags ? storeTags.map(function (storeTag) {
        return storeTag.get('id');
      }) : (0, _immutable.List)(),
      store: store,
      storeId: store ? store.get('id') : undefined,
      masterProduct: masterProduct,
      masterProductId: masterProduct ? masterProduct.get('id') : undefined
    });
  };
};

exports.default = StoreMasterProduct;