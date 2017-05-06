'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShoppingListInfo = createShoppingListInfo;
exports.createShoppingList = createShoppingList;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _shoppingList = require('./shopping-list');

var _shoppingList2 = _interopRequireDefault(_shoppingList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createShoppingListInfo(userId) {
  return (0, _immutable.Map)({
    userId: userId || (0, _v2.default)(),
    items: _immutable.List.of((0, _v2.default)(), (0, _v2.default)())
  });
}

function createShoppingList(shoppingListInfo) {
  return _shoppingList2.default.spawn(shoppingListInfo || createShoppingListInfo());
}

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo) {
  expect(shoppingListInfo.get('userId')).toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('items')).toEqual(expectedShoppingListInfo.get('items'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createShoppingList().className).toBe('ShoppingList');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var shoppingListInfo = createShoppingListInfo();
    var object = createShoppingList(shoppingListInfo);
    var info = object.getInfo();

    expectShoppingListInfo(info, shoppingListInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _shoppingList2.default.spawn(createShoppingListInfo());

    expect(new _shoppingList2.default(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createShoppingList();

    expect(new _shoppingList2.default(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createShoppingList();
    var updatedStoreInfo = createShoppingListInfo();

    object.updateInfo(updatedStoreInfo);

    var info = object.getInfo();

    expectShoppingListInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', function () {
    var storeInfo = createShoppingListInfo();
    var object = createShoppingList(storeInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectShoppingListInfo(info, storeInfo);
  });
});