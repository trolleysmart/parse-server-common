'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _Store = require('../../schema/__tests__/Store.test');

var _Tag = require('../../schema/__tests__/Tag.test');

var _StoreTag = require('../../schema/__tests__/StoreTag.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId) {
  expect(storeTagInfo.get('id')).toBe(storeTagId);
  expect(storeTagInfo.get('key')).toBe(expectedStoreTagInfo.get('key'));
  expect(storeTagInfo.get('name')).toBe(expectedStoreTagInfo.get('name'));
  expect(storeTagInfo.get('weight')).toBe(expectedStoreTagInfo.get('weight'));
  expect(storeTagInfo.get('url')).toBe(expectedStoreTagInfo.get('url'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'name', 'weight', 'url', 'store', 'tag'),
    conditions: (0, _immutable.Map)({
      key: (0, _v2.default)(),
      name: (0, _v2.default)(),
      weight: 1,
      url: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedStoreTagInfo(storeTagInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'name', 'weight', 'url', 'store', 'tag'),
    conditions: (0, _immutable.Map)({
      key: storeTagInfo.get('key'),
      name: storeTagInfo.get('name'),
      weigth: storeTagInfo.get('weight'),
      url: storeTagInfo.get('url'),
      storeId: storeTagInfo.get('storeId'),
      tagId: storeTagInfo.get('tagId')
    })
  });
}

describe('create', function () {
  test('should return the created store tag Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var storeId, tagId, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context.sent;
            _context.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context.sent;
            _context.next = 8;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)(storeId, tagId));

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

  test('should create the tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var storeId, tagId, expectedStoreTagInfo, storeTagId, storeTagInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context2.sent;
            _context2.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context2.sent;
            expectedStoreTagInfo = (0, _StoreTag.createStoreTagInfo)(tagId, storeId);
            _context2.next = 9;
            return _2.StoreTagService.create(expectedStoreTagInfo);

          case 9:
            storeTagId = _context2.sent;
            _context2.next = 12;
            return _2.StoreTagService.read(storeTagId);

          case 12:
            storeTagInfo = _context2.sent;


            expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided store tag Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var storeTagId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            storeTagId = (0, _v2.default)();
            _context3.prev = 1;
            _context3.next = 4;
            return _2.StoreTagService.read(storeTagId);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);

            expect(_context3.t0.getErrorMessage()).toBe('No store tag found with Id: ' + storeTagId);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));

  test('should read the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var storeId, tagId, expectedStoreTagInfo, storeTagId, storeTagInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context4.sent;
            _context4.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context4.sent;
            expectedStoreTagInfo = (0, _StoreTag.createStoreTagInfo)(tagId, storeId);
            _context4.next = 9;
            return _2.StoreTagService.create(expectedStoreTagInfo);

          case 9:
            storeTagId = _context4.sent;
            _context4.next = 12;
            return _2.StoreTagService.read(storeTagId);

          case 12:
            storeTagInfo = _context4.sent;


            expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId);

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided store tag Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var storeTagId, storeId, tagId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            storeTagId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 4:
            storeId = _context5.sent;
            _context5.next = 7;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 7:
            tagId = _context5.sent;
            _context5.next = 10;
            return _2.StoreTagService.update((0, _StoreTag.createStoreTagInfo)(storeId, tagId).set('id', storeTagId));

          case 10:
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No store tag found with Id: ' + storeTagId);

          case 15:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 12]]);
  })));

  test('should return the Id of the updated tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var storeId, tagId, storeTagId, id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context6.sent;
            _context6.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context6.sent;
            _context6.next = 8;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)(storeId, tagId));

          case 8:
            storeTagId = _context6.sent;
            _context6.next = 11;
            return _2.StoreTagService.update((0, _StoreTag.createStoreTagInfo)().set('id', storeTagId));

          case 11:
            id = _context6.sent;


            expect(id).toBe(storeTagId);

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('should update the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var storeId, tagId, expectedStoreTagInfo, id, storeTagId, storeTagInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context7.sent;
            _context7.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context7.sent;
            expectedStoreTagInfo = (0, _StoreTag.createStoreTagInfo)(storeId, tagId);
            _context7.next = 9;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)());

          case 9:
            id = _context7.sent;
            _context7.next = 12;
            return _2.StoreTagService.update(expectedStoreTagInfo.set('id', id));

          case 12:
            storeTagId = _context7.sent;
            _context7.next = 15;
            return _2.StoreTagService.read(storeTagId);

          case 15:
            storeTagInfo = _context7.sent;


            expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId);

          case 17:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided store tag Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var storeTagId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            storeTagId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.next = 4;
            return _2.StoreTagService.delete(storeTagId);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8['catch'](1);

            expect(_context8.t0.getErrorMessage()).toBe('No store tag found with Id: ' + storeTagId);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 6]]);
  })));

  test('should delete the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var storeId, tagId, storeTagId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context9.sent;
            _context9.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context9.sent;
            _context9.next = 8;
            return _2.StoreTagService.create((0, _StoreTag.createStoreTagInfo)(tagId, storeId));

          case 8:
            storeTagId = _context9.sent;
            _context9.next = 11;
            return _2.StoreTagService.delete(storeTagId);

          case 11:
            _context9.prev = 11;
            _context9.next = 14;
            return _2.StoreTagService.read(storeTagId);

          case 14:
            _context9.next = 19;
            break;

          case 16:
            _context9.prev = 16;
            _context9.t0 = _context9['catch'](11);

            expect(_context9.t0.getErrorMessage()).toBe('No store tag found with Id: ' + storeTagId);

          case 19:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[11, 16]]);
  })));
});

