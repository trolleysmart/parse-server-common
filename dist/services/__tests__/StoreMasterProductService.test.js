'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedStoreMasterProductInfo = createCriteriaUsingProvidedStoreMasterProductInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _StoreMasterProduct = require('../../schema/__tests__/StoreMasterProduct.test');

var _StoreTag = require('../../schema/__tests__/StoreTag.test');

var _MasterProduct = require('../../schema/__tests__/MasterProduct.test');

var _Store = require('../../schema/__tests__/Store.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId) {
  expect(storeMasterProductInfo.get('id')).toBe(storeMasterProductId);
  expect(storeMasterProductInfo.get('name')).toBe(expectedStoreMasterProductInfo.get('name'));
  expect(storeMasterProductInfo.get('description')).toBe(expectedStoreMasterProductInfo.get('description'));
  expect(storeMasterProductInfo.get('barcode')).toBe(expectedStoreMasterProductInfo.get('barcode'));
  expect(storeMasterProductInfo.get('productPageUrl')).toBe(expectedStoreMasterProductInfo.get('productPageUrl'));
  expect(storeMasterProductInfo.get('imageUrl')).toBe(expectedStoreMasterProductInfo.get('imageUrl'));
  expect(storeMasterProductInfo.get('size')).toBe(expectedStoreMasterProductInfo.get('size'));
  expect(storeMasterProductInfo.get('lastCrawlDateTime')).toBe(expectedStoreMasterProductInfo.get('lastCrawlDateTime'));
  expect(storeMasterProductInfo.get('storeTagIds')).toEqual(expectedStoreMasterProductInfo.get('storeTagIds'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'lastCrawlDateTime', 'storeTags'),
    includeStoreTags: true,
    conditions: (0, _immutable.Map)({
      name: (0, _v2.default)(),
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      productPageUrl: (0, _v2.default)(),
      imageUrl: (0, _v2.default)(),
      size: (0, _v2.default)(),
      lastCrawlDateTime: new Date()
    })
  });
}

function createCriteriaUsingProvidedStoreMasterProductInfo(storeMasterProductInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'lastCrawlDateTime', 'storeTags'),
    includeStoreTags: true,
    conditions: (0, _immutable.Map)({
      name: storeMasterProductInfo.get('name'),
      description: storeMasterProductInfo.get('description'),
      barcode: storeMasterProductInfo.get('barcode'),
      productPageUrl: storeMasterProductInfo.get('productPageUrl'),
      imageUrl: storeMasterProductInfo.get('imageUrl'),
      size: storeMasterProductInfo.get('size'),
      lastCrawlDateTime: storeMasterProductInfo.get('lastCrawlDateTime'),
      storeTags: storeMasterProductInfo.get('storeTags')
    })
  });
}

