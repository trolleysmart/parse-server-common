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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasterProductPrice = function (_BaseObject) {
  _inherits(MasterProductPrice, _BaseObject);

  function MasterProductPrice(object) {
    _classCallCheck(this, MasterProductPrice);

    var _this = _possibleConstructorReturn(this, (MasterProductPrice.__proto__ || Object.getPrototypeOf(MasterProductPrice)).call(this, object, 'MasterProductPrice'));

    _initialiseProps.call(_this);

    return _this;
  }

  return MasterProductPrice;
}(_microBusinessParseServerCommon.BaseObject);

MasterProductPrice.spawn = function (info) {
  var object = new MasterProductPrice();

  MasterProductPrice.updateInfoInternal(object, info);

  return object;
};

MasterProductPrice.updateInfoInternal = function (object, info) {
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

  object.set('description', info.get('description'));
  object.set('storeName', info.get('storeName'));
  object.set('priceDetails', info.get('priceDetails').toJS());
  object.set('capturedDate', info.get('capturedDate'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    MasterProductPrice.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var masterProduct = new _MasterProduct2.default(_this2.getObject().get('masterProduct'));
    var store = new _Store2.default(_this2.getObject().get('store'));

    return (0, _immutable.Map)({
      id: _this2.getId(),
      masterProduct: masterProduct.getInfo(),
      masterProductId: masterProduct.getId(),
      description: _this2.getObject().get('description'),
      store: store.getInfo(),
      storeId: store.getId(),
      storeName: _this2.getObject().get('storeName'),
      priceDetails: _immutable2.default.fromJS(_this2.getObject().get('priceDetails')),
      capturedDate: _this2.getObject().get('capturedDate')
    });
  };
};

exports.default = MasterProductPrice;