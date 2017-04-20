'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterProductPrice = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _masterProduct = require('./master-product');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasterProductPrice = function (_BaseObject) {
  _inherits(MasterProductPrice, _BaseObject);

  function MasterProductPrice(object) {
    _classCallCheck(this, MasterProductPrice);

    var _this = _possibleConstructorReturn(this, (MasterProductPrice.__proto__ || Object.getPrototypeOf(MasterProductPrice)).call(this, object, 'MasterProductPrice'));

    _this.getMasterProduct = _this.getMasterProduct.bind(_this);
    _this.getPriceDetails = _this.getPriceDetails.bind(_this);
    return _this;
  }

  _createClass(MasterProductPrice, [{
    key: 'getMasterProduct',
    value: function getMasterProduct() {
      return new _masterProduct.MasterProduct(this.getObject().get('masterProduct'));
    }
  }, {
    key: 'getPriceDetails',
    value: function getPriceDetails() {
      return _immutable2.default.fromJS(this.getObject().get('priceDetails'));
    }
  }], [{
    key: 'spawn',
    value: function spawn(masterProductId, priceDetails) {
      var object = new MasterProductPrice();

      object.set('masterProduct', _masterProduct.MasterProduct.createWithoutData(masterProductId));
      object.set('priceDetails', priceDetails);

      return object;
    }
  }]);

  return MasterProductPrice;
}(_microBusinessParseServerCommon.BaseObject);

exports.MasterProductPrice = MasterProductPrice;
exports.default = MasterProductPrice;