describe('create', function () {
  test('should return the created store master product Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var storeTagId1, storeTagId2, storeId, masterProductId, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context.sent;
            _context.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context.sent;
            _context.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context.sent;
            _context.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context.sent;
            _context.next = 14;
            return _2.StoreMasterProductService.create((0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId));

          case 14:
            result = _context.sent;


            expect(result).toBeDefined();

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should create the store master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var storeTagId1, storeTagId2, storeId, masterProductId, expectedStoreMasterProductInfo, storeMasterProductId, storeMasterProductInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context2.sent;
            _context2.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context2.sent;
            _context2.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context2.sent;
            _context2.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context2.sent;
            expectedStoreMasterProductInfo = (0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId);
            _context2.next = 15;
            return _2.StoreMasterProductService.create(expectedStoreMasterProductInfo);

          case 15:
            storeMasterProductId = _context2.sent;
            _context2.next = 18;
            return _2.StoreMasterProductService.read(storeMasterProductId);

          case 18:
            storeMasterProductInfo = _context2.sent;


            expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId);

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided store master product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var storeMasterProductId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            storeMasterProductId = (0, _v2.default)();
            _context3.prev = 1;
            _context3.next = 4;
            return _2.StoreMasterProductService.read(storeMasterProductId);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);

            expect(_context3.t0.getErrorMessage()).toBe('No store master product found with Id: ' + storeMasterProductId);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));

  test('should read the existing store master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var storeTagId1, storeTagId2, storeId, masterProductId, expectedStoreMasterProductInfo, storeMasterProductId, storeMasterProductInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context4.sent;
            _context4.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context4.sent;
            _context4.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context4.sent;
            _context4.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context4.sent;
            expectedStoreMasterProductInfo = (0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId);
            _context4.next = 15;
            return _2.StoreMasterProductService.create(expectedStoreMasterProductInfo);

          case 15:
            storeMasterProductId = _context4.sent;
            _context4.next = 18;
            return _2.StoreMasterProductService.read(storeMasterProductId);

          case 18:
            storeMasterProductInfo = _context4.sent;


            expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId);

          case 20:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided store master product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var storeMasterProductId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            storeMasterProductId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.StoreMasterProductService.update((0, _StoreMasterProduct.createStoreMasterProductInfo)().set('id', storeMasterProductId));

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No store master product found with Id: ' + storeMasterProductId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should return the Id of the updated store master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var storeMasterProductId, id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _2.StoreMasterProductService.create((0, _StoreMasterProduct.createStoreMasterProductInfo)());

          case 2:
            storeMasterProductId = _context6.sent;
            _context6.next = 5;
            return _2.StoreMasterProductService.update((0, _StoreMasterProduct.createStoreMasterProductInfo)().set('id', storeMasterProductId));

          case 5:
            id = _context6.sent;


            expect(id).toBe(storeMasterProductId);

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('should update the existing store master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var storeTagId1, storeTagId2, storeId, masterProductId, id, expectedStoreMasterProductInfo, storeMasterProductId, storeMasterProductInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context7.sent;
            _context7.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context7.sent;
            _context7.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context7.sent;
            _context7.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context7.sent;
            _context7.next = 14;
            return _2.StoreMasterProductService.create((0, _StoreMasterProduct.createStoreMasterProductInfo)());

          case 14:
            id = _context7.sent;
            expectedStoreMasterProductInfo = (0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId);
            _context7.next = 18;
            return _2.StoreMasterProductService.update(expectedStoreMasterProductInfo.set('id', id));

          case 18:
            storeMasterProductId = _context7.sent;
            _context7.next = 21;
            return _2.StoreMasterProductService.read(storeMasterProductId);

          case 21:
            storeMasterProductInfo = _context7.sent;


            expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId);

          case 23:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided store master product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var storeMasterProductId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            storeMasterProductId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.next = 4;
            return _2.StoreMasterProductService.delete(storeMasterProductId);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8['catch'](1);

            expect(_context8.t0.getErrorMessage()).toBe('No store master product found with Id: ' + storeMasterProductId);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 6]]);
  })));

  test('should delete the existing store master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var storeTagId1, storeTagId2, storeId, masterProductId, storeMasterProductInfo, storeMasterProductId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context9.sent;
            _context9.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context9.sent;
            _context9.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context9.sent;
            _context9.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context9.sent;
            storeMasterProductInfo = (0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId);
            _context9.next = 15;
            return _2.StoreMasterProductService.create(storeMasterProductInfo);

          case 15:
            storeMasterProductId = _context9.sent;
            _context9.next = 18;
            return _2.StoreMasterProductService.delete(storeMasterProductId);

          case 18:
            _context9.prev = 18;
            _context9.next = 21;
            return _2.StoreMasterProductService.delete(storeMasterProductId);

          case 21:
            _context9.next = 26;
            break;

          case 23:
            _context9.prev = 23;
            _context9.t0 = _context9['catch'](18);

            expect(_context9.t0.getErrorMessage()).toBe('No store master product found with Id: ' + storeMasterProductId);

          case 26:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[18, 23]]);
  })));
});

