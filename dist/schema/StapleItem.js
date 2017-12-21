'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _StapleTemplateItem = require('./StapleTemplateItem');

var _StapleTemplateItem2 = _interopRequireDefault(_StapleTemplateItem);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StapleItem = function (_BaseObject) {
  _inherits(StapleItem, _BaseObject);

  function StapleItem(object) {
    _classCallCheck(this, StapleItem);

    var _this = _possibleConstructorReturn(this, (StapleItem.__proto__ || Object.getPrototypeOf(StapleItem)).call(this, object, 'StapleItem'));

    _initialiseProps.call(_this);

    return _this;
  }

  return StapleItem;
}(_parseServerCommon.BaseObject);

StapleItem.spawn = function (info) {
  var object = new StapleItem();

  StapleItem.updateInfoInternal(object, info);

  return object;
};

StapleItem.updateInfoInternal = function (object, info) {
  _parseServerCommon.BaseObject.createStringColumn(object, info, 'name');
  _parseServerCommon.BaseObject.createStringColumn(object, info, 'description');
  object.set('imageUrl', info.get('imageUrl'));
  object.set('popular', info.get('popular'));
  _parseServerCommon.BaseObject.createUserPointer(object, info, 'user');
  _parseServerCommon.BaseObject.createPointer(object, info, 'stapleTemplateItem', _StapleTemplateItem2.default);
  _parseServerCommon.BaseObject.createArrayPointer(object, info, 'tag', _Tag2.default);
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    StapleItem.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var stapleTemplateItem = new _StapleTemplateItem2.default(object.get('stapleTemplateItem'));
    var user = object.get('user');
    var tagObjects = object.get('tags');
    var tags = tagObjects ? _immutable2.default.fromJS(tagObjects).map(function (tag) {
      return new _Tag2.default(tag).getInfo();
    }) : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: object.get('name'),
      description: object.get('description'),
      imageUrl: object.get('imageUrl'),
      popular: object.get('popular'),
      user: user,
      userId: user ? user.id : undefined,
      stapleTemplateItem: stapleTemplateItem.getInfo(),
      stapleTemplateItemId: stapleTemplateItem.getId(),
      tags: tags,
      tagIds: tags ? tags.map(function (tag) {
        return tag.get('id');
      }) : (0, _immutable.List)()
    });
  };
};

exports.default = StapleItem;