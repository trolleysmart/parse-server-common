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
  object.set('masterProduct', _MasterProduct2.default.createWithoutData(info.get('masterProductId')));
  object.set('masterProductDescription', info.get('masterProductDescription'));
  object.set('store', _Store2.default.createWithoutData(info.get('storeId')));
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
      masterProductDescription: _this2.getObject().get('masterProductDescription'),
      store: store.getInfo(),
      storeId: store.getId(),
      priceDetails: _immutable2.default.fromJS(_this2.getObject().get('priceDetails')),
      capturedDate: _this2.getObject().get('capturedDate')
    });
  };
};

exports.default = MasterProductPrice;