'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createLightWeigthProductPriceInfo = createLightWeigthProductPriceInfo;
exports.createProductPrice = createProductPrice;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

var _Store = require('./Store.test');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createLightWeigthProductPriceInfo() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    storeId = _ref.storeId,
    tagIds = _ref.tagIds;

  return (0, _immutable.Map)({
    name: (0, _v2.default)(),
    description: (0, _v2.default)(),
    priceDetails: (0, _immutable.Map)({
      price: 10.56,
    }),
    priceToDisplay: 12.34,
    saving: 2.3,
    savingPercentage: 12,
    offerEndDate: new Date(),
    status: 'A',
    storeId: storeId || (0, _Store.createStore)().getId(),
  }).merge(tagIds ? (0, _immutable.Map)({ tagIds: tagIds }) : (0, _immutable.Map)());
}

function createProductPrice(productPriceInfo) {
  return _.ProductPrice.spawn(productPriceInfo || createLightWeigthProductPriceInfo());
}

function expectProductPriceInfo(productPriceInfo, expectedProductPriceInfo) {
  expect(productPriceInfo.get('name')).toBe(expectedProductPriceInfo.get('name'));
  expect(productPriceInfo.get('description')).toBe(expectedProductPriceInfo.get('description'));
  expect(productPriceInfo.get('priceDetails')).toEqual(expectedProductPriceInfo.get('priceDetails'));
  expect(productPriceInfo.get('priceToDisplay')).toEqual(expectedProductPriceInfo.get('priceToDisplay'));
  expect(productPriceInfo.get('saving')).toEqual(expectedProductPriceInfo.get('saving'));
  expect(productPriceInfo.get('savingPercentage')).toEqual(expectedProductPriceInfo.get('savingPercentage'));
  expect(productPriceInfo.get('offerEndDate')).toEqual(expectedProductPriceInfo.get('offerEndDate'));
  expect(productPriceInfo.get('status')).toEqual(expectedProductPriceInfo.get('status'));
  expect(productPriceInfo.get('storeId')).toBe(expectedProductPriceInfo.get('storeId'));
  expect(productPriceInfo.get('tags')).toEqual(expectedProductPriceInfo.get('tags'));
}

describe('constructor', function() {
  test('should set class name', function() {
    expect(createProductPrice().className).toBe('ProductPrice');
  });
});

describe('static public methods', function() {
  test('spawn should set provided info', function() {
    var productPriceInfo = createLightWeigthProductPriceInfo();
    var object = createProductPrice(productPriceInfo);
    var info = object.getInfo();

    expectProductPriceInfo(info, productPriceInfo);
  });
});

describe('public methods', function() {
  test('getObject should return provided object', function() {
    var object = createProductPrice();

    expect(new _.ProductPrice(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function() {
    var object = createProductPrice();

    expect(new _.ProductPrice(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function() {
    var object = createProductPrice();
    var updatedProductPriceInfo = createLightWeigthProductPriceInfo();

    object.updateInfo(updatedProductPriceInfo);

    var info = object.getInfo();

    expectProductPriceInfo(info, updatedProductPriceInfo);
  });

  test('getInfo should return provided info', function() {
    var productPriceInfo = createLightWeigthProductPriceInfo();
    var object = createProductPrice(productPriceInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectProductPriceInfo(info, productPriceInfo);
  });
});
