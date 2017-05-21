'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Store = function (_BaseObject) {
  _inherits(Store, _BaseObject);

  function Store(object) {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this, object, 'Store'));

    _initialiseProps.call(_this);

    return _this;
  }

  return Store;
}(_microBusinessParseServerCommon.BaseObject);

Store.spawn = function (info) {
  var object = new Store();

  Store.updateInfoInternal(object, info);

  return object;
};

Store.updateInfoInternal = function (object, info) {
  object.set('name', info.get('name'));
  object.set('imageUrl', info.get('imageUrl'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    Store.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: _this2.getObject().get('name'),
      imageUrl: _this2.getObject().get('imageUrl')
    });
  };
};

exports.default = Store;