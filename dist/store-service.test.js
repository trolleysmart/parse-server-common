'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _storeService = require('./store-service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStoreInfo() {
  return (0, _immutable.Map)({
    name: (0, _v2.default)()
  });
}

describe('create', function () {
  test('should return the created store Id', function (done) {
    _storeService.StoreService.create(createStoreInfo()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the store', function (done) {
    var storeInfo = createStoreInfo();

    _storeService.StoreService.create(storeInfo).then(function (storeId) {
      return _storeService.StoreService.read(storeId);
    }).then(function (store) {
      expect(store.get('name')).toBe(storeInfo.get('name'));
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
    var storeInfo = createStoreInfo();

    _storeService.StoreService.create(storeInfo).then(function (storeId) {
      return _storeService.StoreService.read(storeId);
    }).then(function (store) {
      expect(store.get('name')).toBe(storeInfo.get('name'));
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

    _storeService.StoreService.update(storeId, createStoreInfo()).catch(function (error) {
      expect(error).toBe('No store found with Id: ' + storeId);
      done();
    });
  });

  test('should return the Id of the updated store', function (done) {
    var storeInfo = createStoreInfo();
    var updatedStoreInfo = createStoreInfo();
    var storeId = void 0;

    _storeService.StoreService.create(storeInfo).then(function (id) {
      storeId = id;

      return _storeService.StoreService.update(storeId, updatedStoreInfo);
    }).then(function (id) {
      expect(id).toBe(storeId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing store', function (done) {
    var storeInfo = createStoreInfo();
    var updatedStoreInfo = createStoreInfo();

    _storeService.StoreService.create(storeInfo).then(function (storeId) {
      return _storeService.StoreService.update(storeId, updatedStoreInfo);
    }).then(function (storeId) {
      return _storeService.StoreService.read(storeId);
    }).then(function (store) {
      expect(store.get('name')).toBe(updatedStoreInfo.get('name'));
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
    var storeInfo = createStoreInfo();
    var storeId = void 0;

    _storeService.StoreService.create(storeInfo).then(function (id) {
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
    var criteria = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });

    _storeService.StoreService.search(criteria).then(function (stores) {
      expect(stores.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the stores matches the criteria', function (done) {
    var storeInfo = createStoreInfo();
    var criteria = (0, _immutable.Map)({
      name: storeInfo.get('name')
    });

    var storeId = void 0;

    _storeService.StoreService.create(storeInfo).then(function (id) {
      storeId = id;

      return _storeService.StoreService.search(criteria);
    }).then(function (stores) {
      expect(stores.size).toBe(1);

      var store = stores.first();
      expect(store.get('id')).toBe(storeId);
      expect(store.get('name')).toBe(storeInfo.get('name'));
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('exists', function () {
  test('should return false if no store match provided criteria', function (done) {
    var criteria = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });

    _storeService.StoreService.exists(criteria).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any store match provided criteria', function (done) {
    var storeInfo = createStoreInfo();
    var criteria = (0, _immutable.Map)({
      name: storeInfo.get('name')
    });

    _storeService.StoreService.create(storeInfo).then(function () {
      return _storeService.StoreService.exists(criteria);
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});