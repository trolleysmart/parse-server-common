'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedMasterProductInfo = createCriteriaUsingProvidedMasterProductInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _MasterProduct = require('../../schema/__tests__/MasterProduct.test');

var _Tag = require('../../schema/__tests__/Tag.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId) {
  expect(masterProductInfo.get('id')).toBe(masterProductId);
  expect(masterProductInfo.get('description')).toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('barcode')).toBe(expectedMasterProductInfo.get('barcode'));
  expect(masterProductInfo.get('imageUrl')).toBe(expectedMasterProductInfo.get('imageUrl'));
  expect(masterProductInfo.get('tagIds')).toEqual(expectedMasterProductInfo.get('tagIds'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('description', 'barcode', 'imageUrl', 'tags'),
    includeTags: true,
    conditions: (0, _immutable.Map)({
      description: (0, _v2.default)(),
      barcode: (0, _v2.default)(),
      imageUrl: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedMasterProductInfo(masterProductInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('description', 'barcode', 'imageUrl', 'tags'),
    includeTags: true,
    conditions: (0, _immutable.Map)({
      description: masterProductInfo.get('description'),
      barcode: masterProductInfo.get('barcode'),
      imageUrl: masterProductInfo.get('imageUrl'),
      tags: masterProductInfo.get('tags')
    })
  });
}

describe('create', function () {
  test('should return the created master product Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            result = _context.sent;


            expect(result).toBeDefined();

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should create the master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var tagId1, tagId2, expectedMasterProductInfo, masterProductId, masterProductInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId1 = _context2.sent;
            _context2.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId2 = _context2.sent;
            expectedMasterProductInfo = (0, _MasterProduct.createMasterProductInfo)(_immutable.List.of(tagId1, tagId2));
            _context2.next = 9;
            return _2.MasterProductService.create(expectedMasterProductInfo);

          case 9:
            masterProductId = _context2.sent;
            _context2.next = 12;
            return _2.MasterProductService.read(masterProductId);

          case 12:
            masterProductInfo = _context2.sent;


            expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided master product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var masterProductId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            masterProductId = (0, _v2.default)();
            _context3.prev = 1;
            _context3.next = 4;
            return _2.MasterProductService.read(masterProductId);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);

            expect(_context3.t0.getErrorMessage()).toBe('No master product found with Id: ' + masterProductId);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));

  test('should read the existing master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var tagId1, tagId2, expectedMasterProductInfo, masterProductId, masterProductInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId1 = _context4.sent;
            _context4.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId2 = _context4.sent;
            expectedMasterProductInfo = (0, _MasterProduct.createMasterProductInfo)(_immutable.List.of(tagId1, tagId2));
            _context4.next = 9;
            return _2.MasterProductService.create(expectedMasterProductInfo);

          case 9:
            masterProductId = _context4.sent;
            _context4.next = 12;
            return _2.MasterProductService.read(masterProductId);

          case 12:
            masterProductInfo = _context4.sent;


            expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided master product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var masterProductId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            masterProductId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.MasterProductService.update((0, _MasterProduct.createMasterProductInfo)().set('id', masterProductId));

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No master product found with Id: ' + masterProductId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should return the Id of the updated master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var masterProductId, id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context6.sent;
            _context6.next = 5;
            return _2.MasterProductService.update((0, _MasterProduct.createMasterProductInfo)().set('id', masterProductId));

          case 5:
            id = _context6.sent;


            expect(id).toBe(masterProductId);

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('should update the existing master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var tagId1, tagId2, id, expectedMasterProductInfo, masterProductId, masterProductInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId1 = _context7.sent;
            _context7.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId2 = _context7.sent;
            _context7.next = 8;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 8:
            id = _context7.sent;
            expectedMasterProductInfo = (0, _MasterProduct.createMasterProductInfo)(_immutable.List.of(tagId1, tagId2));
            _context7.next = 12;
            return _2.MasterProductService.update(expectedMasterProductInfo.set('id', id));

          case 12:
            masterProductId = _context7.sent;
            _context7.next = 15;
            return _2.MasterProductService.read(masterProductId);

          case 15:
            masterProductInfo = _context7.sent;


            expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);

          case 17:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided master product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var masterProductId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            masterProductId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.next = 4;
            return _2.MasterProductService.delete(masterProductId);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8['catch'](1);

            expect(_context8.t0.getErrorMessage()).toBe('No master product found with Id: ' + masterProductId);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 6]]);
  })));

  test('should delete the existing master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var masterProductId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _2.MasterProductService.create((0, _MasterProduct.createMasterProductInfo)());

          case 2:
            masterProductId = _context9.sent;
            _context9.next = 5;
            return _2.MasterProductService.delete(masterProductId);

          case 5:
            _context9.prev = 5;
            _context9.next = 8;
            return _2.MasterProductService.delete(masterProductId);

          case 8:
            _context9.next = 13;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9['catch'](5);

            expect(_context9.t0.getErrorMessage()).toBe('No master product found with Id: ' + masterProductId);

          case 13:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[5, 10]]);
  })));
});

