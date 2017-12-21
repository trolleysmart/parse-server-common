'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _parseServerCommon = require('@microbusiness/parse-server-common');

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
}(_parseServerCommon.BaseObject);

StoreTag.spawn = function (info) {
  var object = new StoreTag();

  StoreTag.updateInfoInternal(object, info);

  return object;
};

StoreTag.updateInfoInternal = function (object, info) {
  object.set('key', info.get('key'));
  _parseServerCommon.BaseObject.createStringColumn(object, info, 'name');
  _parseServerCommon.BaseObject.createStringColumn(object, info, 'description');
  object.set('imageUrl', info.get('imageUrl'));
  object.set('url', info.get('url'));
  object.set('level', info.get('level'));
  _parseServerCommon.BaseObject.createPointer(object, info, 'parentStoreTag', StoreTag);
  _parseServerCommon.BaseObject.createPointer(object, info, 'store', _Store2.default);
  _parseServerCommon.BaseObject.createPointer(object, info, 'tag', _Tag2.default);
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    StoreTag.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var parentStoreTagObject = object.get('parentStoreTag');
    var parentStoreTag = parentStoreTagObject ? new StoreTag(parentStoreTagObject) : undefined;
    var store = new _Store2.default(object.get('store'));
    var tag = new _Tag2.default(object.get('tag'));

    return (0, _immutable.Map)({
      id: _this2.getId(),
      key: object.get('key'),
      name: object.get('name'),
      description: object.get('description'),
      imageUrl: object.get('imageUrl'),
      url: object.get('url'),
      level: object.get('level'),
      parentStoreTag: parentStoreTag ? parentStoreTag.getInfo() : undefined,
      parentStoreTagId: parentStoreTag ? parentStoreTag.getId() : undefined,
      store: store.getInfo(),
      storeId: store.getId(),
      tag: tag.getInfo(),
      tagId: tag.getId()
    });
  };
};

exports.default = StoreTag;