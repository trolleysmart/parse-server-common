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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId) {
  expect(masterProductPriceInfo.get('id')).toBe(masterProductPriceId);
  expect(masterProductPriceInfo.get('masterProductId')).toBe(masterProductId);
  expect(masterProductPriceInfo.get('description')).toEqual(expectedMasterProductPriceInfo.get('description'));
  expect(masterProductPriceInfo.get('storeId')).toBe(storeId);
  expect(masterProductPriceInfo.get('storeName')).toEqual(expectedMasterProductPriceInfo.get('storeName'));
  expect(masterProductPriceInfo.get('priceDetails')).toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
  expect(masterProductPriceInfo.get('capturedDate')).toEqual(expectedMasterProductPriceInfo.get('capturedDate'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('masterProduct', 'store', 'storeName', 'priceDetails', 'description', 'capturedDate'),
    includeStore: true,
    includeMasterProduct: true,
    conditions: (0, _immutable.Map)({
      masterProductId: (0, _v2.default)(),
      storeId: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedMasterProductPriceInfo(masterProductPriceInfo, masterProductId, storeId) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('masterProduct', 'store', 'storeName', 'priceDetails', 'description', 'capturedDate'),
    includeStore: true,
    includeMasterProduct: true,
    conditions: (0, _immutable.Map)({
      masterProductId: masterProductId,
      storeId: storeId
    })
  });
}

describe('create', function () {
  test('should return the created master product price Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var masterProductId, storeId, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context.sent;
            _context.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context.sent;
            _context.next = 8;
            return _2.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId));

          case 8:
            result = _context.sent;


            expect(result).toBeDefined();

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should create the master product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var masterProductId, storeId, expectedMasterProductPriceInfo, masterProductPriceId, masterProductPriceInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context2.sent;
            _context2.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context2.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId);
            _context2.next = 9;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 9:
            masterProductPriceId = _context2.sent;
            _context2.next = 12;
            return _2.MasterProductPriceService.read(masterProductPriceId);

          case 12:
            masterProductPriceInfo = _context2.sent;


            expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);

          case 14:
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
    var masterProductId, storeId, expectedMasterProductPriceInfo, masterProductPriceId, masterProductPriceInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context4.sent;
            _context4.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context4.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId);
            _context4.next = 9;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 9:
            masterProductPriceId = _context4.sent;
            _context4.next = 12;
            return _2.MasterProductPriceService.read(masterProductPriceId);

          case 12:
            masterProductPriceInfo = _context4.sent;


            expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);

          case 14:
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
    var masterProductId, storeId, expectedMasterProductId, expectedStoreId, masterProductPriceId, expectedMasterProductPriceInfo, masterProductPriceInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context7.sent;
            _context7.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context7.sent;
            _context7.next = 8;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 8:
            expectedMasterProductId = _context7.sent;
            _context7.next = 11;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 11:
            expectedStoreId = _context7.sent;
            _context7.next = 14;
            return _2.MasterProductPriceService.create((0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId));

          case 14:
            masterProductPriceId = _context7.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(expectedMasterProductId, expectedStoreId);
            _context7.next = 18;
            return _2.MasterProductPriceService.update(expectedMasterProductPriceInfo.set('id', masterProductPriceId));

          case 18:
            _context7.next = 20;
            return _2.MasterProductPriceService.read(masterProductPriceId);

          case 20:
            masterProductPriceInfo = _context7.sent;


            expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, expectedMasterProductId, expectedStoreId);

          case 22:
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
    var masterProductId, storeId, expectedMasterProductPriceInfo, masterProductPriceId, masterProductPriceInfos, masterProductPriceInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context11.sent;
            _context11.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context11.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId);
            _context11.next = 9;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 9:
            masterProductPriceId = _context11.sent;
            _context11.next = 12;
            return _2.MasterProductPriceService.search(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProductId, storeId));

          case 12:
            masterProductPriceInfos = _context11.sent;


            expect(masterProductPriceInfos.count()).toBe(1);

            masterProductPriceInfo = masterProductPriceInfos.first();


            expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);

          case 16:
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
              return masterProductPrices = masterProductPrices.push(info);
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
    var masterProductId, storeId, expectedMasterProductPriceInfo, masterProductPriceId1, masterProductPriceId2, masterProductPrices, result;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context13.sent;
            _context13.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context13.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId);
            _context13.next = 9;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 9:
            masterProductPriceId1 = _context13.sent;
            _context13.next = 12;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 12:
            masterProductPriceId2 = _context13.sent;
            masterProductPrices = (0, _immutable.List)();
            result = _2.MasterProductPriceService.searchAll(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProductId, storeId));
            _context13.prev = 15;

            result.event.subscribe(function (info) {
              return masterProductPrices = masterProductPrices.push(info);
            });

            _context13.next = 19;
            return result.promise;

          case 19:
            _context13.prev = 19;

            result.event.unsubscribeAll();
            return _context13.finish(19);

          case 22:
            expect(masterProductPrices.count()).toBe(2);
            expect(masterProductPrices.find(function (_) {
              return _.get('id') === masterProductPriceId1;
            })).toBeTruthy();
            expect(masterProductPrices.find(function (_) {
              return _.get('id') === masterProductPriceId2;
            })).toBeTruthy();

          case 25:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[15,, 19, 22]]);
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
    var masterProductId, storeId, expectedMasterProductPriceInfo, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context15.sent;
            _context15.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context15.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId);
            _context15.next = 9;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 9:
            _context15.next = 11;
            return _2.MasterProductPriceService.exists(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProductId, storeId));

          case 11:
            response = _context15.sent;

            expect(response).toBeTruthy();

          case 13:
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
    var masterProductId, storeId, expectedMasterProductPriceInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context17.sent;
            _context17.next = 5;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 5:
            storeId = _context17.sent;
            expectedMasterProductPriceInfo = (0, _MasterProductPrice.createMasterProductPriceInfo)(masterProductId, storeId);
            _context17.next = 9;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 9:
            _context17.next = 11;
            return _2.MasterProductPriceService.create(expectedMasterProductPriceInfo);

          case 11:
            _context17.next = 13;
            return _2.MasterProductPriceService.count(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProductId, storeId));

          case 13:
            response = _context17.sent;

            expect(response).toBe(2);

          case 15:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});