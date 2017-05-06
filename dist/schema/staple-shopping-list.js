'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StapleShoppingList = function (_BaseObject) {
  _inherits(StapleShoppingList, _BaseObject);

  function StapleShoppingList(object) {
    _classCallCheck(this, StapleShoppingList);

    var _this = _possibleConstructorReturn(this, (StapleShoppingList.__proto__ || Object.getPrototypeOf(StapleShoppingList)).call(this, object, 'StapleShoppingList'));

    _initialiseProps.call(_this);

    return _this;
  }

  return StapleShoppingList;
}(_microBusinessParseServerCommon.BaseObject);

StapleShoppingList.spawn = function (info) {
  var object = new StapleShoppingList();

  StapleShoppingList.updateInfoInternal(object, info);

  return object;
};

StapleShoppingList.updateInfoInternal = function (object, info) {
  object.set('user', _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(info.get('userId')));
  object.set('description', info.get('description'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    StapleShoppingList.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    return (0, _immutable.Map)({
      id: _this2.getId(),
      userId: _this2.getObject().get('user').id,
      description: _this2.getObject().get('description')
    });
  };
};

exports.default = StapleShoppingList;