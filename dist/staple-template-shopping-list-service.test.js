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

var _stapleTemplateShoppingListService = require('./staple-template-shopping-list-service');

var _stapleTemplateShoppingList = require('./schema/staple-template-shopping-list.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId) {
  expect(masterProductInfo.get('id')).toBe(masterProductId);
  expect(masterProductInfo.get('description')).toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('templates')).toEqual(expectedMasterProductInfo.get('templates'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('description', 'templates'),
    conditions: (0, _immutable.Map)({
      description: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedMasterProductInfo(masterProductInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('description', 'templates'),
    conditions: (0, _immutable.Map)({
      description: masterProductInfo.get('description'),
      templateIds: masterProductInfo.get('templates')
    })
  });
}

describe('create', function () {
  test('should return the created staple template shopping list Id', function (done) {
    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the staple template shopping list', function (done) {
    var expectedMasterProductInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();
    var masterProductId = void 0;

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create(expectedMasterProductInfo).then(function (id) {
      masterProductId = id;

      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.read(masterProductId);
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
  test('should reject if the provided staple template shopping list Id does not exist', function (done) {
    var masterProductId = (0, _v2.default)();

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.read(masterProductId).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + masterProductId);
      done();
    });
  });

  test('should read the existing staple template shopping list', function (done) {
    var expectedMasterProductInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();
    var masterProductId = void 0;

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create(expectedMasterProductInfo).then(function (id) {
      masterProductId = id;

      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.read(masterProductId);
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
  test('should reject if the provided staple template shopping list Id does not exist', function (done) {
    var masterProductId = (0, _v2.default)();

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.update((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)().set('id', masterProductId)).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + masterProductId);
      done();
    });
  });

  test('should return the Id of the updated staple template shopping list', function (done) {
    var masterProductId = void 0;

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (id) {
      masterProductId = id;

      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.update((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)().set('id', masterProductId));
    }).then(function (id) {
      expect(id).toBe(masterProductId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing staple template shopping list', function (done) {
    var expectedMasterProductInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();
    var masterProductId = void 0;

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (id) {
      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.update(expectedMasterProductInfo.set('id', id));
    }).then(function (id) {
      masterProductId = id;

      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.read(masterProductId);
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
  test('should reject if the provided staple template shopping list Id does not exist', function (done) {
    var masterProductId = (0, _v2.default)();

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.delete(masterProductId).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + masterProductId);
      done();
    });
  });

  test('should delete the existing staple template shopping list', function (done) {
    var masterProductId = void 0;

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (id) {
      masterProductId = id;
      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.delete(masterProductId);
    }).then(function () {
      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.read(masterProductId);
    }).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + masterProductId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', function (done) {
    var result = _stapleTemplateShoppingListService.StapleTemplateShoppingListService.searchAll(createCriteria());
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

  test('should return the staple template shopping lists matches the criteria', function (done) {
    var expectedMasterProductInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();
    var masterProductId = void 0;

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create(expectedMasterProductInfo).then(function (id) {
      masterProductId = id;

      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.search(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));
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
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', function (done) {
    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.search(createCriteria()).then(function (masterProductInfos) {
      expect(masterProductInfos.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the staple template shopping lists matches the criteria', function (done) {
    var expectedMasterProductInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();

    Promise.all([_stapleTemplateShoppingListService.StapleTemplateShoppingListService.create(expectedMasterProductInfo), _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create(expectedMasterProductInfo)]).then(function (ids) {
      var masterProductIds = _immutable.List.of(ids[0], ids[1]);
      var result = _stapleTemplateShoppingListService.StapleTemplateShoppingListService.searchAll(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));
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
  test('should return false if no staple template shopping list match provided criteria', function (done) {
    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any staple template shopping list match provided criteria', function (done) {
    var masterProductInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();

    _stapleTemplateShoppingListService.StapleTemplateShoppingListService.create(masterProductInfo).then(function () {
      return _stapleTemplateShoppingListService.StapleTemplateShoppingListService.exists(createCriteriaUsingProvidedMasterProductInfo(masterProductInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});