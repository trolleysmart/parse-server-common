'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMasterProductInfo = createMasterProductInfo;
exports.createMasterProduct = createMasterProduct;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _masterProduct = require('./master-product');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMasterProductInfo() {
  return (0, _immutable.Map)({
    description: (0, _v2.default)(),
    barcode: (0, _v2.default)(),
    imageUrl: (0, _v2.default)()
  });
}

function createMasterProduct(masterProductInfo) {
  return _masterProduct.MasterProduct.spawn(masterProductInfo || createMasterProductInfo());
}

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo) {
  expect(masterProductInfo.get('description')).toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('barcode').some()).toBe(expectedMasterProductInfo.get('barcode'));
  expect(masterProductInfo.get('imageUrl').some()).toBe(expectedMasterProductInfo.get('imageUrl'));
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

    expect(new _masterProduct.MasterProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createMasterProduct();

    expect(new _masterProduct.MasterProduct(object).getId()).toBe(object.id);
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