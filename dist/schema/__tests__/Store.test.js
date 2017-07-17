'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreInfo = createStoreInfo;
exports.createStore = createStore;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStoreInfo() {
  return (0, _immutable.Map)({
    key: (0, _v2.default)(),
    name: (0, _v2.default)(),
    imageUrl: (0, _v2.default)()
  });
}

function createStore(storeInfo) {
  return _.Store.spawn(storeInfo || createStoreInfo());
}

function expectStoreInfo(storeInfo, expectedStoreInfo) {
  expect(storeInfo.get('key')).toBe(expectedStoreInfo.get('key'));
  expect(storeInfo.get('name')).toBe(expectedStoreInfo.get('name'));
  expect(storeInfo.get('imageUrl')).toBe(expectedStoreInfo.get('imageUrl'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createStore().className).toBe('Store');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var storeInfo = createStoreInfo();
    var object = createStore(storeInfo);
    var info = object.getInfo();

    expectStoreInfo(info, storeInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _.Store.spawn(createStoreInfo());

    expect(new _.Store(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createStore();

    expect(new _.Store(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createStore();
    var updatedStoreInfo = createStoreInfo();

    object.updateInfo(updatedStoreInfo);

    var info = object.getInfo();

    expectStoreInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', function () {
    var storeInfo = createStoreInfo();
    var object = createStore(storeInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreInfo(info, storeInfo);
  });
});