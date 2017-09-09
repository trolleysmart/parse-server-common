'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectShoppingListItem = exports.createShoppingListItem = exports.createShoppingListItemInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

var _ProductPriceService = require('../../services/__tests__/ProductPriceService.test');

var _ProductPriceService2 = _interopRequireDefault(_ProductPriceService);

var _StapleItemService = require('../../services/__tests__/StapleItemService.test');

var _StapleItemService2 = _interopRequireDefault(_StapleItemService);

var _StoreService = require('../../services/__tests__/StoreService.test');

var _StoreService2 = _interopRequireDefault(_StoreService);

var _ShoppingListService = require('../../services/__tests__/ShoppingListService.test');

var _ShoppingListService2 = _interopRequireDefault(_ShoppingListService);

var _TagService = require('../../services/__tests__/TagService.test');

var _TagService2 = _interopRequireDefault(_TagService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();

var createShoppingListItemInfo = exports.createShoppingListItemInfo = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var shoppingList, productPrice, stapleItem, store, tags, addedByUser, removedByUser, shoppingListItem;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _ShoppingListService2.default)(1);

          case 2:
            shoppingList = _context.sent.first();
            _context.next = 5;
            return (0, _ProductPriceService2.default)(1);

          case 5:
            productPrice = _context.sent.first();
            _context.next = 8;
            return (0, _StapleItemService2.default)(1);

          case 8:
            stapleItem = _context.sent.first();
            _context.next = 11;
            return (0, _StoreService2.default)(1);

          case 11:
            store = _context.sent.first();
            _context.next = 14;
            return (0, _TagService2.default)(chance.integer({ min: 1, max: 10 }));

          case 14:
            tags = _context.sent;
            _context.next = 17;
            return _microBusinessParseServerCommon.ParseWrapperService.createNewUser({ username: (0, _v2.default)() + '@email.com', password: '123456' }).signUp();

          case 17:
            addedByUser = _context.sent;
            _context.next = 20;
            return _microBusinessParseServerCommon.ParseWrapperService.createNewUser({ username: (0, _v2.default)() + '@email.com', password: '123456' }).signUp();

          case 20:
            removedByUser = _context.sent;
            shoppingListItem = (0, _immutable.Map)({
              name: (0, _v2.default)(),
              description: (0, _v2.default)(),
              imageUrl: (0, _v2.default)(),
              isPurchased: chance.integer({ min: 0, max: 1000 }) % 2 === 0,
              addedByUserId: addedByUser.id,
              removedByUserId: removedByUser.id,
              shoppingListId: shoppingList.get('id'),
              productPriceId: productPrice.get('id'),
              stapleItemId: stapleItem.get('id'),
              storeId: store.get('id'),
              tagIds: tags.map(function (tag) {
                return tag.get('id');
              })
            });
            return _context.abrupt('return', {
              shoppingListItem: shoppingListItem,
              addedByUser: addedByUser,
              removedByUser: removedByUser,
              shoppingList: shoppingList,
              productPrice: productPrice,
              stapleItem: stapleItem,
              store: store,
              tags: tags
            });

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createShoppingListItemInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createShoppingListItem = exports.createShoppingListItem = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(object) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _.ShoppingListItem;
            _context2.t1 = object;

            if (_context2.t1) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return createShoppingListItemInfo();

          case 5:
            _context2.t1 = _context2.sent.shoppingListItem;

          case 6:
            _context2.t2 = _context2.t1;
            return _context2.abrupt('return', _context2.t0.spawn.call(_context2.t0, _context2.t2));

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createShoppingListItem(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var expectShoppingListItem = exports.expectShoppingListItem = function expectShoppingListItem(object, expectedObject) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      shoppingListItemId = _ref3.shoppingListItemId,
      expectedShoppingList = _ref3.expectedShoppingList,
      expectedProductPrice = _ref3.expectedProductPrice,
      expectedStapleItem = _ref3.expectedStapleItem,
      expectedStore = _ref3.expectedStore,
      expectedTags = _ref3.expectedTags,
      expectedAddedByUser = _ref3.expectedAddedByUser,
      expectedRemovedByUser = _ref3.expectedRemovedByUser;

  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('isPurchased')).toBe(expectedObject.get('isPurchased'));
  expect(object.get('addedByUserId')).toBe(expectedObject.get('addedByUserId'));
  expect(object.get('removedByUserId')).toBe(expectedObject.get('removedByUserId'));
  expect(object.get('shoppingListId')).toBe(expectedObject.get('shoppingListId'));
  expect(object.get('productPriceId')).toBe(expectedObject.get('productPriceId'));
  expect(object.get('stapleItemId')).toBe(expectedObject.get('stapleItemId'));
  expect(object.get('storeId')).toBe(expectedObject.get('storeId'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));

  if (shoppingListItemId) {
    expect(object.get('id')).toBe(shoppingListItemId);
  }

  if (expectedAddedByUser) {
    expect(object.get('addedByUser').id).toEqual(expectedAddedByUser.id);
    expect(object.get('addedByUser').username).toEqual(expectedAddedByUser.username);
  }

  if (expectedRemovedByUser) {
    expect(object.get('removedByUser').id).toEqual(expectedRemovedByUser.id);
    expect(object.get('removedByUser').username).toEqual(expectedRemovedByUser.username);
  }

  if (expectedShoppingList) {
    expect(object.getIn(['shoppingList', 'id'])).toBe(expectedShoppingList.get('id'));
  }

  if (expectedProductPrice) {
    expect(object.getIn(['productPrice', 'id'])).toBe(expectedProductPrice.get('id'));
  }

  if (expectedStapleItem) {
    expect(object.getIn(['stapleItem', 'id'])).toBe(expectedStapleItem.get('id'));
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
  }
};

