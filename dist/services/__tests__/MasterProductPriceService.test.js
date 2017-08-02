'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedMasterProductPriceInfo = createCriteriaUsingProvidedMasterProductPriceInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _MasterProduct = require('../../schema/__tests__/MasterProduct.test');

var _MasterProductPrice = require('../../schema/__tests__/MasterProductPrice.test');

var _Store = require('../../schema/__tests__/Store.test');

var _Tag = require('../../schema/__tests__/Tag.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId, tagIds) {
  expect(masterProductPriceInfo.get('id')).toBe(masterProductPriceId);
  expect(masterProductPriceInfo.get('name')).toEqual(expectedMasterProductPriceInfo.get('name'));
  expect(masterProductPriceInfo.get('description')).toEqual(expectedMasterProductPriceInfo.get('description'));
  expect(masterProductPriceInfo.get('storeName')).toEqual(expectedMasterProductPriceInfo.get('storeName'));
  expect(masterProductPriceInfo.get('priceDetails')).toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
  expect(masterProductPriceInfo.get('priceToDisplay')).toEqual(expectedMasterProductPriceInfo.get('priceToDisplay'));
  expect(masterProductPriceInfo.get('saving')).toEqual(expectedMasterProductPriceInfo.get('saving'));
  expect(masterProductPriceInfo.get('savingPercentage')).toEqual(expectedMasterProductPriceInfo.get('savingPercentage'));
  expect(masterProductPriceInfo.get('offerEndDate')).toEqual(expectedMasterProductPriceInfo.get('offerEndDate'));
  expect(masterProductPriceInfo.get('firstCrawledDate')).toEqual(expectedMasterProductPriceInfo.get('firstCrawledDate'));
  expect(masterProductPriceInfo.get('status')).toEqual(expectedMasterProductPriceInfo.get('status'));
  expect(masterProductPriceInfo.get('masterProductId')).toBe(masterProductId);
  expect(masterProductPriceInfo.get('storeId')).toBe(storeId);
  expect(masterProductPriceInfo.get('tagIds')).toEqual(tagIds);
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'description', 'storeName', 'priceDetails', 'priceToDisplay', 'saving', 'savingPercentage', 'offerEndDate', 'firstCrawledDate', 'status', 'masterProduct', 'store', 'tags'),
    includeStore: true,
    includeMasterProduct: true,
    conditions: (0, _immutable.Map)({
      masterProductId: (0, _v2.default)(),
      storeId: (0, _v2.default)(),
      tagIds: _immutable.List.of((0, _v2.default)(), (0, _v2.default)())
    })
  });
}

function createCriteriaUsingProvidedMasterProductPriceInfo(masterProductPriceInfo, masterProduct, store) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'description', 'storeName', 'priceDetails', 'priceToDisplay', 'saving', 'savingPercentage', 'offerEndDate', 'firstCrawledDate', 'status', 'masterProduct', 'store', 'tags'),
    includeStore: true,
    includeMasterProduct: true,
    conditions: (0, _immutable.Map)({
      name: masterProduct.get('name'),
      description: masterProduct.get('description'),
      storeName: store.get('name'),
      priceToDisplay: masterProductPriceInfo.get('priceToDisplay'),
      saving: masterProductPriceInfo.get('saving'),
      savingPercentage: masterProductPriceInfo.get('savingPercentage'),
      offerEndDate: masterProductPriceInfo.get('offerEndDate'),
      firstCrawledDate: masterProductPriceInfo.get('firstCrawledDate'),
      status: masterProductPriceInfo.get('status'),
      masterProductId: masterProduct.get('id'),
      storeId: store.get('id'),
      tagIds: masterProduct.get('tagIds')
    })
  });
}

