'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

var StapleShoppingListTemplate = (function(_BaseObject) {
  _inherits(StapleShoppingListTemplate, _BaseObject);

  function StapleShoppingListTemplate(object) {
    _classCallCheck(this, StapleShoppingListTemplate);

    var _this = _possibleConstructorReturn(
      this,
      (StapleShoppingListTemplate.__proto__ || Object.getPrototypeOf(StapleShoppingListTemplate)).call(this, object, 'StapleShoppingListTemplate'),
    );

    _initialiseProps.call(_this);

    return _this;
  }

  return StapleShoppingListTemplate;
})(_microBusinessParseServerCommon.BaseObject);

StapleShoppingListTemplate.spawn = function(info) {
  var object = new StapleShoppingListTemplate();

  StapleShoppingListTemplate.updateInfoInternal(object, info);

  return object;
};

StapleShoppingListTemplate.updateInfoInternal = function(object, info) {
  object.set('name', info.get('name'));
  object.set('description', info.get('description'));
  object.set('imageUrl', info.get('imageUrl'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function(info) {
    var object = _this2.getObject();

    StapleShoppingListTemplate.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function() {
    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: _this2.getObject().get('name'),
      description: _this2.getObject().get('description'),
      imageUrl: _this2.getObject().get('imageUrl'),
    });
  };
};

exports.default = StapleShoppingListTemplate;
