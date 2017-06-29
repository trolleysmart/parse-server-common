'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMasterProductPriceInfo = createMasterProductPriceInfo;
exports.createMasterProductPrice = createMasterProductPrice;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

var _MasterProduct = require('./MasterProduct.test');

var _Store = require('./Store.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMasterProductPriceInfo(masterProductId, storeId) {
  return (0, _immutable.Map)({
    description: (0, _v2.default)(),
    storeName: (0, _v2.default)(),
    priceDetails: (0, _immutable.Map)({
      price: (0, _v2.default)()
    }),
    priceToDisplay: 12.34,
    lastPriceDetailsUpdate: new Date(),
    status: 'A',
    masterProductId: masterProductId || (0, _MasterProduct.createMasterProduct)().getId(),
    storeId: storeId || (0, _Store.createStore)().getId()
  });
}

function createMasterProductPrice(masterProductPriceInfo) {
  return _.MasterProductPrice.spawn(masterProductPriceInfo || createMasterProductPriceInfo());
}

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo) {
  expect(masterProductPriceInfo.get('description')).toBe(expectedMasterProductPriceInfo.get('description'));
  expect(masterProductPriceInfo.get('storeName')).toBe(expectedMasterProductPriceInfo.get('storeName'));
  expect(masterProductPriceInfo.get('priceDetails')).toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
  expect(masterProductPriceInfo.get('priceToDisplay')).toEqual(expectedMasterProductPriceInfo.get('priceToDisplay'));
  expect(masterProductPriceInfo.get('lastPriceDetailsUpdate')).toEqual(expectedMasterProductPriceInfo.get('lastPriceDetailsUpdate'));
  expect(masterProductPriceInfo.get('status')).toEqual(expectedMasterProductPriceInfo.get('status'));
  expect(masterProductPriceInfo.get('masterProductId')).toBe(expectedMasterProductPriceInfo.get('masterProductId'));
  expect(masterProductPriceInfo.get('storeId')).toBe(expectedMasterProductPriceInfo.get('storeId'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createMasterProductPrice().className).toBe('MasterProductPrice');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var masterProductPriceInfo = createMasterProductPriceInfo();
    var object = createMasterProductPrice(masterProductPriceInfo);
    var info = object.getInfo();

    expectMasterProductPriceInfo(info, masterProductPriceInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = createMasterProductPrice();

    expect(new _.MasterProductPrice(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createMasterProductPrice();

    expect(new _.MasterProductPrice(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createMasterProductPrice();
    var updatedMasterProductPriceInfo = createMasterProductPriceInfo();

    object.updateInfo(updatedMasterProductPriceInfo);

    var info = object.getInfo();

    expectMasterProductPriceInfo(info, updatedMasterProductPriceInfo);
  });

  test('getInfo should return provided info', function () {
    var masterProductPriceInfo = createMasterProductPriceInfo();
    var object = createMasterProductPrice(masterProductPriceInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectMasterProductPriceInfo(info, masterProductPriceInfo);
  });
});