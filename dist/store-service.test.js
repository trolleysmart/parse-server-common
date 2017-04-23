'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _storeService = require('./store-service');

var _store = require('./schema/store.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectStoreInfo(storeInfo, expectedStoreInfo, storeId) {
  expect(storeInfo.get('id')).toBe(storeId);
  expect(storeInfo.get('name')).toBe(expectedStoreInfo.get('name'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    name: (0, _v2.default)()
  });
}

function createCriteriaUsingProvidedStoreInfo(storeInfo) {
  return (0, _immutable.Map)({
    name: storeInfo.get('name')
  });
}

describe('create', function () {
  test('should return the created store Id', function (done) {
    _storeService.StoreService.create((0, _store.createStoreInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the store', function (done) {
    var expectedStoreInfo = (0, _store.createStoreInfo)();
    var storeId = void 0;

    _storeService.StoreService.create(expectedStoreInfo).then(function (id) {
      storeId = id;

      return _storeService.StoreService.read(storeId);
    }).then(function (storeInfo) {
      expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided store Id does not exist', function (done) {
    var storeId = (0, _v2.default)();

    _storeService.StoreService.read(storeId).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });

  test('should read the existing store', function (done) {
    var expectedStoreInfo = (0, _store.createStoreInfo)();
    var storeId = void 0;

    _storeService.StoreService.create(expectedStoreInfo).then(function (id) {
      storeId = id;

      return _storeService.StoreService.read(storeId);
    }).then(function (storeInfo) {
      expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided store Id does not exist', function (done) {
    var storeId = (0, _v2.default)();

    _storeService.StoreService.update(storeId, (0, _store.createStoreInfo)()).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });

  test('should return the Id of the updated store', function (done) {
    var storeId = void 0;

    _storeService.StoreService.create((0, _store.createStoreInfo)()).then(function (id) {
      storeId = id;

      return _storeService.StoreService.update(storeId, (0, _store.createStoreInfo)());
    }).then(function (id) {
      expect(id).toBe(storeId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing store', function (done) {
    var expectedStoreInfo = (0, _store.createStoreInfo)();
    var storeId = void 0;

    _storeService.StoreService.create((0, _store.createStoreInfo)()).then(function (id) {
      return _storeService.StoreService.update(id, expectedStoreInfo);
    }).then(function (id) {
      storeId = id;

      return _storeService.StoreService.read(storeId);
    }).then(function (storeInfo) {
      expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided store Id does not exist', function (done) {
    var storeId = (0, _v2.default)();

    _storeService.StoreService.delete(storeId).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });

  test('should delete the existing store', function (done) {
    var storeId = void 0;

    _storeService.StoreService.create((0, _store.createStoreInfo)()).then(function (id) {
      storeId = id;
      return _storeService.StoreService.delete(storeId);
    }).then(function () {
      return _storeService.StoreService.read(storeId);
    }).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no store if provided criteria matches no store', function (done) {
    _storeService.StoreService.search((0, _store.createStoreInfo)()).then(function (stores) {
      expect(stores.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the stores matches the criteria', function (done) {
    var expectedStoreInfo = (0, _store.createStoreInfo)();
    var storeId = void 0;

    _storeService.StoreService.create(expectedStoreInfo).then(function (id) {
      storeId = id;

      return _storeService.StoreService.search(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));
    }).then(function (storeInfos) {
      expect(storeInfos.size).toBe(1);

      var storeInfo = storeInfos.first();
      expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no store if provided criteria matches no store', function (done) {
    var result = _storeService.StoreService.searchAll((0, _store.createStoreInfo)());
    var stores = (0, _immutable.List)();

    result.event.subscribe(function (store) {
      stores = stores.push(store);
    });
    result.promise.then(function () {
      expect(stores.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the stores matches the criteria', function (done) {
    var expectedStoreInfo = (0, _store.createStoreInfo)();

    Promise.all([_storeService.StoreService.create(expectedStoreInfo), _storeService.StoreService.create(expectedStoreInfo)]).then(function (ids) {
      var storeIds = _immutable.List.of(ids[0], ids[1]);
      var result = _storeService.StoreService.searchAll(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));
      var stores = (0, _immutable.List)();

      result.event.subscribe(function (store) {
        stores = stores.push(store);
      });
      result.promise.then(function () {
        expect(stores.size).toBe(storeIds.size);
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
  test('should return false if no store match provided criteria', function (done) {
    _storeService.StoreService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any store match provided criteria', function (done) {
    var storeInfo = (0, _store.createStoreInfo)();

    _storeService.StoreService.create(storeInfo).then(function () {
      return _storeService.StoreService.exists(createCriteriaUsingProvidedStoreInfo(storeInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});