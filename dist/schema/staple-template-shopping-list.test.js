'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo;
exports.createStapleTemplateShoppingList = createStapleTemplateShoppingList;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _stapleTemplateShoppingList = require('./staple-template-shopping-list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStapleTemplateShoppingListInfo(stapleTemplateIds) {
  var info = (0, _immutable.Map)({
    description: (0, _v2.default)()
  });

  return stapleTemplateIds ? info.merge({
    stapleTemplateIds: stapleTemplateIds
  }) : info;
}

function createStapleTemplateShoppingList(stapleTemplateShoppingListInfo) {
  return _stapleTemplateShoppingList.StapleTemplateShoppingList.spawn(stapleTemplateShoppingListInfo || createStapleTemplateShoppingListInfo());
}

function expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo) {
  expect(stapleTemplateShoppingListInfo.get('name')).toBe(expectedStapleTemplateShoppingListInfo.get('name'));
  expect(stapleTemplateShoppingListInfo.get('stapleTemplates')).toEqual(expectedStapleTemplateShoppingListInfo.get('stapleTemplates'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createStapleTemplateShoppingList().className).toBe('StapleTemplateShoppingList');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var stapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();
    var object = createStapleTemplateShoppingList(stapleTemplateShoppingListInfo);
    var info = object.getInfo();

    expectStapleTemplateShoppingListInfo(info, stapleTemplateShoppingListInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _stapleTemplateShoppingList.StapleTemplateShoppingList.spawn(createStapleTemplateShoppingListInfo());

    expect(new _stapleTemplateShoppingList.StapleTemplateShoppingList(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createStapleTemplateShoppingList();

    expect(new _stapleTemplateShoppingList.StapleTemplateShoppingList(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createStapleTemplateShoppingList();
    var updatedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();

    object.updateInfo(updatedStapleTemplateShoppingListInfo);

    var info = object.getInfo();

    expectStapleTemplateShoppingListInfo(info, updatedStapleTemplateShoppingListInfo);
  });

  test('getInfo should return provided info', function () {
    var stapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();
    var object = createStapleTemplateShoppingList(stapleTemplateShoppingListInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleTemplateShoppingListInfo(info, stapleTemplateShoppingListInfo);
  });
});