describe('search', function () {
  test('should return no store tag if provided criteria matches no tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var storeTagInfos;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _2.StoreTagService.search(createCriteria());

          case 2:
            storeTagInfos = _context10.sent;


            expect(storeTagInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  test('should return the store tags matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var storeId, tagId, expectedStoreTagInfo, storeTagId, storeTagInfos, storeTagInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context11.sent;
            _context11.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context11.sent;
            expectedStoreTagInfo = (0, _StoreTag.createStoreTagInfo)(tagId, storeId);
            _context11.next = 9;
            return _2.StoreTagService.create(expectedStoreTagInfo);

          case 9:
            storeTagId = _context11.sent;
            _context11.next = 12;
            return _2.StoreTagService.search(createCriteriaUsingProvidedStoreTagInfo(expectedStoreTagInfo));

          case 12:
            storeTagInfos = _context11.sent;


            expect(storeTagInfos.count()).toBe(1);

            storeTagInfo = storeTagInfos.first();

            expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId);

          case 16:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no store tag if provided criteria matches no tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var result, storeTags;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            result = _2.StoreTagService.searchAll(createCriteria());
            _context12.prev = 1;
            storeTags = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              storeTags = storeTags.push(info);
            });

            _context12.next = 6;
            return result.promise;

          case 6:
            expect(storeTags.count()).toBe(0);

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

  test('should return the store tags matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var storeId, tagId, expectedStoreTagInfo, storeTagId1, storeTagId2, result, storeTags;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context13.sent;
            _context13.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context13.sent;
            expectedStoreTagInfo = (0, _StoreTag.createStoreTagInfo)(tagId, storeId);
            _context13.next = 9;
            return _2.StoreTagService.create(expectedStoreTagInfo);

          case 9:
            storeTagId1 = _context13.sent;
            _context13.next = 12;
            return _2.StoreTagService.create(expectedStoreTagInfo);

          case 12:
            storeTagId2 = _context13.sent;
            result = _2.StoreTagService.searchAll(createCriteriaUsingProvidedStoreTagInfo(expectedStoreTagInfo));
            _context13.prev = 14;
            storeTags = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              storeTags = storeTags.push(info);
            });

            _context13.next = 19;
            return result.promise;

          case 19:
            expect(storeTags.count()).toBe(2);
            expect(storeTags.find(function (_) {
              return _.get('id').localeCompare(storeTagId1) === 0;
            })).toBeTruthy();
            expect(storeTags.find(function (_) {
              return _.get('id').localeCompare(storeTagId2) === 0;
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
  test('should return false if no store tag match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _2.StoreTagService.exists(createCriteria());

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

  test('should return true if any store tag match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var storeId, tagId, storeTagInfo, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context15.sent;
            _context15.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context15.sent;
            storeTagInfo = (0, _StoreTag.createStoreTagInfo)(storeId, tagId);
            _context15.next = 9;
            return _2.StoreTagService.create(storeTagInfo);

          case 9:
            response = _2.StoreTagService.exists(createCriteriaUsingProvidedStoreTagInfo(storeTagInfo));


            expect(response).toBeTruthy();

          case 11:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no store tag match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _2.StoreTagService.count(createCriteria());

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

  test('should return the count of store tag match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var storeId, tagId, storeTagInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context17.sent;
            _context17.next = 5;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 5:
            tagId = _context17.sent;
            storeTagInfo = (0, _StoreTag.createStoreTagInfo)(storeId, tagId);
            _context17.next = 9;
            return _2.StoreTagService.create(storeTagInfo);

          case 9:
            _context17.next = 11;
            return _2.StoreTagService.create(storeTagInfo);

          case 11:
            _context17.next = 13;
            return _2.StoreTagService.count(createCriteriaUsingProvidedStoreTagInfo(storeTagInfo));

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