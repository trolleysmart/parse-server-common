'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _masterProductService = require('./master-product-service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('create', function () {
  test('should return the created master product Id', function () {
    return _masterProductService.MasterProductService.create((0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    })).then(function (result) {
      return expect(result).toBeDefined();
    });
  });

  test('should create the master product', function (done) {
    var expectedVal = (0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    });

    _masterProductService.MasterProductService.create(expectedVal).then(function (masterProductId) {
      return _masterProductService.MasterProductService.read(masterProductId);
    }).then(function (masterProduct) {
      expect(masterProduct.get('description')).toBe(expectedVal.get('description'));
      expect(masterProduct.get('barcode').some()).toBe(expectedVal.get('barcode'));
      expect(masterProduct.get('imageUrl').some()).toBe(expectedVal.get('imageUrl'));
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided master product Id does not exist', function (done) {
    var masterProductId = (0, _v2.default)();

    _masterProductService.MasterProductService.read(masterProductId).catch(function (error) {
      expect(error).toBe('No master product found with Id: ' + masterProductId);
      done();
    });
  });

  test('should read the existing master product', function (done) {
    var expectedVal = (0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    });

    _masterProductService.MasterProductService.create(expectedVal).then(function (masterProductId) {
      return _masterProductService.MasterProductService.read(masterProductId);
    }).then(function (masterProduct) {
      expect(masterProduct.get('description')).toBe(expectedVal.get('description'));
      expect(masterProduct.get('barcode').some()).toBe(expectedVal.get('barcode'));
      expect(masterProduct.get('imageUrl').some()).toBe(expectedVal.get('imageUrl'));
      done();
    });
  });
});

describe('search', function () {
  test('should return no master product if provided criteria matches no master product', function (done) {
    var criteria = (0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    });

    _masterProductService.MasterProductService.search(criteria).then(function (masterProducts) {
      expect(masterProducts.size).toBe(0);
      done();
    });
  });

  test('should return the master products matches the criteria', function (done) {
    var expectedVal = (0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    });
    var criteria = (0, _immutable.Map)({
      description: expectedVal.get('description'),
      barcode: expectedVal.get('barcode'),
      imageUrl: expectedVal.get('imageUrl')
    });

    _masterProductService.MasterProductService.create(expectedVal).then(function () {
      return _masterProductService.MasterProductService.search(criteria);
    }).then(function (masterProducts) {
      expect(masterProducts.size).toBe(1);
      expect(masterProducts.first().get('description')).toBe(expectedVal.get('description'));
      expect(masterProducts.first().get('barcode').some()).toBe(expectedVal.get('barcode'));
      expect(masterProducts.first().get('imageUrl').some()).toBe(expectedVal.get('imageUrl'));
      done();
    });
  });
});

describe('exists', function () {
  test('should return false if no master product match provided criteria', function (done) {
    var criteria = (0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    });

    _masterProductService.MasterProductService.exists(criteria).then(function (response) {
      expect(response).toBeFalsy();
      done();
    });
  });

  test('should return true if any master product match provided criteria', function (done) {
    var expectedVal = (0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    });
    var criteria = (0, _immutable.Map)({
      description: expectedVal.get('description'),
      barcode: expectedVal.get('barcode'),
      imageUrl: expectedVal.get('imageUrl')
    });

    _masterProductService.MasterProductService.create(expectedVal).then(function () {
      return _masterProductService.MasterProductService.exists(criteria);
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    });
  });
});