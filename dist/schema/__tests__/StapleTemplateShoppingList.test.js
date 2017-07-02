'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo;
exports.createStapleTemplateShoppingList = createStapleTemplateShoppingList;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStapleTemplateShoppingListInfo(stapleTemplateIds, tagIds) {
  var info = (0, _immutable.Map)({
    name: (0, _v2.default)()
  });

  var infoWithStapleTemplateIds = stapleTemplateIds ? info.merge({
    stapleTemplateIds: stapleTemplateIds
  }) : info;

  return tagIds ? infoWithStapleTemplateIds.merge({
    tagIds: tagIds
  }) : infoWithStapleTemplateIds;
}

function createStapleTemplateShoppingList(stapleTemplateShoppingListInfo) {
  return _.StapleTemplateShoppingList.spawn(stapleTemplateShoppingListInfo || createStapleTemplateShoppingListInfo());
}

function expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo) {
  expect(stapleTemplateShoppingListInfo.get('name')).toBe(expectedStapleTemplateShoppingListInfo.get('name'));
  expect(stapleTemplateShoppingListInfo.get('stapleTemplates')).toEqual(expectedStapleTemplateShoppingListInfo.get('stapleTemplates'));
  expect(stapleTemplateShoppingListInfo.get('tags')).toEqual(expectedStapleTemplateShoppingListInfo.get('tags'));
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
    var object = _.StapleTemplateShoppingList.spawn(createStapleTemplateShoppingListInfo());

    expect(new _.StapleTemplateShoppingList(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createStapleTemplateShoppingList();

    expect(new _.StapleTemplateShoppingList(object).getId()).toBe(object.id);
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