'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _masterProduct = require('./master-product');

var _masterProductPrice = require('./master-product-price');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMasterProduct() {
  return _masterProduct.MasterProduct.spawn('description', 'barcode', 'imageUrl');
}

describe('constructor', function () {
  test('should set class name', function () {
    var masterProduct = createMasterProduct();

    expect(_masterProductPrice.MasterProductPrice.spawn(masterProduct.getId(), {}).className).toBe('MasterProductPrice');
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var masterProduct = createMasterProduct();
    var object = _masterProductPrice.MasterProductPrice.spawn(masterProduct.getId(), {});

    expect(new _masterProduct.MasterProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var masterProduct = createMasterProduct();
    var object = _masterProductPrice.MasterProductPrice.spawn(masterProduct.getId(), {});

    expect(new _masterProduct.MasterProduct(object).getId()).toBe(object.id);
  });

  test('getMasterProduct should return provided crawl session', function () {
    var masterProduct = createMasterProduct();
    var object = _masterProductPrice.MasterProductPrice.spawn(masterProduct.getId(), {});

    expect(new _masterProductPrice.MasterProductPrice(object).getMasterProduct().getId()).toBe(masterProduct.getId());
  });

  test('getPriceDetails should return provided result', function () {
    var expectedValue = _immutable2.default.fromJS({
      val: (0, _v2.default)()
    });
    var masterProduct = createMasterProduct();
    var object = _masterProductPrice.MasterProductPrice.spawn(masterProduct.getId(), expectedValue);

    expect(new _masterProductPrice.MasterProductPrice(object).getPriceDetails()).toBe(expectedValue);
  });
});