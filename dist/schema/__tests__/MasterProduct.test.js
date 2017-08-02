'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMasterProductInfo = createMasterProductInfo;
exports.createMasterProduct = createMasterProduct;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMasterProductInfo(tagIds) {
  return (0, _immutable.Map)({
    name: (0, _v2.default)(),
    description: (0, _v2.default)(),
    barcode: (0, _v2.default)(),
    imageUrl: (0, _v2.default)(),
    importedImageUrl: (0, _v2.default)(),
    size: (0, _v2.default)()
  }).merge(tagIds ? (0, _immutable.Map)({ tagIds: tagIds }) : (0, _immutable.Map)());
}

function createMasterProduct(masterProductInfo) {
  return _.MasterProduct.spawn(masterProductInfo || createMasterProductInfo());
}

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo) {
  expect(masterProductInfo.get('name')).toBe(expectedMasterProductInfo.get('name'));
  expect(masterProductInfo.get('description')).toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('barcode')).toBe(expectedMasterProductInfo.get('barcode'));
  expect(masterProductInfo.get('imageUrl')).toBe(expectedMasterProductInfo.get('imageUrl'));
  expect(masterProductInfo.get('importedImageUrl')).toBe(expectedMasterProductInfo.get('importedImageUrl'));
  expect(masterProductInfo.get('size')).toBe(expectedMasterProductInfo.get('size'));
  expect(masterProductInfo.get('tags')).toEqual(expectedMasterProductInfo.get('tags'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createMasterProduct().className).toBe('MasterProduct');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var masterProductInfo = createMasterProductInfo();
    var object = createMasterProduct(masterProductInfo);
    var info = object.getInfo();

    expectMasterProductInfo(info, masterProductInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = createMasterProduct();

    expect(new _.MasterProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createMasterProduct();

    expect(new _.MasterProduct(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createMasterProduct();
    var updatedMasterProductInfo = createMasterProductInfo();

    object.updateInfo(updatedMasterProductInfo);

    var info = object.getInfo();

    expectMasterProductInfo(info, updatedMasterProductInfo);
  });

  test('getInfo should return provided info', function () {
    var masterProductInfo = createMasterProductInfo();
    var object = createMasterProduct(masterProductInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectMasterProductInfo(info, masterProductInfo);
  });
});