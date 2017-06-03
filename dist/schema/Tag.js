'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = function (_BaseObject) {
  _inherits(Tag, _BaseObject);

  function Tag(object) {
    _classCallCheck(this, Tag);

    var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, object, 'Tag'));

    _initialiseProps.call(_this);

    return _this;
  }

  return Tag;
}(_microBusinessParseServerCommon.BaseObject);

Tag.spawn = function (info) {
  var object = new Tag();

  Tag.updateInfoInternal(object, info);

  return object;
};

Tag.updateInfoInternal = function (object, info) {
  var key = info.get('key');

  object.set('key', key);
  object.set('lowerCaseKey', key.toLowerCase());

  var description = info.get('description');

  object.set('description', description);
  object.set('lowerCaseDescription', description ? description.toLowerCase() : undefined);

  object.set('weight', info.get('weight'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    Tag.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    return (0, _immutable.Map)({
      id: _this2.getId(),
      key: _this2.getObject().get('key'),
      description: _this2.getObject().get('description'),
      weight: _this2.getObject().get('weight')
    });
  };
};

exports.default = Tag;