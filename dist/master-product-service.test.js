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

var _tag = require('./schema/tag.test');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId) {
  expect(masterProductInfo.get('id')).toBe(masterProductId);
  expect(masterProductInfo.get('description')).toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('barcode')).toBe(expectedMasterProductInfo.get('barcode'));
  expect(masterProductInfo.get('imageUrl')).toBe(expectedMasterProductInfo.get('imageUrl'));
  expect(masterProductInfo.get('tagIds')).toEqual(expectedMasterProductInfo.get('tagIds'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('description', 'barcode', 'imageUrl', 'tags'),
    includeTags: true,
    conditions: (0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedMasterProductInfo(masterProductInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('description', 'barcode', 'imageUrl', 'tags'),
    includeTags: true,
    conditions: (0, _immutable.Map)({
      description: masterProductInfo.get('description'),
      barcode: masterProductInfo.get('barcode'),
      imageUrl: masterProductInfo.get('imageUrl'),
      tags: masterProductInfo.get('tags')
    })
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

  test('should create the master product', function (done) {
    var expectedMasterProductInfo = void 0;
    var masterProductId = void 0;

    Promise.all([_schema.Tag.spawn((0, _tag.createTagInfo)()).save(), _schema.Tag.spawn((0, _tag.createTagInfo)()).save()]).then(function (results) {
      expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _masterProductService.MasterProductService.create(expectedMasterProductInfo);
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

describe('read', function () {
  test('should reject if the provided master product Id does not exist', function (done) {
    var masterProductId = (0, _v2.default)();

    _masterProductService.MasterProductService.read(masterProductId).catch(function (error) {
      expect(error).toBe('No master product found with Id: ' + masterProductId);
      done();
    });
  });

  test('should read the existing master product', function (done) {
    var expectedMasterProductInfo = void 0;
    var masterProductId = void 0;

    Promise.all([_schema.Tag.spawn((0, _tag.createTagInfo)()).save(), _schema.Tag.spawn((0, _tag.createTagInfo)()).save()]).then(function (results) {
      expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _masterProductService.MasterProductService.create(expectedMasterProductInfo);
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

describe('update', function () {
  test('should reject if the provided master product Id does not exist', function (done) {
    var masterProductId = (0, _v2.default)();

    _masterProductService.MasterProductService.update((0, _masterProduct.createMasterProductInfo)().set('id', masterProductId)).catch(function (error) {
      expect(error).toBe('No master product found with Id: ' + masterProductId);
      done();
    });
  });

  test('should return the Id of the updated master product', function (done) {
    var masterProductId = void 0;

    _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)()).then(function (id) {
      masterProductId = id;

      return _masterProductService.MasterProductService.update((0, _masterProduct.createMasterProductInfo)().set('id', masterProductId));
    }).then(function (id) {
      expect(id).toBe(masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing master product', function (done) {
    var expectedMasterProductInfo = void 0;
    var masterProductId = void 0;

    Promise.all([_schema.Tag.spawn((0, _tag.createTagInfo)()).save(), _schema.Tag.spawn((0, _tag.createTagInfo)()).save(), _masterProductService.MasterProductService.create((0, _masterProduct.createMasterProductInfo)())]).then(function (results) {
      expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _masterProductService.MasterProductService.update(expectedMasterProductInfo.set('id', results[2]));
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

  test('should delete the existing master product', function (done) {
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
  test('should return no master product if provided criteria matches no master product', function (done) {
    var result = _masterProductService.MasterProductService.searchAll(createCriteria());
    var masterProducts = (0, _immutable.List)();

    result.event.subscribe(function (masterProduct) {
      masterProducts = masterProducts.push(masterProduct);
    });
    result.promise.then(function () {
      expect(masterProducts.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the master products matches the criteria', function (done) {
    var expectedMasterProductInfo = void 0;
    var masterProductId = void 0;

    Promise.all([_schema.Tag.spawn((0, _tag.createTagInfo)()).save(), _schema.Tag.spawn((0, _tag.createTagInfo)()).save()]).then(function (results) {
      expectedMasterProductInfo = (0, _masterProduct.createMasterProductInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _masterProductService.MasterProductService.create(expectedMasterProductInfo);
    }).then(function (id) {
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

describe('searchAll', function () {
  test('should return no master product if provided criteria matches no master product', function (done) {
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

    Promise.all([_masterProductService.MasterProductService.create(expectedMasterProductInfo), _masterProductService.MasterProductService.create(expectedMasterProductInfo)]).then(function (ids) {
      var masterProductIds = _immutable.List.of(ids[0], ids[1]);
      var result = _masterProductService.MasterProductService.searchAll(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));
      var masterProducts = (0, _immutable.List)();

      result.event.subscribe(function (masterProduct) {
        masterProducts = masterProducts.push(masterProduct);
      });
      result.promise.then(function () {
        expect(masterProducts.size).toBe(masterProductIds.size);
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