'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStapleShoppingListInfo = createStapleShoppingListInfo;
exports.createStapleShoppingList = createStapleShoppingList;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStapleShoppingListInfo(userId) {
  return (0, _immutable.Map)({
    userId: userId || (0, _v2.default)(),
    description: (0, _v2.default)()
  });
}

function createStapleShoppingList(stapleShoppingListInfo) {
  return _.StapleShoppingList.spawn(stapleShoppingListInfo || createStapleShoppingListInfo());
}

function expectStapleShoppingListInfo(stapleShoppingListInfo, expectedStapleShoppingListInfo) {
  expect(stapleShoppingListInfo.get('userId')).toBe(expectedStapleShoppingListInfo.get('userId'));
  expect(stapleShoppingListInfo.get('description')).toBe(expectedStapleShoppingListInfo.get('description'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createStapleShoppingList().className).toBe('StapleShoppingList');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var stapleShoppingListInfo = createStapleShoppingListInfo();
    var object = createStapleShoppingList(stapleShoppingListInfo);
    var info = object.getInfo();

    expectStapleShoppingListInfo(info, stapleShoppingListInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _.StapleShoppingList.spawn(createStapleShoppingListInfo());

    expect(new _.StapleShoppingList(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createStapleShoppingList();

    expect(new _.StapleShoppingList(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createStapleShoppingList();
    var updatedStoreInfo = createStapleShoppingListInfo();

    object.updateInfo(updatedStoreInfo);

    var info = object.getInfo();

    expectStapleShoppingListInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', function () {
    var storeInfo = createStapleShoppingListInfo();
    var object = createStapleShoppingList(storeInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleShoppingListInfo(info, storeInfo);
  });
});