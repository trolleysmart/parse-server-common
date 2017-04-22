'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMasterProductPriceInfo = createMasterProductPriceInfo;
exports.createMasterProductPrice = createMasterProductPrice;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _masterProductPrice = require('./master-product-price');

var _masterProduct = require('./master-product.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMasterProductPriceInfo(masterProductId) {
  return (0, _immutable.Map)({
    masterProductId: masterProductId || (0, _masterProduct.createMasterProduct)().getId(),
    priceDetails: (0, _immutable.Map)({
      price: (0, _v2.default)()
    })
  });
}

function createMasterProductPrice(masterProductPriceInfo) {
  return _masterProductPrice.MasterProductPrice.spawn(masterProductPriceInfo || createMasterProductPriceInfo());
}

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo) {
  expect(masterProductPriceInfo.get('masterProduct').getId()).toBe(expectedMasterProductPriceInfo.get('masterProductId'));
  expect(masterProductPriceInfo.get('priceDetails')).toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
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

    expect(new _masterProductPrice.MasterProductPrice(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createMasterProductPrice();

    expect(new _masterProductPrice.MasterProductPrice(object).getId()).toBe(object.id);
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