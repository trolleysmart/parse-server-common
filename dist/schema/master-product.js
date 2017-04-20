'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterProduct = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _monet = require('monet');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasterProduct = function (_BaseObject) {
  _inherits(MasterProduct, _BaseObject);

  function MasterProduct(object) {
    _classCallCheck(this, MasterProduct);

    var _this = _possibleConstructorReturn(this, (MasterProduct.__proto__ || Object.getPrototypeOf(MasterProduct)).call(this, object, 'MasterProduct'));

    _this.getDescription = _this.getDescription.bind(_this);
    _this.getBarcode = _this.getBarcode.bind(_this);
    _this.getImageUrl = _this.getImageUrl.bind(_this);
    return _this;
  }

  _createClass(MasterProduct, [{
    key: 'getDescription',
    value: function getDescription() {
      return this.getObject().get('description');
    }
  }, {
    key: 'getBarcode',
    value: function getBarcode() {
      return _monet.Maybe.fromNull(this.getObject().get('barcode'));
    }
  }, {
    key: 'getImageUrl',
    value: function getImageUrl() {
      return _monet.Maybe.fromNull(this.getObject().get('imageUrl'));
    }
  }], [{
    key: 'spawn',
    value: function spawn(description, barcode, imageUrl) {
      var object = new MasterProduct();

      object.set('description', description);
      object.set('barcode', barcode);
      object.set('imageUrl', imageUrl);

      return object;
    }
  }]);

  return MasterProduct;
}(_microBusinessParseServerCommon.BaseObject);

exports.MasterProduct = MasterProduct;
exports.default = MasterProduct;