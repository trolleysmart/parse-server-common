'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

require('../bootstrap');

var _shoppingListService = require('./shopping-list-service');

var _shoppingListService2 = _interopRequireDefault(_shoppingListService);

var _shoppingList = require('./schema/shopping-list.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId) {
  expect(shoppingListInfo.get('id')).toBe(shoppingListId);
  expect(shoppingListInfo.get('userId')).toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('stapleShoppingList')).toEqual(expectedShoppingListInfo.get('stapleShoppingList'));
  expect(shoppingListInfo.get('masterProductPrices')).toEqual(expectedShoppingListInfo.get('masterProductPrices'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('user', 'stapleShoppingList', 'masterProductPrices'),
    conditions: (0, _immutable.Map)({
      userId: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('user', 'stapleShoppingList', 'masterProductPrices'),
    conditions: (0, _immutable.Map)({
      userId: shoppingListInfo.get('userId')
    })
  });
}

var userId = void 0;

beforeEach(function () {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.UserService.signUpWithUsernameAndPassword((0, _v2.default)() + '@email.com', '123456').then(function (user) {
      userId = user.id;
      resolve();
    }).catch(function (error) {
      return reject(error);
    });
  });
});

describe('create', function () {
  test('should return the created shopping list Id', function (done) {
    _shoppingListService2.default.create((0, _shoppingList.createShoppingListInfo)(userId)).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the shopping list', function (done) {
    var expectedShoppingListInfo = (0, _shoppingList.createShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _shoppingListService2.default.create(expectedShoppingListInfo).then(function (id) {
      shoppingListId = id;

      return _shoppingListService2.default.read(shoppingListId);
    }).then(function (shoppingListInfo) {
      expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided shopping list Id does not exist', function (done) {
    var shoppingListId = (0, _v2.default)();

    _shoppingListService2.default.read(shoppingListId).catch(function (error) {
      expect(error).toBe('No shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should read the existing shopping list', function (done) {
    var expectedStoreInfo = (0, _shoppingList.createShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _shoppingListService2.default.create(expectedStoreInfo).then(function (id) {
      shoppingListId = id;

      return _shoppingListService2.default.read(shoppingListId);
    }).then(function (shoppingListInfo) {
      expectShoppingListInfo(shoppingListInfo, expectedStoreInfo, shoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided shopping list Id does not exist', function (done) {
    var shoppingListId = (0, _v2.default)();

    _shoppingListService2.default.update((0, _shoppingList.createShoppingListInfo)(userId).set('id', shoppingListId)).catch(function (error) {
      expect(error).toBe('No shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should return the Id of the updated shopping list', function (done) {
    var shoppingListId = void 0;

    _shoppingListService2.default.create((0, _shoppingList.createShoppingListInfo)(userId)).then(function (id) {
      shoppingListId = id;

      return _shoppingListService2.default.update((0, _shoppingList.createShoppingListInfo)(userId).set('id', shoppingListId));
    }).then(function (id) {
      expect(id).toBe(shoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing shopping list', function (done) {
    var expectedShoppingListInfo = (0, _shoppingList.createShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _shoppingListService2.default.create((0, _shoppingList.createShoppingListInfo)(userId)).then(function (id) {
      return _shoppingListService2.default.update(expectedShoppingListInfo.set('id', id));
    }).then(function (id) {
      shoppingListId = id;

      return _shoppingListService2.default.read(shoppingListId);
    }).then(function (storeInfo) {
      expectShoppingListInfo(storeInfo, expectedShoppingListInfo, shoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided shopping list Id does not exist', function (done) {
    var shoppingListId = (0, _v2.default)();

    _shoppingListService2.default.delete(shoppingListId).catch(function (error) {
      expect(error).toBe('No shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should delete the existing shopping list', function (done) {
    var shoppingListId = void 0;

    _shoppingListService2.default.create((0, _shoppingList.createShoppingListInfo)(userId)).then(function (id) {
      shoppingListId = id;
      return _shoppingListService2.default.delete(shoppingListId);
    }).then(function () {
      return _shoppingListService2.default.read(shoppingListId);
    }).catch(function (error) {
      expect(error).toBe('No shopping list found with Id: ' + shoppingListId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no shopping list if provided criteria matches no shopping list', function (done) {
    _shoppingListService2.default.search(createCriteria()).then(function (stores) {
      expect(stores.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the shopping lists matches the criteria', function (done) {
    var expectedShoppingListInfo = (0, _shoppingList.createShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _shoppingListService2.default.create(expectedShoppingListInfo).then(function (id) {
      shoppingListId = id;

      return _shoppingListService2.default.search(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
    }).then(function (shoppingListInfos) {
      expect(shoppingListInfos.size).toBe(1);

      var shoppingListInfo = shoppingListInfos.first();
      expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no shopping list if provided criteria matches no shopping list', function (done) {
    var result = _shoppingListService2.default.searchAll(createCriteria());
    var shoppingLists = (0, _immutable.List)();

    result.event.subscribe(function (shoppingList) {
      shoppingLists = shoppingLists.push(shoppingList);
    });
    result.promise.then(function () {
      result.event.unsubscribeAll();
      expect(shoppingLists.size).toBe(0);
      done();
    }).catch(function (error) {
      result.event.unsubscribeAll();
      fail(error);
      done();
    });
  });

  test('should return the shopping list matches the criteria', function (done) {
    var expectedShoppingListInfo = (0, _shoppingList.createShoppingListInfo)(userId);

    Promise.all([_shoppingListService2.default.create(expectedShoppingListInfo), _shoppingListService2.default.create(expectedShoppingListInfo)]).then(function (ids) {
      var shoppingListIds = _immutable.List.of(ids[0], ids[1]);
      var result = _shoppingListService2.default.searchAll(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
      var shoppingLists = (0, _immutable.List)();

      result.event.subscribe(function (shoppingList) {
        shoppingLists = shoppingLists.push(shoppingList);
      });
      result.promise.then(function () {
        result.event.unsubscribeAll();
        expect(shoppingLists.size).toBe(shoppingListIds.size);
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
  test('should return false if no shopping list match provided criteria', function (done) {
    _shoppingListService2.default.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any shopping list match provided criteria', function (done) {
    var shoppingListInfo = (0, _shoppingList.createShoppingListInfo)(userId);

    _shoppingListService2.default.create(shoppingListInfo).then(function () {
      return _shoppingListService2.default.exists(createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});