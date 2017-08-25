'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var ShoppingList = (function(_BaseObject) {
  _inherits(ShoppingList, _BaseObject);

  function ShoppingList(object) {
    _classCallCheck(this, ShoppingList);

    var _this = _possibleConstructorReturn(this, (ShoppingList.__proto__ || Object.getPrototypeOf(ShoppingList)).call(this, object, 'ShoppingList'));

    _initialiseProps.call(_this);

    return _this;
  }

  return ShoppingList;
})(_microBusinessParseServerCommon.BaseObject);

ShoppingList.spawn = function(info) {
  var object = new ShoppingList();

  ShoppingList.updateInfoInternal(object, info);

  return object;
};

ShoppingList.updateInfoInternal = function(object, info) {
  object.set('name', info.get('name'));

  if (info.has('userId')) {
    var userId = info.get('userId');

    if (userId) {
      object.set('user', _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(userId));
    }
  } else if (info.has('user')) {
    var user = info.get('user');

    if (user) {
      object.set('user', user);
    }
  }

  if (info.has('sharedWithUserIds')) {
    var sharedWithUserIds = info.get('sharedWithUserIds');

    if (sharedWithUserIds.isEmpty()) {
      object.set('sharedWithUsers', []);
    } else {
      object.set(
        'sharedWithUsers',
        sharedWithUserIds
          .map(function(sharedWithUserId) {
            return _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(sharedWithUserId);
          })
          .toArray(),
      );
    }
  } else if (info.has('sharedWithUsers')) {
    var sharedWithUsers = info.get('sharedWithUsers');

    if (sharedWithUsers.isEmpty()) {
      object.set('sharedWithUsers', []);
    } else {
      object.set('sharedWithUsers', sharedWithUsers.toArray());
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function(info) {
    var object = _this2.getObject();

    ShoppingList.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function() {
    var user = _this2.getObject().get('user');
    var sharedWithUsers = _immutable2.default.fromJS(_this2.getObject().get('sharedWithUsers'));

    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: _this2.getObject().get('name'),
      user: user,
      userId: user ? user.id : undefined,
      sharedWithUsers: sharedWithUsers,
      sharedWithUserIds: sharedWithUsers
        ? sharedWithUsers.map(function(sharedWithUser) {
            return sharedWithUser.id;
          })
        : (0, _immutable.List)(),
    });
  };
};

exports.default = ShoppingList;
