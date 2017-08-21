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
  object.set('name', info.get('name'));
  object.set('description', info.get('description'));
  object.set('priceDetails', info.get('priceDetails').toJS());
  object.set('priceToDisplay', info.get('priceToDisplay'));
  object.set('saving', info.get('saving'));
  object.set('savingPercentage', info.get('savingPercentage'));
  object.set('offerEndDate', info.get('offerEndDate'));
  object.set('status', info.get('status'));

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

    ProductPrice.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var store = new _Store2.default(_this2.getObject().get('store'));
    var tagObjects = _this2.getObject().get('tags');
    var tags = tagObjects ? _immutable2.default.fromJS(tagObjects).map(function (tag) {
      return new _Tag2.default(tag).getInfo();
    }) : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: _this2.getObject().get('name'),
      description: _this2.getObject().get('description'),
      priceDetails: _immutable2.default.fromJS(_this2.getObject().get('priceDetails')),
      priceToDisplay: _this2.getObject().get('priceToDisplay'),
      saving: _this2.getObject().get('saving'),
      savingPercentage: _this2.getObject().get('savingPercentage'),
      offerEndDate: _this2.getObject().get('offerEndDate'),
      status: _this2.getObject().get('status'),
      store: store.getInfo(),
      storeId: store.getId(),
      tags: tags,
      tagIds: tags ? tags.map(function (tag) {
        return tag.get('id');
      }) : (0, _immutable.List)()
    });
  };
};

exports.default = ProductPrice;