'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

require('../../../bootstrap');

var _ = require('../');

var _MasterProductPrice = require('../../schema/__tests__/MasterProductPrice.test');

var _ShoppingList = require('../../schema/__tests__/ShoppingList.test');

var _StapleShoppingList = require('../../schema/__tests__/StapleShoppingList.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId, masterProductPriceId) {
  expect(shoppingListInfo.get('id')).toBe(shoppingListId);
  expect(shoppingListInfo.get('userId')).toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('doneDate')).toEqual(expectedShoppingListInfo.get('doneDate'));
  expect(shoppingListInfo.get('stapleShoppingListId')).toEqual(stapleShoppingListId);
  expect(shoppingListInfo.get('masterProductPriceId')).toEqual(masterProductPriceId);
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('user', 'doneDate', 'stapleShoppingList', 'masterProductPrice'),
    includeStapleShoppingList: true,
    includeMasterProductPrice: true,
    conditions: (0, _immutable.Map)({
      userId: (0, _v2.default)(),
      stapleShoppingListId: (0, _v2.default)(),
      masterProductPriceIdL: (0, _v2.default)(),
      includeItemsMarkedAsDone: true
    })
  });
}

function createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo, stapleShoppingListId, masterProductPriceId) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('user', 'doneDate', 'stapleShoppingList', 'masterProductPrice'),
    includeStapleShoppingList: true,
    includeMasterProductPrice: true,
    conditions: (0, _immutable.Map)({
      userId: shoppingListInfo.get('userId'),
      stapleShoppingListId: stapleShoppingListId,
      masterProductPriceId: masterProductPriceId,
      includeItemsMarkedAsDone: true
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
  test('should return the created shopping list Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var stapleShoppingListId, masterProductPriceId, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId = _context2.sent;
            _context2.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId = _context2.sent;
            _context2.next = 8;
            return _.ShoppingListService.create((0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId, masterProductPriceId));

          case 8:
            result = _context2.sent;


            expect(result).toBeDefined();

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  test('should create the shopping list', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var stapleShoppingListId, masterProductPriceId, expectedShoppingListInfo, shoppingListId, shoppingListInfo;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId = _context3.sent;
            _context3.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId = _context3.sent;
            expectedShoppingListInfo = (0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId, masterProductPriceId);
            _context3.next = 9;
            return _.ShoppingListService.create(expectedShoppingListInfo);

          case 9:
            shoppingListId = _context3.sent;
            _context3.next = 12;
            return _.ShoppingListService.read(shoppingListId);

          case 12:
            shoppingListInfo = _context3.sent;


            expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided shopping list Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var shoppingListId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            shoppingListId = (0, _v2.default)();
            _context4.prev = 1;
            _context4.next = 4;
            return _.ShoppingListService.read(shoppingListId);

          case 4:
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4['catch'](1);

            expect(_context4.t0).toBe('No shopping list found with Id: ' + shoppingListId);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 6]]);
  })));

  test('should read the existing shopping list', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var stapleShoppingListId, masterProductPriceId, expectedStoreInfo, shoppingListId, shoppingListInfo;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId = _context5.sent;
            _context5.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId = _context5.sent;
            expectedStoreInfo = (0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId, masterProductPriceId);
            _context5.next = 9;
            return _.ShoppingListService.create(expectedStoreInfo);

          case 9:
            shoppingListId = _context5.sent;
            _context5.next = 12;
            return _.ShoppingListService.read(shoppingListId);

          case 12:
            shoppingListInfo = _context5.sent;


            expectShoppingListInfo(shoppingListInfo, expectedStoreInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided shopping list Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var stapleShoppingListId, masterProductPriceId, shoppingListId;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId = _context6.sent;
            _context6.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId = _context6.sent;
            shoppingListId = (0, _v2.default)();
            _context6.prev = 7;
            _context6.next = 10;
            return _.ShoppingListService.update((0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId, masterProductPriceId).set('id', shoppingListId));

          case 10:
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6['catch'](7);

            expect(_context6.t0).toBe('No shopping list found with Id: ' + shoppingListId);

          case 15:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[7, 12]]);
  })));

  test('should return the Id of the updated shopping list', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var stapleShoppingListId1, masterProductPriceId1, stapleShoppingListId2, masterProductPriceId2, shoppingListId, id;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId1 = _context7.sent;
            _context7.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId1 = _context7.sent;
            _context7.next = 8;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 8:
            stapleShoppingListId2 = _context7.sent;
            _context7.next = 11;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 11:
            masterProductPriceId2 = _context7.sent;
            _context7.next = 14;
            return _.ShoppingListService.create((0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId1, masterProductPriceId1));

          case 14:
            shoppingListId = _context7.sent;
            _context7.next = 17;
            return _.ShoppingListService.update((0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId2, masterProductPriceId2).set('id', shoppingListId));

          case 17:
            id = _context7.sent;


            expect(id).toBe(shoppingListId);

          case 19:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('should update the existing shopping list', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var stapleShoppingListId1, masterProductPriceId1, expectedShoppingListInfo, stapleShoppingListId2, masterProductPriceId2, id, shoppingListId, shoppingListInfo;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId1 = _context8.sent;
            _context8.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId1 = _context8.sent;
            expectedShoppingListInfo = (0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId1, masterProductPriceId1);
            _context8.next = 9;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 9:
            stapleShoppingListId2 = _context8.sent;
            _context8.next = 12;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 12:
            masterProductPriceId2 = _context8.sent;
            _context8.next = 15;
            return _.ShoppingListService.create((0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId2, masterProductPriceId2));

          case 15:
            id = _context8.sent;
            _context8.next = 18;
            return _.ShoppingListService.update(expectedShoppingListInfo.set('id', id));

          case 18:
            shoppingListId = _context8.sent;
            _context8.next = 21;
            return _.ShoppingListService.read(shoppingListId);

          case 21:
            shoppingListInfo = _context8.sent;


            expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId1, masterProductPriceId1);

          case 23:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided shopping list Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var shoppingListId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            shoppingListId = (0, _v2.default)();
            _context9.prev = 1;
            _context9.next = 4;
            return _.ShoppingListService.delete(shoppingListId);

          case 4:
            _context9.next = 9;
            break;

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9['catch'](1);

            expect(_context9.t0).toBe('No shopping list found with Id: ' + shoppingListId);

          case 9:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[1, 6]]);
  })));

  test('should delete the existing shopping list', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var stapleShoppingListId, masterProductPriceId, shoppingListId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId = _context10.sent;
            _context10.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId = _context10.sent;
            _context10.next = 8;
            return _.ShoppingListService.create((0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId, masterProductPriceId));

          case 8:
            shoppingListId = _context10.sent;
            _context10.next = 11;
            return _.ShoppingListService.delete(shoppingListId);

          case 11:
            _context10.prev = 11;
            _context10.next = 14;
            return _.ShoppingListService.read(shoppingListId);

          case 14:
            _context10.next = 19;
            break;

          case 16:
            _context10.prev = 16;
            _context10.t0 = _context10['catch'](11);

            expect(_context10.t0).toBe('No shopping list found with Id: ' + shoppingListId);

          case 19:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[11, 16]]);
  })));
});