describe('create', function () {
  test('should return the created master product price Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var tagIds, masterProduct, masterProductId, store, storeId, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _immutable.List;
            _context.next = 3;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 3:
            _context.t1 = _context.sent;
            tagIds = _context.t0.of.call(_context.t0, _context.t1);
            masterProduct = (0, _MasterProduct.createMasterProductInfo)(tagIds);
            _context.next = 8;
            return _2.MasterProductService.create(masterProduct);

          case 8:
            masterProductId = _context.sent;
            store = (0, _Store.createStoreInfo)();
            _context.next = 12;
            return _2.StoreService.create(store);

          case 12:
            storeId = _context.sent;
            _context.next = 15;
            return _2.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId, masterProduct, store, tagIds));

          case 15:
            result = _context.sent;


            expect(result).toBeDefined();

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should create the master product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var tagIds, masterProduct, masterProductId, store, storeId, expectedMasterProductPriceInfo, masterProductPriceId, masterProductPriceInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _immutable.List;
            _context2.next = 3;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 3:
            _context2.t1 = _context2.sent;
            tagIds = _context2.t0.of.call(_context2.t0, _context2.t1);
            masterProduct = (0, _MasterProduct.createMasterProductInfo)(tagIds);
            _context2.next = 8;
            return _2.MasterProductService.create(masterProduct);

          case 8:
            masterProductId = _context2.sent;
            store = (0, _Store.createStoreInfo)();
            _context2.next = 12;
            return _2.StoreService.create(store);

          case 12:
            storeId = _context2.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId, masterProduct, store, tagIds);
            _context2.next = 16;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 16:
            masterProductPriceId = _context2.sent;
            _context2.next = 19;
            return _2.MasterProductPriceService.read(masterProductPriceId);

          case 19:
            masterProductPriceInfo = _context2.sent;


            expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId, tagIds);

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided master product price Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var masterProductPriceId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            masterProductPriceId = (0, _v2.default)();
            _context3.prev = 1;
            _context3.next = 4;
            return _2.MasterProductPriceService.read(masterProductPriceId);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);

            expect(_context3.t0.getErrorMessage()).toBe('No master product price found with Id: ' + masterProductPriceId);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));

  test('should read the existing master product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var tagIds, masterProduct, masterProductId, store, storeId, expectedMasterProductPriceInfo, masterProductPriceId, masterProductPriceInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = _immutable.List;
            _context4.next = 3;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 3:
            _context4.t1 = _context4.sent;
            tagIds = _context4.t0.of.call(_context4.t0, _context4.t1);
            masterProduct = (0, _MasterProduct.createMasterProductInfo)(tagIds);
            _context4.next = 8;
            return _2.MasterProductService.create(masterProduct);

          case 8:
            masterProductId = _context4.sent;
            store = (0, _Store.createStoreInfo)();
            _context4.next = 12;
            return _2.StoreService.create(store);

          case 12:
            storeId = _context4.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId, masterProduct, store, tagIds);
            _context4.next = 16;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 16:
            masterProductPriceId = _context4.sent;
            _context4.next = 19;
            return _2.MasterProductPriceService.read(masterProductPriceId);

          case 19:
            masterProductPriceInfo = _context4.sent;


            expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId, tagIds);

          case 21:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided master product price Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var masterProductPriceId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            masterProductPriceId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.MasterProductPriceService.update((0, _MasterProductPrice.createMasterProductPriceInfo)().set('id', masterProductPriceId));

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No master product price found with Id: ' + masterProductPriceId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should return the Id of the updated master product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var masterProductId, storeId, masterProductPriceId, id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context6.sent;
            _context6.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context6.sent;
            _context6.next = 8;
            return _2.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId));

          case 8:
            masterProductPriceId = _context6.sent;
            _context6.next = 11;
            return _2.MasterProductPriceService.update((0, _MasterProductPrice.createMasterProductPriceInfo)().set('id', masterProductPriceId));

          case 11:
            id = _context6.sent;


            expect(id).toBe(masterProductPriceId);

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('should update the existing master product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var tagIds, masterProduct, masterProductId, storeId, expectedMasterProductId, store, expectedStoreId, masterProductPriceId, expectedMasterProductPriceInfo, masterProductPriceInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.t0 = _immutable.List;
            _context7.next = 3;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 3:
            _context7.t1 = _context7.sent;
            tagIds = _context7.t0.of.call(_context7.t0, _context7.t1);
            masterProduct = (0, _MasterProduct.createMasterProductInfo)(tagIds);
            _context7.next = 8;
            return _2.MasterProductService.create(masterProduct);

          case 8:
            masterProductId = _context7.sent;
            _context7.next = 11;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 11:
            storeId = _context7.sent;
            _context7.next = 14;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 14:
            expectedMasterProductId = _context7.sent;
            store = (0, _Store.createStoreInfo)();
            _context7.next = 18;
            return _2.StoreService.create(store);

          case 18:
            expectedStoreId = _context7.sent;
            _context7.next = 21;
            return _2.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId, masterProduct, store, tagIds));

          case 21:
            masterProductPriceId = _context7.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(expectedMasterProductId, expectedStoreId);
            _context7.next = 25;
            return _2.MasterProductPriceService.update(expectedMasterProductPriceInfo.set('id', masterProductPriceId));

          case 25:
            _context7.next = 27;
            return _2.MasterProductPriceService.read(masterProductPriceId);

          case 27:
            masterProductPriceInfo = _context7.sent;


            expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, expectedMasterProductId, expectedStoreId, tagIds);

          case 29:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided master product price Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var masterProductPriceId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            masterProductPriceId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.next = 4;
            return _2.MasterProductPriceService.delete(masterProductPriceId);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8['catch'](1);

            expect(_context8.t0.getErrorMessage()).toBe('No master product price found with Id: ' + masterProductPriceId);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 6]]);
  })));

  test('should delete the existing master product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var masterProductId, storeId, expectedMasterProductPriceInfo, masterProductPriceId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context9.sent;
            _context9.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context9.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId);
            _context9.next = 9;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 9:
            masterProductPriceId = _context9.sent;
            _context9.next = 12;
            return _2.MasterProductPriceService.delete(masterProductPriceId);

          case 12:
            _context9.prev = 12;
            _context9.next = 15;
            return _2.MasterProductPriceService.read(masterProductPriceId);

          case 15:
            _context9.next = 20;
            break;

          case 17:
            _context9.prev = 17;
            _context9.t0 = _context9['catch'](12);

            expect(_context9.t0.getErrorMessage()).toBe('No master product price found with Id: ' + masterProductPriceId);

          case 20:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[12, 17]]);
  })));
});