describe('constructor', function () {
  test('should set class name', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return createShoppingListItem();

          case 3:
            _context3.t1 = _context3.sent.className;
            (0, _context3.t0)(_context3.t1).toBe('ShoppingListItem');

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});

describe('static public methods', function () {
  test('spawn should set provided info', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var _ref6, shoppingListItem, object, info;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createShoppingListItemInfo();

          case 2:
            _ref6 = _context4.sent;
            shoppingListItem = _ref6.shoppingListItem;
            _context4.next = 6;
            return createShoppingListItem(shoppingListItem);

          case 6:
            object = _context4.sent;
            info = object.getInfo();


            expectShoppingListItem(info, shoppingListItem);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('public methods', function () {
  test('getObject should return provided object', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var object;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return createShoppingListItem();

          case 2:
            object = _context5.sent;


            expect(new _.ShoppingListItem(object).getObject()).toBe(object);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  test('getId should return provided object Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var object;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return createShoppingListItem();

          case 2:
            object = _context6.sent;


            expect(new _.ShoppingListItem(object).getId()).toBe(object.id);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('updateInfo should update object info', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var object, _ref10, updatedShoppingListItem, info;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createShoppingListItem();

          case 2:
            object = _context7.sent;
            _context7.next = 5;
            return createShoppingListItemInfo();

          case 5:
            _ref10 = _context7.sent;
            updatedShoppingListItem = _ref10.shoppingListItem;


            object.updateInfo(updatedShoppingListItem);

            info = object.getInfo();


            expectShoppingListItem(info, updatedShoppingListItem);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  test('getInfo should return provided info', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref12, shoppingListItem, object, info;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createShoppingListItemInfo();

          case 2:
            _ref12 = _context8.sent;
            shoppingListItem = _ref12.shoppingListItem;
            _context8.next = 6;
            return createShoppingListItem(shoppingListItem);

          case 6:
            object = _context8.sent;
            info = object.getInfo();


            expect(info.get('id')).toBe(object.getId());
            expectShoppingListItem(info, shoppingListItem);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});