'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _storeService = require('./store-service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('create', function () {
  test('should return the created store Id', function () {
    return _storeService.StoreService.create((0, _immutable.Map)({
      name: (0, _v2.default)()
    })).then(function (result) {
      return expect(result).toBeDefined();
    });
  });

  test('should create the store', function (done) {
    var expectedVal = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });

    _storeService.StoreService.create(expectedVal).then(function (storeId) {
      return _storeService.StoreService.read(storeId);
    }).then(function (store) {
      expect(store.get('name')).toBe(expectedVal.get('name'));
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
    var expectedVal = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });

    _storeService.StoreService.create(expectedVal).then(function (storeId) {
      return _storeService.StoreService.read(storeId);
    }).then(function (store) {
      expect(store.get('name')).toBe(expectedVal.get('name'));
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
    });
  });

  test('should return the stores matches the criteria', function (done) {
    var expectedVal = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });
    var criteria = (0, _immutable.Map)({
      name: expectedVal.get('name')
    });

    var storeId = void 0;

    _storeService.StoreService.create(expectedVal).then(function (id) {
      storeId = id;

      return _storeService.StoreService.search(criteria);
    }).then(function (stores) {
      expect(stores.size).toBe(1);

      var store = stores.first();
      expect(store.get('id')).toBe(storeId);
      expect(store.get('name')).toBe(expectedVal.get('name'));
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
    });
  });

  test('should return true if any store match provided criteria', function (done) {
    var expectedVal = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });
    var criteria = (0, _immutable.Map)({
      name: expectedVal.get('name')
    });

    _storeService.StoreService.create(expectedVal).then(function () {
      return _storeService.StoreService.exists(criteria);
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    });
  });
});