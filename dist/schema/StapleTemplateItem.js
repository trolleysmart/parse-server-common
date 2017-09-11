'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _StapleTemplate = require('./StapleTemplate');

var _StapleTemplate2 = _interopRequireDefault(_StapleTemplate);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StapleTemplateItem = function (_BaseObject) {
  _inherits(StapleTemplateItem, _BaseObject);

  function StapleTemplateItem(object) {
    _classCallCheck(this, StapleTemplateItem);

    var _this = _possibleConstructorReturn(this, (StapleTemplateItem.__proto__ || Object.getPrototypeOf(StapleTemplateItem)).call(this, object, 'StapleTemplateItem'));

    _initialiseProps.call(_this);

    return _this;
  }

  return StapleTemplateItem;
}(_microBusinessParseServerCommon.BaseObject);

StapleTemplateItem.spawn = function (info) {
  var object = new StapleTemplateItem();

  StapleTemplateItem.updateInfoInternal(object, info);

  return object;
};

StapleTemplateItem.updateInfoInternal = function (object, info) {
  object.set('name', info.get('name'));
  object.set('description', info.get('description'));
  object.set('imageUrl', info.get('imageUrl'));
  object.set('popular', info.get('popular'));
  _microBusinessParseServerCommon.BaseObject.createArrayPointer(object, info, 'stapleTemplate', _StapleTemplate2.default);
  _microBusinessParseServerCommon.BaseObject.createArrayPointer(object, info, 'tag', _Tag2.default);
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    StapleTemplateItem.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var stapleTemplateObjects = object.get('stapleTemplates');
    var stapleTemplates = stapleTemplateObjects ? _immutable2.default.fromJS(stapleTemplateObjects).map(function (stapleTemplate) {
      return new _StapleTemplate2.default(stapleTemplate).getInfo();
    }) : undefined;
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
      stapleTemplates: stapleTemplates,
      stapleTemplateIds: stapleTemplates ? stapleTemplates.map(function (stapleTemplate) {
        return stapleTemplate.get('id');
      }) : (0, _immutable.List)(),
      tags: tags,
      tagIds: tags ? tags.map(function (tag) {
        return tag.get('id');
      }) : (0, _immutable.List)()
    });
  };
};

exports.default = StapleTemplateItem;