describe('search', function () {
  test('should return no shopping list if provided criteria matches no shopping list', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var shoppingList;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _.ShoppingListService.search(createCriteria());

          case 2:
            shoppingList = _context11.sent;


            expect(shoppingList.count()).toBe(0);

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));

  test('should return the shopping lists matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var stapleShoppingListId, masterProductPriceId, expectedShoppingListInfo, shoppingListId, shoppingListInfos, shoppingListInfo;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId = _context12.sent;
            _context12.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId = _context12.sent;
            expectedShoppingListInfo = (0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId, masterProductPriceId);
            _context12.next = 9;
            return _.ShoppingListService.create(expectedShoppingListInfo);

          case 9:
            shoppingListId = _context12.sent;
            _context12.next = 12;
            return _.ShoppingListService.search(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo, stapleShoppingListId, masterProductPriceId));

          case 12:
            shoppingListInfos = _context12.sent;


            expect(shoppingListInfos.count()).toBe(1);

            shoppingListInfo = shoppingListInfos.first();

            expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);

          case 16:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no shopping list if provided criteria matches no shopping list', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var result, shoppingList;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            result = _.ShoppingListService.searchAll(createCriteria());
            shoppingList = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return shoppingList = shoppingList.push(info);
            });

            _context13.prev = 3;
            _context13.next = 6;
            return result.promise;

          case 6:
            _context13.prev = 6;

            result.event.unsubscribeAll();
            return _context13.finish(6);

          case 9:

            expect(shoppingList.count()).toBe(0);

          case 10:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[3,, 6, 9]]);
  })));

  test('should return the shopping list matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var stapleShoppingListId, masterProductPriceId, expectedShoppingListInfo, result, shoppingList;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId = _context14.sent;
            _context14.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId = _context14.sent;
            expectedShoppingListInfo = (0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId, masterProductPriceId);
            _context14.next = 9;
            return _.ShoppingListService.create(expectedShoppingListInfo);

          case 9:
            _context14.next = 11;
            return _.ShoppingListService.create(expectedShoppingListInfo);

          case 11:
            result = _.ShoppingListService.searchAll(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo, stapleShoppingListId, masterProductPriceId));
            shoppingList = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return shoppingList = shoppingList.push(info);
            });

            _context14.prev = 14;
            _context14.next = 17;
            return result.promise;

          case 17:
            _context14.prev = 17;
            return _context14.finish(17);

          case 19:

            expect(shoppingList.count()).toBe(2);

          case 20:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined, [[14,, 17, 19]]);
  })));
});

describe('exists', function () {
  test('should return false if no shopping list match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _.ShoppingListService.exists(createCriteria());

          case 2:
            response = _context15.sent;


            expect(response).toBeFalsy();

          case 4:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));

  test('should return true if any shopping list match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var stapleShoppingListId, masterProductPriceId, shoppingListInfo, response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _.StapleShoppingListService.create((0, _StapleShoppingList.createStapleShoppingListInfo)(userId));

          case 2:
            stapleShoppingListId = _context16.sent;
            _context16.next = 5;
            return _.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)());

          case 5:
            masterProductPriceId = _context16.sent;
            shoppingListInfo = (0, _ShoppingList.createShoppingListInfo)(userId, stapleShoppingListId, masterProductPriceId);
            _context16.next = 9;
            return _.ShoppingListService.create(shoppingListInfo);

          case 9:
            _context16.next = 11;
            return _.ShoppingListService.exists(createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo, stapleShoppingListId, masterProductPriceId));

          case 11:
            response = _context16.sent;


            expect(response).toBeTruthy();

          case 13:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  })));
});