describe('search', function () {
  test('should return no store master product if provided criteria matches no store master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var storeMasterProductInfos;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _2.StoreMasterProductService.search(createCriteria());

          case 2:
            storeMasterProductInfos = _context10.sent;


            expect(storeMasterProductInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  test('should return the store master products matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var storeTagId1, storeTagId2, storeId, masterProductId, expectedStoreMasterProductInfo, storeMasterProductId, storeMasterProductInfos, storeMasterProductInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context11.sent;
            _context11.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context11.sent;
            _context11.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context11.sent;
            _context11.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context11.sent;
            expectedStoreMasterProductInfo = (0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId);
            _context11.next = 15;
            return _2.StoreMasterProductService.create(expectedStoreMasterProductInfo);

          case 15:
            storeMasterProductId = _context11.sent;
            _context11.next = 18;
            return _2.StoreMasterProductService.search(createCriteriaUsingProvidedStoreMasterProductInfo(expectedStoreMasterProductInfo));

          case 18:
            storeMasterProductInfos = _context11.sent;


            expect(storeMasterProductInfos.count()).toBe(1);

            storeMasterProductInfo = storeMasterProductInfos.first();


            expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId);

          case 22:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no store master product if provided criteria matches no store master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var result, storeMasterProductInfos;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            result = _2.StoreMasterProductService.searchAll(createCriteria());
            _context12.prev = 1;
            storeMasterProductInfos = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return storeMasterProductInfos = storeMasterProductInfos.push(info);
            });

            _context12.next = 6;
            return result.promise;

          case 6:
            expect(storeMasterProductInfos.count()).toBe(0);

          case 7:
            _context12.prev = 7;

            result.event.unsubscribeAll();
            return _context12.finish(7);

          case 10:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[1,, 7, 10]]);
  })));

  test('should return the store master products matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var storeTagId1, storeTagId2, storeId, masterProductId, expectedStoreMasterProductInfo, storeMasterProductId1, storeMasterProductId2, result, storeMasterProductInfos;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context13.sent;
            _context13.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context13.sent;
            _context13.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context13.sent;
            _context13.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context13.sent;
            expectedStoreMasterProductInfo = (0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId);
            _context13.next = 15;
            return _2.StoreMasterProductService.create(expectedStoreMasterProductInfo);

          case 15:
            storeMasterProductId1 = _context13.sent;
            _context13.next = 18;
            return _2.StoreMasterProductService.create(expectedStoreMasterProductInfo);

          case 18:
            storeMasterProductId2 = _context13.sent;
            result = _2.StoreMasterProductService.searchAll(createCriteriaUsingProvidedStoreMasterProductInfo(expectedStoreMasterProductInfo));
            _context13.prev = 20;
            storeMasterProductInfos = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return storeMasterProductInfos = storeMasterProductInfos.push(info);
            });

            _context13.next = 25;
            return result.promise;

          case 25:
            expect(storeMasterProductInfos.count()).toBe(2);
            expect(storeMasterProductInfos.find(function (_) {
              return _.get('id').localeCompare(storeMasterProductId1) === 0;
            })).toBeTruthy();
            expect(storeMasterProductInfos.find(function (_) {
              return _.get('id').localeCompare(storeMasterProductId2) === 0;
            })).toBeTruthy();

          case 28:
            _context13.prev = 28;

            result.event.unsubscribeAll();
            return _context13.finish(28);

          case 31:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[20,, 28, 31]]);
  })));
});

describe('exists', function () {
  test('should return false if no store master product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _2.StoreMasterProductService.exists(createCriteria());

          case 2:
            response = _context14.sent;


            expect(response).toBeFalsy();

          case 4:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));

  test('should return true if any store master product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var storeTagId1, storeTagId2, storeId, masterProductId, storeMasterProductInfo, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context15.sent;
            _context15.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context15.sent;
            _context15.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context15.sent;
            _context15.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context15.sent;
            storeMasterProductInfo = (0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId);
            _context15.next = 15;
            return _2.StoreMasterProductService.create(storeMasterProductInfo);

          case 15:
            _context15.next = 17;
            return _2.StoreMasterProductService.exists(createCriteriaUsingProvidedStoreMasterProductInfo(storeMasterProductInfo));

          case 17:
            response = _context15.sent;


            expect(response).toBeTruthy();

          case 19:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no store master product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _2.StoreMasterProductService.count(createCriteria());

          case 2:
            response = _context16.sent;


            expect(response).toBe(0);

          case 4:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  })));

  test('should return the count of store master product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var storeTagId1, storeTagId2, storeId, masterProductId, storeMasterProductInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 2:
            storeTagId1 = _context17.sent;
            _context17.next = 5;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 5:
            storeTagId2 = _context17.sent;
            _context17.next = 8;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 8:
            storeId = _context17.sent;
            _context17.next = 11;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 11:
            masterProductId = _context17.sent;
            storeMasterProductInfo = (0, _StoreMasterProduct.createStoreMasterProductInfo)(_immutable.List.of(storeTagId1, storeTagId2), storeId, masterProductId);
            _context17.next = 15;
            return _2.StoreMasterProductService.create(storeMasterProductInfo);

          case 15:
            _context17.next = 17;
            return _2.StoreMasterProductService.create(storeMasterProductInfo);

          case 17:
            _context17.next = 19;
            return _2.StoreMasterProductService.count(createCriteriaUsingProvidedStoreMasterProductInfo(storeMasterProductInfo));

          case 19:
            response = _context17.sent;


            expect(response).toBe(2);

          case 21:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});