'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreMasterProductInfo = createStoreMasterProductInfo;
exports.createStoreMasterProduct = createStoreMasterProduct;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStoreMasterProductInfo(storeTagIds, storeId, tagId) {
  var info = (0, _immutable.Map)({
    name: (0, _v2.default)(),
    description: (0, _v2.default)(),
    barcode: (0, _v2.default)(),
    productPageUrl: (0, _v2.default)(),
    imageUrl: (0, _v2.default)(),
    lasCrawlDateTime: new Date()
  });

  var infoWithStoreTagIds = storeTagIds ? info.merge({
    storeTagIds: storeTagIds
  }) : info;

  var infoWithStore = storeId ? infoWithStoreTagIds.merge({ storeId: storeId }) : infoWithStoreTagIds;

  return tagId ? infoWithStore.merge({ tagId: tagId }) : infoWithStore;
}

function createStoreMasterProduct(storeStoreMasterProductInfo) {
  return _.StoreMasterProduct.spawn(storeStoreMasterProductInfo || createStoreMasterProductInfo());
}

function expectStoreMasterProductInfo(storeStoreMasterProductInfo, expectedStoreMasterProductInfo) {
  expect(storeStoreMasterProductInfo.get('name')).toBe(expectedStoreMasterProductInfo.get('name'));
  expect(storeStoreMasterProductInfo.get('description')).toBe(expectedStoreMasterProductInfo.get('description'));
  expect(storeStoreMasterProductInfo.get('barcode')).toBe(expectedStoreMasterProductInfo.get('barcode'));
  expect(storeStoreMasterProductInfo.get('productPageUrl')).toBe(expectedStoreMasterProductInfo.get('productPageUrl'));
  expect(storeStoreMasterProductInfo.get('imageUrl')).toBe(expectedStoreMasterProductInfo.get('imageUrl'));
  expect(storeStoreMasterProductInfo.get('lastCrawlDateTime')).toBe(expectedStoreMasterProductInfo.get('lastCrawlDateTime'));
  expect(storeStoreMasterProductInfo.get('storeTags')).toBe(expectedStoreMasterProductInfo.get('storeTags'));
  expect(storeStoreMasterProductInfo.get('storeId')).toBe(expectedStoreMasterProductInfo.get('storeId'));
  expect(storeStoreMasterProductInfo.get('masterProductId')).toBe(expectedStoreMasterProductInfo.get('masterProductId'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createStoreMasterProduct().className).toBe('StoreMasterProduct');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var storeStoreMasterProductInfo = createStoreMasterProductInfo();
    var object = createStoreMasterProduct(storeStoreMasterProductInfo);
    var info = object.getInfo();

    expectStoreMasterProductInfo(info, storeStoreMasterProductInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = createStoreMasterProduct();

    expect(new _.StoreMasterProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createStoreMasterProduct();

    expect(new _.StoreMasterProduct(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createStoreMasterProduct();
    var updatedStoreMasterProductInfo = createStoreMasterProductInfo();

    object.updateInfo(updatedStoreMasterProductInfo);

    var info = object.getInfo();

    expectStoreMasterProductInfo(info, updatedStoreMasterProductInfo);
  });

  test('getInfo should return provided info', function () {
    var storeStoreMasterProductInfo = createStoreMasterProductInfo();
    var object = createStoreMasterProduct(storeStoreMasterProductInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreMasterProductInfo(info, storeStoreMasterProductInfo);
  });
});