'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShoppingListInfo = createShoppingListInfo;
exports.createShoppingList = createShoppingList;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _MasterProductPrice = require('./MasterProductPrice.test');

var _StapleShoppingList = require('./StapleShoppingList.test');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId) {
  return (0, _immutable.Map)({
    userId: userId || (0, _v2.default)(),
    doneDate: new Date(),
    stapleShoppingListId: stapleShoppingListId || (0, _StapleShoppingList.createStapleShoppingList)(userId).getId(),
    masterProductPriceId: masterProductPriceId || (0, _MasterProductPrice.createMasterProductPrice)(userId).getId()
  });
}

function createShoppingList(shoppingListInfo) {
  return _.ShoppingList.spawn(shoppingListInfo || createShoppingListInfo());
}

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo) {
  expect(shoppingListInfo.get('userId')).toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('doneDate')).toBe(expectedShoppingListInfo.get('doneDate'));
  expect(shoppingListInfo.get('stapleShoppingListId')).toBe(expectedShoppingListInfo.get('stapleShoppingListId'));
  expect(shoppingListInfo.get('masterProductPriceId')).toBe(expectedShoppingListInfo.get('masterProductPriceId'));
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