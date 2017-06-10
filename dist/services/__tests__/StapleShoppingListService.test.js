'use strict';

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

var _StapleShoppingList = require('../../schema/__tests__/StapleShoppingList.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

beforeEach(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var user;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _microBusinessParseServerCommon.UserService.signUpWithUsernameAndPassword((0, _v2.default)() + '@email.com', '123456');

        case 2:
          user = _context.sent;


          userId = user.get('id');

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

describe('create', function () {
  test('should return the created staple shopping list Id', function (done) {
    _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId)).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the staple shopping list', function (done) {
    var expectedShoppingListInfo = (0, _StapleShoppingList.createStapleShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _.StapleShoppingListService.create(expectedShoppingListInfo).then(function (id) {
      shoppingListId = id;

      return _.StapleShoppingListService.read(shoppingListId);
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

    _.StapleShoppingListService.read(shoppingListId).catch(function (error) {
      expect(error).toBe('No staple shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should read the existing staple shopping list', function (done) {
    var expectedStoreInfo = (0, _StapleShoppingList.createStapleShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _.StapleShoppingListService.create(expectedStoreInfo).then(function (id) {
      shoppingListId = id;

      return _.StapleShoppingListService.read(shoppingListId);
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

    _.StapleShoppingListService.update((0, _StapleShoppingList.createStapleShoppingListInfo)(userId).set('id', shoppingListId)).catch(function (error) {
      expect(error).toBe('No staple shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should return the Id of the updated staple shopping list', function (done) {
    var shoppingListId = void 0;

    _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId)).then(function (id) {
      shoppingListId = id;

      return _.StapleShoppingListService.update((0, _StapleShoppingList.createStapleShoppingListInfo)(userId).set('id', shoppingListId));
    }).then(function (id) {
      expect(id).toBe(shoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing staple shopping list', function (done) {
    var expectedShoppingListInfo = (0, _StapleShoppingList.createStapleShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId)).then(function (id) {
      return _.StapleShoppingListService.update(expectedShoppingListInfo.set('id', id));
    }).then(function (id) {
      shoppingListId = id;

      return _.StapleShoppingListService.read(shoppingListId);
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

    _.StapleShoppingListService.delete(shoppingListId).catch(function (error) {
      expect(error).toBe('No staple shopping list found with Id: ' + shoppingListId);
      done();
    });
  });

  test('should delete the existing staple shopping list', function (done) {
    var shoppingListId = void 0;

    _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId)).then(function (id) {
      shoppingListId = id;
      return _.StapleShoppingListService.delete(shoppingListId);
    }).then(function () {
      return _.StapleShoppingListService.read(shoppingListId);
    }).catch(function (error) {
      expect(error).toBe('No staple shopping list found with Id: ' + shoppingListId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no staple shopping list if provided criteria matches no staple shopping list', function (done) {
    _.StapleShoppingListService.search(createCriteria()).then(function (stores) {
      expect(stores.count()).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the staple shopping lists matches the criteria', function (done) {
    var expectedShoppingListInfo = (0, _StapleShoppingList.createStapleShoppingListInfo)(userId);
    var shoppingListId = void 0;

    _.StapleShoppingListService.create(expectedShoppingListInfo).then(function (id) {
      shoppingListId = id;

      return _.StapleShoppingListService.search(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
    }).then(function (shoppingListInfos) {
      expect(shoppingListInfos.count()).toBe(1);

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
    var result = _.StapleShoppingListService.searchAll(createCriteria());
    var shoppingLists = (0, _immutable.List)();

    result.event.subscribe(function (shoppingList) {
      shoppingLists = shoppingLists.push(shoppingList);
    });

    result.promise.then(function () {
      result.event.unsubscribeAll();
      result.event.unsubscribeAll();
      expect(shoppingLists.count()).toBe(0);
      done();
    }).catch(function (error) {
      result.event.unsubscribeAll();
      fail(error);
      done();
    });
  });

  test('should return the staple shopping list matches the criteria', function (done) {
    var expectedShoppingListInfo = (0, _StapleShoppingList.createStapleShoppingListInfo)(userId);

    Promise.all([_.StapleShoppingListService.create(expectedShoppingListInfo), _.StapleShoppingListService.create(expectedShoppingListInfo)]).then(function (ids) {
      var shoppingListIds = _immutable.List.of(ids[0], ids[1]);
      var result = _.StapleShoppingListService.searchAll(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
      var shoppingLists = (0, _immutable.List)();

      result.event.subscribe(function (shoppingList) {
        shoppingLists = shoppingLists.push(shoppingList);
      });
      result.promise.then(function () {
        result.event.unsubscribeAll();
        expect(shoppingLists.count()).toBe(shoppingListIds.count());
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
  test('should return false if no staple shopping list match provided criteria', function (done) {
    _.StapleShoppingListService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any staple shopping list match provided criteria', function (done) {
    var shoppingListInfo = (0, _StapleShoppingList.createStapleShoppingListInfo)(userId);

    _.StapleShoppingListService.create(shoppingListInfo).then(function () {
      return _.StapleShoppingListService.exists(createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});