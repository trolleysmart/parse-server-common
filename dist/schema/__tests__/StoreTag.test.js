'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreTagInfo = createStoreTagInfo;
exports.createStoreTag = createStoreTag;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStoreTagInfo(storeId, tagId) {
  var info = (0, _immutable.Map)({
    key: (0, _v2.default)(),
    description: (0, _v2.default)(),
    weight: 1
  });

  var infoWithStore = storeId ? info.merge({ storeId: storeId }) : info;

  return tagId ? infoWithStore.merge({ tagId: tagId }) : infoWithStore;
}

function createStoreTag(storeTagInfo) {
  return _.StoreTag.spawn(storeTagInfo || createStoreTagInfo());
}

function expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo) {
  expect(storeTagInfo.get('key')).toBe(expectedStoreTagInfo.get('key'));
  expect(storeTagInfo.get('description')).toBe(expectedStoreTagInfo.get('description'));
  expect(storeTagInfo.get('weight')).toBe(expectedStoreTagInfo.get('weight'));
  expect(storeTagInfo.get('storeId')).toEqual(expectedStoreTagInfo.get('storeId'));
  expect(storeTagInfo.get('tagId')).toEqual(expectedStoreTagInfo.get('tagId'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createStoreTag().className).toBe('StoreTag');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var storeTagInfo = createStoreTagInfo();
    var object = createStoreTag(storeTagInfo);
    var info = object.getInfo();

    expectStoreTagInfo(info, storeTagInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _.StoreTag.spawn(createStoreTagInfo());

    expect(new _.StoreTag(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createStoreTag();

    expect(new _.StoreTag(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createStoreTag();
    var updatedStoreTagInfo = createStoreTagInfo();

    object.updateInfo(updatedStoreTagInfo);

    var info = object.getInfo();

    expectStoreTagInfo(info, updatedStoreTagInfo);
  });

  test('getInfo should return provided info', function () {
    var storeTagInfo = createStoreTagInfo();
    var object = createStoreTag(storeTagInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreTagInfo(info, storeTagInfo);
  });
});