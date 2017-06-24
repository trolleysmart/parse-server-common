'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreTag = function (_BaseObject) {
  _inherits(StoreTag, _BaseObject);

  function StoreTag(object) {
    _classCallCheck(this, StoreTag);

    var _this = _possibleConstructorReturn(this, (StoreTag.__proto__ || Object.getPrototypeOf(StoreTag)).call(this, object, 'StoreTag'));

    _initialiseProps.call(_this);

    return _this;
  }

  return StoreTag;
}(_microBusinessParseServerCommon.BaseObject);

StoreTag.spawn = function (info) {
  var object = new StoreTag();

  StoreTag.updateInfoInternal(object, info);

  return object;
};

StoreTag.updateInfoInternal = function (object, info) {
  object.set('key', info.get('key'));

  var description = info.get('description');

  object.set('description', description);
  object.set('lowerCaseDescription', description ? description.toLowerCase() : undefined);

  object.set('weight', info.get('weight'));

  if (info.has('paretnId')) {
    var parentId = info.get('paretnId');

    object.set('parent', StoreTag.createWithoutData(parentId));
  } else if (info.has('parent')) {
    var parent = info.get('parent');

    object.set('parent', parent);
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

  if (info.has('tagId')) {
    var tagId = info.get('tagId');

    object.set('tag', _Tag2.default.createWithoutData(tagId));
  } else if (info.has('tag')) {
    var tag = info.get('tag');

    object.set('tag', tag);
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    StoreTag.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var parentObject = _this2.getObject().get('parent');
    var parent = parentObject ? new StoreTag(parentObject).getInfo() : undefined;
    var storeObject = _this2.getObject().get('store');
    var store = storeObject ? new _Store2.default(storeObject).getInfo() : undefined;
    var tagObject = _this2.getObject().get('tag');
    var tag = tagObject ? new _Tag2.default(tagObject).getInfo() : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      key: _this2.getObject().get('key'),
      description: _this2.getObject().get('description'),
      weight: _this2.getObject().get('weight'),
      parent: parent,
      parentId: parent ? parent.get('id') : undefined,
      store: store,
      storeId: store ? store.get('id') : undefined,
      tag: tag,
      tagId: tag ? tag.get('id') : undefined
    });
  };
};

exports.default = StoreTag;