describe('search', function () {
  test('should return no master product if provided criteria matches no master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var masterProductInfos;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _2.MasterProductService.search(createCriteria());

          case 2:
            masterProductInfos = _context10.sent;


            expect(masterProductInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  test('should return the master products matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var tagId1, tagId2, expectedMasterProductInfo, masterProductId, masterProductInfos, masterProductInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId1 = _context11.sent;
            _context11.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId2 = _context11.sent;
            expectedMasterProductInfo = (0, _MasterProduct.createMasterProductInfo)(_immutable.List.of(tagId1, tagId2));
            _context11.next = 9;
            return _2.MasterProductService.create(expectedMasterProductInfo);

          case 9:
            masterProductId = _context11.sent;
            _context11.next = 12;
            return _2.MasterProductService.search(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));

          case 12:
            masterProductInfos = _context11.sent;


            expect(masterProductInfos.count()).toBe(1);

            masterProductInfo = masterProductInfos.first();


            expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);

          case 16:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no master product if provided criteria matches no master product', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var result, masterProductInfos;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            result = _2.MasterProductService.searchAll(createCriteria());
            _context12.prev = 1;
            masterProductInfos = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return masterProductInfos = masterProductInfos.push(info);
            });

            _context12.next = 6;
            return result.promise;

          case 6:
            expect(masterProductInfos.count()).toBe(0);

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

  test('should return the master products matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var tagId1, tagId2, expectedMasterProductInfo, masterProductId1, masterProductId2, result, masterProductInfos;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId1 = _context13.sent;
            _context13.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId2 = _context13.sent;
            expectedMasterProductInfo = (0, _MasterProduct.createMasterProductInfo)(_immutable.List.of(tagId1, tagId2));
            _context13.next = 9;
            return _2.MasterProductService.create(expectedMasterProductInfo);

          case 9:
            masterProductId1 = _context13.sent;
            _context13.next = 12;
            return _2.MasterProductService.create(expectedMasterProductInfo);

          case 12:
            masterProductId2 = _context13.sent;
            result = _2.MasterProductService.searchAll(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));
            _context13.prev = 14;
            masterProductInfos = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return masterProductInfos = masterProductInfos.push(info);
            });

            _context13.next = 19;
            return result.promise;

          case 19:
            expect(masterProductInfos.count()).toBe(2);
            expect(masterProductInfos.find(function (_) {
              return _.get('id').localeCompare(masterProductId1) === 0;
            })).toBeTruthy();
            expect(masterProductInfos.find(function (_) {
              return _.get('id').localeCompare(masterProductId2) === 0;
            })).toBeTruthy();

          case 22:
            _context13.prev = 22;

            result.event.unsubscribeAll();
            return _context13.finish(22);

          case 25:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[14,, 22, 25]]);
  })));
});

describe('exists', function () {
  test('should return false if no master product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _2.MasterProductService.exists(createCriteria());

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

  test('should return true if any master product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var masterProductInfo, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            masterProductInfo = (0, _MasterProduct.createMasterProductInfo)();
            _context15.next = 3;
            return _2.MasterProductService.create(masterProductInfo);

          case 3:
            _context15.next = 5;
            return _2.MasterProductService.exists(createCriteriaUsingProvidedMasterProductInfo(masterProductInfo));

          case 5:
            response = _context15.sent;


            expect(response).toBeTruthy();

          case 7:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no master product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _2.MasterProductService.count(createCriteria());

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

  test('should return the count of master product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var crawlSessionInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            crawlSessionInfo = (0, _MasterProduct.createMasterProductInfo)();
            _context17.next = 3;
            return _2.MasterProductService.create(crawlSessionInfo);

          case 3:
            _context17.next = 5;
            return _2.MasterProductService.create(crawlSessionInfo);

          case 5:
            _context17.next = 7;
            return _2.MasterProductService.count(createCriteriaUsingProvidedMasterProductInfo(crawlSessionInfo));

          case 7:
            response = _context17.sent;


            expect(response).toBe(2);

          case 9:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});