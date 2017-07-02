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

  var name = info.get('name');

  object.set('name', name);
  object.set('lowerCaseName', name ? name.toLowerCase() : undefined);

  object.set('url', info.get('url'));
  object.set('weight', info.get('weight'));

  if (info.has('storeTagIds')) {
    var storeTagIds = info.get('storeTagIds');

    if (storeTagIds.isEmpty()) {
      object.set('storeTags', []);
    } else {
      object.set('storeTags', storeTagIds.map(function (storeTagId) {
        return StoreTag.createWithoutData(storeTagId);
      }).toArray());
    }
  } else if (info.has('storeTags')) {
    var storeTags = info.get('storeTags');

    if (storeTags.isEmpty()) {
      object.set('storeTags', []);
    } else {
      object.set('storeTags', storeTags.toArray());
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

  if (info.has('tagId')) {
    var tagId = info.get('tagId');

    if (tagId) {
      object.set('tag', _Tag2.default.createWithoutData(tagId));
    }
  } else if (info.has('tag')) {
    var tag = info.get('tag');

    if (tag) {
      object.set('tag', tag);
    }
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
    var storeTagObjects = _this2.getObject().get('storeTags');
    var storeTags = storeTagObjects ? _immutable2.default.fromJS(storeTagObjects).map(function (storeTag) {
      return new StoreTag(storeTag).getInfo();
    }) : undefined;
    var storeObject = _this2.getObject().get('store');
    var store = storeObject ? new _Store2.default(storeObject).getInfo() : undefined;
    var tagObject = _this2.getObject().get('tag');
    var tag = tagObject ? new _Tag2.default(tagObject).getInfo() : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      key: _this2.getObject().get('key'),
      name: _this2.getObject().get('name'),
      weight: _this2.getObject().get('weight'),
      url: _this2.getObject().get('url'),
      storeTags: storeTags,
      storeTagIds: storeTags ? storeTags.map(function (storeTag) {
        return storeTag.get('id');
      }) : (0, _immutable.List)(),
      store: store,
      storeId: store ? store.get('id') : undefined,
      tag: tag,
      tagId: tag ? tag.get('id') : undefined
    });
  };
};

exports.default = StoreTag;