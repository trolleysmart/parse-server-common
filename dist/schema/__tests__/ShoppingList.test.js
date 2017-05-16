'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShoppingListInfo = createShoppingListInfo;
exports.createShoppingList = createShoppingList;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createShoppingListInfo(userId) {
  return (0, _immutable.Map)({
    userId: userId || (0, _v2.default)(),
    items: _immutable.List.of((0, _v2.default)(), (0, _v2.default)())
  });
}

function createShoppingList(shoppingListInfo) {
  return _.ShoppingList.spawn(shoppingListInfo || createShoppingListInfo());
}

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo) {
  expect(shoppingListInfo.get('userId')).toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('stapleShoppingList')).toEqual(expectedShoppingListInfo.get('stapleShoppingList'));
  expect(shoppingListInfo.get('masterProductPrices')).toEqual(expectedShoppingListInfo.get('masterProductPrices'));
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
    var object = _.ShoppingList.spawn(createShoppingListInfo());

    expect(new _.ShoppingList(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createShoppingList();

    expect(new _.ShoppingList(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createShoppingList();
    var updatedStoreInfo = createShoppingListInfo();

    object.updateInfo(updatedStoreInfo);

    var info = object.getInfo();

    expectShoppingListInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', function () {
    var shoppingListInfo = createShoppingListInfo();
    var object = createShoppingList(shoppingListInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectShoppingListInfo(info, shoppingListInfo);
  });
});