'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

var _Store = require('../../schema/__tests__/Store.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectStoreInfo(storeInfo, expectedStoreInfo, storeId) {
  expect(storeInfo.get('id')).toBe(storeId);
  expect(storeInfo.get('name')).toBe(expectedStoreInfo.get('name'));
  expect(storeInfo.get('imageUrl')).toBe(expectedStoreInfo.get('imageUrl'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'imageUrl'),
    conditions: (0, _immutable.Map)({
      name: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedStoreInfo(storeInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'imageUrl'),
    conditions: (0, _immutable.Map)({
      name: storeInfo.get('name')
    })
  });
}

describe('create', function () {
  test('should return the created store Id', function (done) {
    _.StoreService.create((0, _Store.createStoreInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the store', function (done) {
    var expectedStoreInfo = (0, _Store.createStoreInfo)();
    var storeId = void 0;

    _.StoreService.create(expectedStoreInfo).then(function (id) {
      storeId = id;

      return _.StoreService.read(storeId);
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

    _.StoreService.read(storeId).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });

  test('should read the existing store', function (done) {
    var expectedStoreInfo = (0, _Store.createStoreInfo)();
    var storeId = void 0;

    _.StoreService.create(expectedStoreInfo).then(function (id) {
      storeId = id;

      return _.StoreService.read(storeId);
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

    _.StoreService.update((0, _Store.createStoreInfo)().set('id', storeId)).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });

  test('should return the Id of the updated store', function (done) {
    var storeId = void 0;

    _.StoreService.create((0, _Store.createStoreInfo)()).then(function (id) {
      storeId = id;

      return _.StoreService.update((0, _Store.createStoreInfo)().set('id', storeId));
    }).then(function (id) {
      expect(id).toBe(storeId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing store', function (done) {
    var expectedStoreInfo = (0, _Store.createStoreInfo)();
    var storeId = void 0;

    _.StoreService.create((0, _Store.createStoreInfo)()).then(function (id) {
      return _.StoreService.update(expectedStoreInfo.set('id', id));
    }).then(function (id) {
      storeId = id;

      return _.StoreService.read(storeId);
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

    _.StoreService.delete(storeId).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });

  test('should delete the existing store', function (done) {
    var storeId = void 0;

    _.StoreService.create((0, _Store.createStoreInfo)()).then(function (id) {
      storeId = id;
      return _.StoreService.delete(storeId);
    }).then(function () {
      return _.StoreService.read(storeId);
    }).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no store if provided criteria matches no store', function (done) {
    _.StoreService.search(createCriteria()).then(function (stores) {
      expect(stores.count()).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the stores matches the criteria', function (done) {
    var expectedStoreInfo = (0, _Store.createStoreInfo)();
    var storeId = void 0;

    _.StoreService.create(expectedStoreInfo).then(function (id) {
      storeId = id;

      return _.StoreService.search(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));
    }).then(function (storeInfos) {
      expect(storeInfos.count()).toBe(1);

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
    var result = _.StoreService.searchAll(createCriteria());
    var stores = (0, _immutable.List)();

    result.event.subscribe(function (store) {
      stores = stores.push(store);
    });
    result.promise.then(function () {
      result.event.unsubscribeAll();
      expect(stores.count()).toBe(0);
      done();
    }).catch(function (error) {
      result.event.unsubscribeAll();
      fail(error);
      done();
    });
  });

  test('should return the stores matches the criteria', function (done) {
    var expectedStoreInfo = (0, _Store.createStoreInfo)();

    Promise.all([_.StoreService.create(expectedStoreInfo), _.StoreService.create(expectedStoreInfo)]).then(function (ids) {
      var storeIds = _immutable.List.of(ids[0], ids[1]);
      var result = _.StoreService.searchAll(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));
      var stores = (0, _immutable.List)();

      result.event.subscribe(function (store) {
        stores = stores.push(store);
      });
      result.promise.then(function () {
        result.event.unsubscribeAll();
        expect(stores.count()).toBe(storeIds.count());
        done();
      }).catch(function (error) {
        result.event.unsubscribeAll();
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
    _.StoreService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any store match provided criteria', function (done) {
    var storeInfo = (0, _Store.createStoreInfo)();

    _.StoreService.create(storeInfo).then(function () {
      return _.StoreService.exists(createCriteriaUsingProvidedStoreInfo(storeInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});