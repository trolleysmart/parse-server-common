'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedMasterProductPriceInfo = createCriteriaUsingProvidedMasterProductPriceInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _masterProductService = require('./master-product-service');

var _masterProductPriceService = require('./master-product-price-service');

var _masterProduct = require('./schema/master-product.test');

var _masterProductPrice = require('./schema/master-product-price.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId) {
  expect(masterProductPriceInfo.get('id')).toBe(masterProductPriceId);
  expect(masterProductPriceInfo.get('masterProduct').getId()).toBe(masterProductId);
  expect(masterProductPriceInfo.get('priceDetails')).toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    masterProductId: (0, _v2.default)()
  });
}

function createCriteriaUsingProvidedMasterProductPriceInfo(masterProductId) {
  return (0, _immutable.Map)({
    masterProductId: masterProductId
  });
}

describe('create', function () {
  test('should return the created master product price Id', function (done) {
    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      return _masterProductPriceService.MasterProductPriceService.create((0, _masterProductPrice.createMasterProductPriceInfo)(id));
    }).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the master product price', function (done) {
    var expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)();
    var masterProductId = void 0;
    var masterProductPriceId = void 0;
    var expectedMasterProductPriceInfo = void 0;

    _masterProductService.MasterProductService.create(expectedMasterProductInfo).then(function (id) {
      masterProductId = id;
      expectedMasterProductPriceInfo = (0, _masterProductPrice.createMasterProductPriceInfo)(id);

      return _masterProductPriceService.MasterProductPriceService.create(expectedMasterProductPriceInfo);
    }).then(function (id) {
      masterProductPriceId = id;

      return _masterProductPriceService.MasterProductPriceService.read(masterProductPriceId);
    }).then(function (masterProductPriceInfo) {
      expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided master product price Id does not exist', function (done) {
    var masterProductPriceId = (0, _v2.default)();

    _masterProductPriceService.MasterProductPriceService.read(masterProductPriceId).catch(function (error) {
      expect(error).toBe('No master product price found with Id: ' + masterProductPriceId);
      done();
    });
  });

  test('should read the existing master product price', function (done) {
    var expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)();
    var masterProductId = void 0;
    var masterProductPriceId = void 0;
    var expectedMasterProductPriceInfo = void 0;

    _masterProductService.MasterProductService.create(expectedMasterProductInfo).then(function (id) {
      masterProductId = id;
      expectedMasterProductPriceInfo = (0, _masterProductPrice.createMasterProductPriceInfo)(id);

      return _masterProductPriceService.MasterProductPriceService.create(expectedMasterProductPriceInfo);
    }).then(function (id) {
      masterProductPriceId = id;

      return _masterProductPriceService.MasterProductPriceService.read(masterProductPriceId);
    }).then(function (masterProductPriceInfo) {
      expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided master product price Id does not exist', function (done) {
    var masterProductPriceId = (0, _v2.default)();

    _masterProductPriceService.MasterProductPriceService.update((0, _masterProductPrice.createMasterProductPriceInfo)().set('id', masterProductPriceId)).catch(function (error) {
      expect(error).toBe('No master product price found with Id: ' + masterProductPriceId);
      done();
    });
  });

  test('should return the Id of the updated master product price', function (done) {
    var masterProductPriceId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      return _masterProductPriceService.MasterProductPriceService.create((0, _masterProductPrice.createMasterProductPriceInfo)(id));
    }).then(function (id) {
      masterProductPriceId = id;

      return _masterProductPriceService.MasterProductPriceService.update((0, _masterProductPrice.createMasterProductPriceInfo)().set('id', masterProductPriceId));
    }).then(function (id) {
      expect(id).toBe(masterProductPriceId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing master product price', function (done) {
    var expectedMasterProductPriceInfo = void 0;
    var expectedMasterProductId = void 0;
    var masterProductPriceId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      expectedMasterProductId = id;
      expectedMasterProductPriceInfo = (0, _masterProductPrice.createMasterProductPriceInfo)(expectedMasterProductId);

      return _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)());
    }).then(function (id) {
      return _masterProductPriceService.MasterProductPriceService.create((0, _masterProductPrice.createMasterProductPriceInfo)(id));
    }).then(function (id) {
      return _masterProductPriceService.MasterProductPriceService.update(expectedMasterProductPriceInfo.set('id', id));
    }).then(function (id) {
      masterProductPriceId = id;

      return _masterProductPriceService.MasterProductPriceService.read(masterProductPriceId);
    }).then(function (masterProductPriceInfo) {
      expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, expectedMasterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided master product price Id does not exist', function (done) {
    var masterProductPriceId = (0, _v2.default)();

    _masterProductPriceService.MasterProductPriceService.delete(masterProductPriceId).catch(function (error) {
      expect(error).toBe('No master product price found with Id: ' + masterProductPriceId);
      done();
    });
  });

  test('should delete the existing master product price', function (done) {
    var masterProductPriceId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      return _masterProductPriceService.MasterProductPriceService.create((0, _masterProductPrice.createMasterProductPriceInfo)(id));
    }).then(function (id) {
      masterProductPriceId = id;
      return _masterProductPriceService.MasterProductPriceService.delete(masterProductPriceId);
    }).then(function () {
      return _masterProductPriceService.MasterProductPriceService.read(masterProductPriceId);
    }).catch(function (error) {
      expect(error).toBe('No master product price found with Id: ' + masterProductPriceId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no master product price if provided criteria matches no master product price', function (done) {
    _masterProductPriceService.MasterProductPriceService.search(createCriteria()).then(function (masterProductPriceInfos) {
      expect(masterProductPriceInfos.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the master products price matches the criteria', function (done) {
    var expectedMasterProductPriceInfo = void 0;
    var masterProductPriceId = void 0;
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      masterProductId = id;
      expectedMasterProductPriceInfo = (0, _masterProductPrice.createMasterProductPriceInfo)(id);

      return _masterProductPriceService.MasterProductPriceService.create(expectedMasterProductPriceInfo);
    }).then(function (id) {
      masterProductPriceId = id;

      return _masterProductPriceService.MasterProductPriceService.search(createCriteriaUsingProvidedMasterProductPriceInfo(masterProductId));
    }).then(function (masterProductPriceInfos) {
      expect(masterProductPriceInfos.size).toBe(1);

      var masterProductPriceInfo = masterProductPriceInfos.first();
      expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no master product price if provided criteria matches no master product price', function (done) {
    var result = _masterProductPriceService.MasterProductPriceService.searchAll(createCriteria());
    var masterProductPrices = (0, _immutable.List)();

    result.event.subscribe(function (masterProductPrice) {
      masterProductPrices = masterProductPrices.push(masterProductPrice);
    });
    result.promise.then(function () {
      expect(masterProductPrices.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the master products price matches the criteria', function (done) {
    var masterProductId = void 0;
    var expectedMasterProductPriceInfo = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      masterProductId = id;
      expectedMasterProductPriceInfo = (0, _masterProductPrice.createMasterProductPriceInfo)(masterProductId);

      return Promise.all([_masterProductPriceService.MasterProductPriceService.create(expectedMasterProductPriceInfo), _masterProductPriceService.MasterProductPriceService.create(expectedMasterProductPriceInfo)]);
    }).then(function (ids) {
      var masterProductPriceIds = _immutable.List.of(ids[0], ids[1]);
      var result = _masterProductPriceService.MasterProductPriceService.searchAll(createCriteriaUsingProvidedMasterProductPriceInfo(masterProductId));
      var masterProductPrices = (0, _immutable.List)();

      result.event.subscribe(function (masterProductPrice) {
        masterProductPrices = masterProductPrices.push(masterProductPrice);
      });
      result.promise.then(function () {
        expect(masterProductPrices.size).toBe(masterProductPriceIds.size);
        done();
      }).catch(function (error) {
        fail(error);
        done();
      });
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('exists', function () {
  test('should return false if no master product price match provided criteria', function (done) {
    _masterProductPriceService.MasterProductPriceService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any master product price match provided criteria', function (done) {
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      masterProductId = id;

      return _masterProductPriceService.MasterProductPriceService.create((0, _masterProductPrice.createMasterProductPriceInfo)(id));
    }).then(function () {
      return _masterProductPriceService.MasterProductPriceService.exists(createCriteriaUsingProvidedMasterProductPriceInfo(masterProductId));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});