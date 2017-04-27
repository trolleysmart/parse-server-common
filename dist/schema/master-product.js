'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterProduct = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _monet = require('monet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasterProduct = function (_BaseObject) {
  _inherits(MasterProduct, _BaseObject);

  _createClass(MasterProduct, null, [{
    key: 'spawn',
    value: function spawn(info) {
      var object = new MasterProduct();

      MasterProduct.updateInfoInternal(object, info);

      return object;
    }
  }, {
    key: 'updateInfoInternal',
    value: function updateInfoInternal(object, info) {
      object.set('description', info.get('description'));
      object.set('barcode', info.get('barcode').orSome(undefined));
      object.set('imageUrl', info.get('imageUrl').orSome(undefined));
      object.set('tags', info.get('tags').orSome((0, _immutable.List)()).toJS());
    }
  }]);

  function MasterProduct(object) {
    _classCallCheck(this, MasterProduct);

    var _this = _possibleConstructorReturn(this, (MasterProduct.__proto__ || Object.getPrototypeOf(MasterProduct)).call(this, object, 'MasterProduct'));

    _this.updateInfo = _this.updateInfo.bind(_this);
    _this.getInfo = _this.getInfo.bind(_this);
    return _this;
  }

  _createClass(MasterProduct, [{
    key: 'updateInfo',
    value: function updateInfo(info) {
      var object = this.getObject();

      MasterProduct.updateInfoInternal(object, info);

      return this;
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      return (0, _immutable.Map)({
        id: this.getId(),
        description: this.getObject().get('description'),
        barcode: _monet.Maybe.fromNull(this.getObject().get('barcode')),
        imageUrl: _monet.Maybe.fromNull(this.getObject().get('imageUrl')),
        tags: _monet.Maybe.fromNull(_immutable2.default.fromJS(this.getObject().get('tags')))
      });
    }
  }]);

  return MasterProduct;
}(_microBusinessParseServerCommon.BaseObject);

exports.MasterProduct = MasterProduct;
exports.default = MasterProduct;