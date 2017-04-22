'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedMasterProductInfo = createCriteriaUsingProvidedMasterProductInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _masterProductService = require('./master-product-service');

var _masterProduct = require('./schema/master-product.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId) {
  expect(masterProductInfo.get('id')).toBe(masterProductId);
  expect(masterProductInfo.get('description')).toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('barcode').some()).toBe(expectedMasterProductInfo.get('barcode'));
  expect(masterProductInfo.get('imageUrl').some()).toBe(expectedMasterProductInfo.get('imageUrl'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    description: (0, _v2.default)(),
    barcode: (0, _v2.default)(),
    imageUrl: (0, _v2.default)()
  });
}

function createCriteriaUsingProvidedMasterProductInfo(masterProductInfo) {
  return (0, _immutable.Map)({
    description: masterProductInfo.get('description'),
    barcode: masterProductInfo.get('barcode'),
    imageUrl: masterProductInfo.get('imageUrl')
  });
}

describe('create', function () {
  test('should return the created master product Id', function (done) {
    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the masterProduct', function (done) {
    var expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)();
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create(expectedMasterProductInfo).then(function (id) {
      masterProductId = id;

      return _masterProductService.MasterProductService.read(masterProductId);
    }).then(function (masterProductInfo) {
      expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
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

  test('should read the existing masterProduct', function (done) {
    var expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)();
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create(expectedMasterProductInfo).then(function (id) {
      masterProductId = id;

      return _masterProductService.MasterProductService.read(masterProductId);
    }).then(function (masterProductInfo) {
      expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided master product Id does not exist', function (done) {
    var masterProductId = (0, _v2.default)();

    _masterProductService.MasterProductService.update(masterProductId, (0, _masterProduct.createMasterProductInfo)()).catch(function (error) {
      expect(error).toBe('No master product found with Id: ' + masterProductId);
      done();
    });
  });

  test('should return the Id of the updated masterProduct', function (done) {
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      masterProductId = id;

      return _masterProductService.MasterProductService.update(masterProductId, (0, _masterProduct.createMasterProductInfo)());
    }).then(function (id) {
      expect(id).toBe(masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing masterProduct', function (done) {
    var expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)();
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      return _masterProductService.MasterProductService.update(id, expectedMasterProductInfo);
    }).then(function (id) {
      masterProductId = id;

      return _masterProductService.MasterProductService.read(masterProductId);
    }).then(function (masterProductInfo) {
      expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided master product Id does not exist', function (done) {
    var masterProductId = (0, _v2.default)();

    _masterProductService.MasterProductService.delete(masterProductId).catch(function (error) {
      expect(error).toBe('No master product found with Id: ' + masterProductId);
      done();
    });
  });

  test('should delete the existing masterProduct', function (done) {
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      masterProductId = id;
      return _masterProductService.MasterProductService.delete(masterProductId);
    }).then(function () {
      return _masterProductService.MasterProductService.read(masterProductId);
    }).catch(function (error) {
      expect(error).toBe('No master product found with Id: ' + masterProductId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no master product if provided criteria matches no masterProduct', function (done) {
    _masterProductService.MasterProductService.search(createCriteria()).then(function (masterProductInfos) {
      expect(masterProductInfos.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the master products matches the criteria', function (done) {
    var expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)();
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create(expectedMasterProductInfo).then(function (id) {
      masterProductId = id;

      return _masterProductService.MasterProductService.search(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));
    }).then(function (masterProductInfos) {
      expect(masterProductInfos.size).toBe(1);

      var masterProductInfo = masterProductInfos.first();
      expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('exists', function () {
  test('should return false if no master product match provided criteria', function (done) {
    _masterProductService.MasterProductService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any master product match provided criteria', function (done) {
    var masterProductInfo = (0, _masterProduct.createMasterProductInfo)();

    _masterProductService.MasterProductService.create(masterProductInfo).then(function () {
      return _masterProductService.MasterProductService.exists(createCriteriaUsingProvidedMasterProductInfo(masterProductInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});