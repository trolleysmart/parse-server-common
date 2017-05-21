'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasterProduct = function (_BaseObject) {
  _inherits(MasterProduct, _BaseObject);

  function MasterProduct(object) {
    _classCallCheck(this, MasterProduct);

    var _this = _possibleConstructorReturn(this, (MasterProduct.__proto__ || Object.getPrototypeOf(MasterProduct)).call(this, object, 'MasterProduct'));

    _initialiseProps.call(_this);

    return _this;
  }

  return MasterProduct;
}(_microBusinessParseServerCommon.BaseObject);

MasterProduct.spawn = function (info) {
  var object = new MasterProduct();

  MasterProduct.updateInfoInternal(object, info);

  return object;
};

MasterProduct.updateInfoInternal = function (object, info) {
  object.set('description', info.get('description'));
  object.set('barcode', info.get('barcode'));
  object.set('imageUrl', info.get('imageUrl'));

  if (info.has('tagIds')) {
    var tagIds = info.get('tagIds');

    if (tagIds.isEmpty()) {
      object.set('tags', []);
    } else {
      object.set('tags', tagIds.map(function (tagId) {
        return _Tag2.default.createWithoutData(tagId);
      }).toArray());
    }
  } else if (info.has('tags')) {
    var tags = info.get('tags');

    if (tags.isEmpty()) {
      object.set('tags', []);
    } else {
      object.set('tags', tags.toArray());
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    MasterProduct.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var tagObjects = _this2.getObject().get('tags');
    var tags = tagObjects ? _immutable2.default.fromJS(tagObjects).map(function (tag) {
      return new _Tag2.default(tag).getInfo();
    }) : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      description: _this2.getObject().get('description'),
      barcode: _this2.getObject().get('barcode'),
      imageUrl: _this2.getObject().get('imageUrl'),
      tags: tags,
      tagIds: tags ? tags.map(function (tag) {
        return tag.get('id');
      }) : (0, _immutable.List)()
    });
  };
};

exports.default = MasterProduct;