describe('search', function () {
  test('should return no master product price if provided criteria matches no master product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var masterProductPriceInfos;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _2.MasterProductPriceService.search(createCriteria());

          case 2:
            masterProductPriceInfos = _context10.sent;


            expect(masterProductPriceInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  test('should return the master products price matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var tagIds, masterProduct, masterProductId, store, storeId, expectedMasterProductPriceInfo, masterProductPriceId, masterProductPriceInfos, masterProductPriceInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.t0 = _immutable.List;
            _context11.next = 3;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 3:
            _context11.t1 = _context11.sent;
            tagIds = _context11.t0.of.call(_context11.t0, _context11.t1);
            masterProduct = (0, _MasterProduct.createMasterProductInfo)(tagIds);
            _context11.next = 8;
            return _2.MasterProductService.create(masterProduct);

          case 8:
            masterProductId = _context11.sent;
            store = (0, _Store.createStoreInfo)();
            _context11.next = 12;
            return _2.StoreService.create(store);

          case 12:
            storeId = _context11.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId, masterProduct, store, tagIds);
            _context11.next = 16;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 16:
            masterProductPriceId = _context11.sent;
            _context11.next = 19;
            return _2.MasterProductPriceService.search(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProduct, store));

          case 19:
            masterProductPriceInfos = _context11.sent;


            expect(masterProductPriceInfos.count()).toBe(1);

            masterProductPriceInfo = masterProductPriceInfos.first();


            expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId, tagIds);

          case 23:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no master product price if provided criteria matches no master product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var masterProductPrices, result;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            masterProductPrices = (0, _immutable.List)();
            result = _2.MasterProductPriceService.searchAll(createCriteria());
            _context12.prev = 2;

            result.event.subscribe(function (info) {
              masterProductPrices = masterProductPrices.push(info);
            });

            _context12.next = 6;
            return result.promise;

          case 6:
            expect(masterProductPrices.count()).toBe(0);

          case 7:
            _context12.prev = 7;

            result.event.unsubscribeAll();
            return _context12.finish(7);

          case 10:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[2,, 7, 10]]);
  })));

  test('should return the master products price matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var masterProduct, masterProductId, store, storeId, expectedMasterProductPriceInfo, masterProductPriceId1, masterProductPriceId2, masterProductPrices, result;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            masterProduct = (0, _MasterProduct.createMasterProductInfo)();
            _context13.next = 3;
            return _2.MasterProductService.create(masterProduct);

          case 3:
            masterProductId = _context13.sent;
            store = (0, _Store.createStoreInfo)();
            _context13.next = 7;
            return _2.StoreService.create(store);

          case 7:
            storeId = _context13.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId, masterProduct, store);
            _context13.next = 11;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 11:
            masterProductPriceId1 = _context13.sent;
            _context13.next = 14;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 14:
            masterProductPriceId2 = _context13.sent;
            masterProductPrices = (0, _immutable.List)();
            result = _2.MasterProductPriceService.searchAll(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProduct, store));
            _context13.prev = 17;

            result.event.subscribe(function (info) {
              masterProductPrices = masterProductPrices.push(info);
            });

            _context13.next = 21;
            return result.promise;

          case 21:
            _context13.prev = 21;

            result.event.unsubscribeAll();
            return _context13.finish(21);

          case 24:
            expect(masterProductPrices.count()).toBe(2);
            expect(masterProductPrices.find(function (_) {
              return _.get('id') === masterProductPriceId1;
            })).toBeTruthy();
            expect(masterProductPrices.find(function (_) {
              return _.get('id') === masterProductPriceId2;
            })).toBeTruthy();

          case 27:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[17,, 21, 24]]);
  })));
});

