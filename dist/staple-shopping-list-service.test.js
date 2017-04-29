'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

require('../bootstrap');

var _stapleShoppingListService = require('./staple-shopping-list-service');

var _stapleShoppingList = require('./schema/staple-shopping-list.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId) {
  expect(shoppingListInfo.get('id')).toBe(shoppingListId);
  expect(shoppingListInfo.get('userId')).toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('items')).toEqual(expectedShoppingListInfo.get('items'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('user', 'items'),
    conditions: (0, _immutable.Map)({
      userId: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('user', 'items'),
    conditions: (0, _immutable.Map)({
      userId: shoppingListInfo.get('userId')
    })
  });
}

var userId = void 0;

beforeEach(function () {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.UserService.signUpWithEmailAndPassword((0, _v2.default)() + '@email.com', '123456').then(function (user) {
      userId = user.id;
      resolve();
    }).catch(function (error) {
      return reject(error);
    });
  });
});

describe('create', function () {
  test('should return the created staple shopping list Id', function (done) {
    _stapleShoppingListService.StapleShoppingListService.create((0, _stapleShoppingList.createStapleShoppingListInfo)(userId)).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the staple shopping list', function (done) {
    var expectedShoppingListInfo = (0, _stapleShoppingList.createStapleShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _stapleShoppingListService.StapleShoppingListService.create(expectedShoppingListInfo).then(function (id) {
      shoppingListId = id;

      return _stapleShoppingListService.StapleShoppingListService.read(shoppingListId);
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
  test('should reject if the provided staple shopping list Id does not exist', function (done) {
    var shoppingListId = (0, _v2.default)();

    _stapleShoppingListService.StapleShoppingListService.read(shoppingListId).catch(function (error) {
      expect(error).toBe('No staple shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should read the existing staple shopping list', function (done) {
    var expectedStoreInfo = (0, _stapleShoppingList.createStapleShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _stapleShoppingListService.StapleShoppingListService.create(expectedStoreInfo).then(function (id) {
      shoppingListId = id;

      return _stapleShoppingListService.StapleShoppingListService.read(shoppingListId);
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
  test('should reject if the provided staple shopping list Id does not exist', function (done) {
    var shoppingListId = (0, _v2.default)();

    _stapleShoppingListService.StapleShoppingListService.update((0, _stapleShoppingList.createStapleShoppingListInfo)(userId).set('id', shoppingListId)).catch(function (error) {
      expect(error).toBe('No staple shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should return the Id of the updated staple shopping list', function (done) {
    var shoppingListId = void 0;

    _stapleShoppingListService.StapleShoppingListService.create((0, _stapleShoppingList.createStapleShoppingListInfo)(userId)).then(function (id) {
      shoppingListId = id;

      return _stapleShoppingListService.StapleShoppingListService.update((0, _stapleShoppingList.createStapleShoppingListInfo)(userId).set('id', shoppingListId));
    }).then(function (id) {
      expect(id).toBe(shoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing staple shopping list', function (done) {
    var expectedShoppingListInfo = (0, _stapleShoppingList.createStapleShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _stapleShoppingListService.StapleShoppingListService.create((0, _stapleShoppingList.createStapleShoppingListInfo)(userId)).then(function (id) {
      return _stapleShoppingListService.StapleShoppingListService.update(expectedShoppingListInfo.set('id', id));
    }).then(function (id) {
      shoppingListId = id;

      return _stapleShoppingListService.StapleShoppingListService.read(shoppingListId);
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
  test('should reject if the provided staple shopping list Id does not exist', function (done) {
    var shoppingListId = (0, _v2.default)();

    _stapleShoppingListService.StapleShoppingListService.delete(shoppingListId).catch(function (error) {
      expect(error).toBe('No staple shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should delete the existing staple shopping list', function (done) {
    var shoppingListId = void 0;

    _stapleShoppingListService.StapleShoppingListService.create((0, _stapleShoppingList.createStapleShoppingListInfo)(userId)).then(function (id) {
      shoppingListId = id;
      return _stapleShoppingListService.StapleShoppingListService.delete(shoppingListId);
    }).then(function () {
      return _stapleShoppingListService.StapleShoppingListService.read(shoppingListId);
    }).catch(function (error) {
      expect(error).toBe('No staple shopping list found with Id: ' + shoppingListId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no staple shopping list if provided criteria matches no staple shopping list', function (done) {
    _stapleShoppingListService.StapleShoppingListService.search(createCriteria()).then(function (stores) {
      expect(stores.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the staple shopping lists matches the criteria', function (done) {
    var expectedShoppingListInfo = (0, _stapleShoppingList.createStapleShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _stapleShoppingListService.StapleShoppingListService.create(expectedShoppingListInfo).then(function (id) {
      shoppingListId = id;

      return _stapleShoppingListService.StapleShoppingListService.search(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
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
  test('should return no staple shopping list if provided criteria matches no staple shopping list', function (done) {
    _stapleShoppingListService.StapleShoppingListService.search(createCriteria()).then(function (shoppingListInfos) {
      expect(shoppingListInfos.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the staple shopping list matches the criteria', function (done) {
    var expectedShoppingListInfo = (0, _stapleShoppingList.createStapleShoppingListInfo)(userId);

    Promise.all([_stapleShoppingListService.StapleShoppingListService.create(expectedShoppingListInfo), _stapleShoppingListService.StapleShoppingListService.create(expectedShoppingListInfo)]).then(function (ids) {
      var shoppingListIds = _immutable.List.of(ids[0], ids[1]);
      var result = _stapleShoppingListService.StapleShoppingListService.searchAll(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
      var shoppingLists = (0, _immutable.List)();

      result.event.subscribe(function (shoppingList) {
        shoppingLists = shoppingLists.push(shoppingList);
      });
      result.promise.then(function () {
        expect(shoppingLists.size).toBe(shoppingListIds.size);
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
  test('should return false if no staple shopping list match provided criteria', function (done) {
    _stapleShoppingListService.StapleShoppingListService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any staple shopping list match provided criteria', function (done) {
    var shoppingListInfo = (0, _stapleShoppingList.createStapleShoppingListInfo)(userId);

    _stapleShoppingListService.StapleShoppingListService.create(shoppingListInfo).then(function () {
      return _stapleShoppingListService.StapleShoppingListService.exists(createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});