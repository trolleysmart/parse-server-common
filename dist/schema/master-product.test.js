'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _masterProduct = require('./master-product');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('should set class name', function () {
    expect(_masterProduct.MasterProduct.spawn('key', 'config').className).toBe('MasterProduct');
  });
});

describe('static public methods', function () {
  test('spawn should set provided description', function () {
    var expectedValue = (0, _v2.default)();

    expect(_masterProduct.MasterProduct.spawn(expectedValue, 'barcode', 'imageUrl').get('description')).toBe(expectedValue);
  });

  test('spawn should set provided barcode', function () {
    var expectedValue = (0, _v2.default)();

    expect(_masterProduct.MasterProduct.spawn('description', expectedValue, 'imageUrl').get('barcode')).toBe(expectedValue);
  });

  test('spawn should set provided imageUrl', function () {
    var expectedValue = (0, _v2.default)();

    expect(_masterProduct.MasterProduct.spawn('description', 'barcode', expectedValue).get('imageUrl')).toBe(expectedValue);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _masterProduct.MasterProduct.spawn('description', 'barcode', 'imageUrl');

    expect(new _masterProduct.MasterProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = _masterProduct.MasterProduct.spawn('description', 'barcode', 'imageUrl');

    expect(new _masterProduct.MasterProduct(object).getId()).toBe(object.id);
  });

  test('getDescription should return provided description', function () {
    var expectedValue = (0, _v2.default)();
    var object = _masterProduct.MasterProduct.spawn(expectedValue, 'barcode', 'imageUrl');

    expect(new _masterProduct.MasterProduct(object).getDescription()).toBe(expectedValue);
  });

  test('getBarcode should return provided barcode', function () {
    var expectedValue = (0, _v2.default)();
    var object = _masterProduct.MasterProduct.spawn('description', expectedValue, 'imageUrl');

    expect(new _masterProduct.MasterProduct(object).getBarcode().some()).toBe(expectedValue);
  });

  test('getImageUrl should return provided imageUrl;', function () {
    var expectedValue = (0, _v2.default)();
    var object = _masterProduct.MasterProduct.spawn('description', 'barcode', expectedValue);

    expect(new _masterProduct.MasterProduct(object).getImageUrl().some()).toBe(expectedValue);
  });
});