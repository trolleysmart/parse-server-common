'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterProduct = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _tag = require('./tag');

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
      object.set('barcode', info.get('barcode'));
      object.set('imageUrl', info.get('imageUrl'));

      if (info.has('tagIds')) {
        var tagIds = info.get('tagIds');

        if (!tagIds.isEmpty()) {
          object.set('tags', tagIds.map(function (tagId) {
            return _tag.Tag.createWithoutData(tagId);
          }).toArray());
        }
      } else if (info.has('tags')) {
        var tags = info.get('tags');

        if (!tags.isEmpty()) {
          object.set('tags', tags.toArray());
        }
      }
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
      var tagObjects = this.getObject().get('tags');
      var tags = tagObjects ? _immutable2.default.fromJS(tagObjects).map(function (tag) {
        return new _tag.Tag(tag).getInfo();
      }) : undefined;

      return (0, _immutable.Map)({
        id: this.getId(),
        description: this.getObject().get('description'),
        barcode: this.getObject().get('barcode'),
        imageUrl: this.getObject().get('imageUrl'),
        tags: tags,
        tagIds: tags ? tags.map(function (tag) {
          return tag.get('id');
        }) : (0, _immutable.List)()
      });
    }
  }]);

  return MasterProduct;
}(_microBusinessParseServerCommon.BaseObject);

exports.MasterProduct = MasterProduct;
exports.default = MasterProduct;