describe('exists', function () {
  test('should return false if no master product price match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _2.MasterProductPriceService.exists(createCriteria());

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

  test('should return true if any master product price match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var masterProduct, masterProductId, store, storeId, expectedMasterProductPriceInfo, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            masterProduct = (0, _MasterProduct.createMasterProductInfo)();
            _context15.next = 3;
            return _2.MasterProductService.create(masterProduct);

          case 3:
            masterProductId = _context15.sent;
            store = (0, _Store.createStoreInfo)();
            _context15.next = 7;
            return _2.StoreService.create(store);

          case 7:
            storeId = _context15.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId, masterProduct, store);
            _context15.next = 11;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 11:
            _context15.next = 13;
            return _2.MasterProductPriceService.exists(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProduct, store));

          case 13:
            response = _context15.sent;

            expect(response).toBeTruthy();

          case 15:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no master product price match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _2.MasterProductPriceService.count(createCriteria());

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

  test('should return the count of master product price match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var masterProduct, masterProductId, store, storeId, expectedMasterProductPriceInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            masterProduct = (0, _MasterProduct.createMasterProductInfo)();
            _context17.next = 3;
            return _2.MasterProductService.create(masterProduct);

          case 3:
            masterProductId = _context17.sent;
            store = (0, _Store.createStoreInfo)();
            _context17.next = 7;
            return _2.StoreService.create(store);

          case 7:
            storeId = _context17.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId, masterProduct, store);
            _context17.next = 11;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 11:
            _context17.next = 13;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 13:
            _context17.next = 15;
            return _2.MasterProductPriceService.count(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProduct, store));

          case 15:
            response = _context17.sent;

            expect(response).toBe(2);

          case 17:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});