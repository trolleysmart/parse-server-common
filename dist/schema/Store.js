'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  object.set('key', info.get('key'));
  _microBusinessParseServerCommon.BaseObject.createStringColumn(object, info, 'name');
  object.set('imageUrl', info.get('imageUrl'));
  object.set('address', info.get('address'));

  if (info.has('phones')) {
    var phones = info.get('phones');

    if (phones) {
      object.set('phones', phones.toJS());
    }
  }

  object.set('geoLocation', info.get('geoLocation'));
  object.set('openFrom', info.get('openFrom'));
  object.set('openUntil', info.get('openUntil'));
  object.set('forDisplay', info.get('forDisplay'));
  _microBusinessParseServerCommon.BaseObject.createPointer(object, info, 'parentStore', Store);
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    Store.updateInfoInternal(_this2.getObject(), info);

    return _this2;
  };

  this.getInfo = function () {
    var object = _this2.getObject();
    var parentStoreObject = object.get('parentStore');
    var parentStore = parentStoreObject ? new Store(parentStoreObject) : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      key: object.get('key'),
      name: object.get('name'),
      imageUrl: object.get('imageUrl'),
      address: object.get('address'),
      phones: _immutable2.default.fromJS(object.get('phones')),
      geoLocation: object.get('geoLocation'),
      openFrom: object.get('openFrom'),
      openUntil: object.get('openUntil'),
      forDisplay: object.get('forDisplay'),
      parentStore: parentStore ? parentStore.getInfo() : undefined,
      parentStoreId: parentStore ? parentStore.getId() : undefined
    });
  };
};

exports.default = Store;