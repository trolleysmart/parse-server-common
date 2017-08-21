'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStores = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _Store = require('../../schema/__tests__/Store.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createStores = exports.createStores = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(count) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _immutable2.default;
            _context2.next = 3;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.t0 = _2.StoreService;
                      _context.next = 3;
                      return _2.StoreService.create((0, _Store.createStoreInfo)());

                    case 3:
                      _context.t1 = _context.sent;
                      return _context.abrupt('return', _context.t0.read.call(_context.t0, _context.t1));

                    case 5:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }))).toArray());

          case 3:
            _context2.t1 = _context2.sent;
            return _context2.abrupt('return', _context2.t0.fromJS.call(_context2.t0, _context2.t1));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createStores(_x) {
    return _ref.apply(this, arguments);
  };
}();

function expectStoreInfo(storeInfo, expectedStoreInfo, storeId) {
  expect(storeInfo.get('id')).toBe(storeId);
  expect(storeInfo.get('name')).toBe(expectedStoreInfo.get('name'));
  expect(storeInfo.get('imageUrl')).toBe(expectedStoreInfo.get('imageUrl'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'name', 'imageUrl'),
    conditions: (0, _immutable.Map)({
      key: (0, _v2.default)(),
      name: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedStoreInfo(storeInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'name', 'imageUrl'),
    conditions: (0, _immutable.Map)({
      key: storeInfo.get('key'),
      name: storeInfo.get('name')
    })
  });
}

describe('create', function () {
  test('should return the created store Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            result = _context3.sent;


            expect(result).toBeDefined();

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('should create the store', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var expectedStoreInfo, storeId, storeInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            expectedStoreInfo = (0, _Store.createStoreInfo)();
            _context4.next = 3;
            return _2.StoreService.create(expectedStoreInfo);

          case 3:
            storeId = _context4.sent;
            _context4.next = 6;
            return _2.StoreService.read(storeId);

          case 6:
            storeInfo = _context4.sent;


            expectStoreInfo(storeInfo, expectedStoreInfo, storeId);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided store Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var storeId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            storeId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.StoreService.read(storeId);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No store found with Id: ' + storeId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should read the existing store', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var expectedStoreInfo, storeId, storeInfo;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            expectedStoreInfo = (0, _Store.createStoreInfo)();
            _context6.next = 3;
            return _2.StoreService.create(expectedStoreInfo);

          case 3:
            storeId = _context6.sent;
            _context6.next = 6;
            return _2.StoreService.read(storeId);

          case 6:
            storeInfo = _context6.sent;


            expectStoreInfo(storeInfo, expectedStoreInfo, storeId);

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided store Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var storeId;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            storeId = (0, _v2.default)();
            _context7.prev = 1;
            _context7.next = 4;
            return _2.StoreService.update((0, _Store.createStoreInfo)().set('id', storeId));

          case 4:
            _context7.next = 9;
            break;

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7['catch'](1);

            expect(_context7.t0.getErrorMessage()).toBe('No store found with Id: ' + storeId);

          case 9:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 6]]);
  })));

  test('should return the Id of the updated store', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var storeId, id;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context8.sent;
            _context8.next = 5;
            return _2.StoreService.update((0, _Store.createStoreInfo)().set('id', storeId));

          case 5:
            id = _context8.sent;


            expect(id).toBe(storeId);

          case 7:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  test('should update the existing store', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var expectedStoreInfo, id, storeId, storeInfo;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            expectedStoreInfo = (0, _Store.createStoreInfo)();
            _context9.next = 3;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 3:
            id = _context9.sent;
            _context9.next = 6;
            return _2.StoreService.update(expectedStoreInfo.set('id', id));

          case 6:
            storeId = _context9.sent;
            _context9.next = 9;
            return _2.StoreService.read(storeId);

          case 9:
            storeInfo = _context9.sent;


            expectStoreInfo(storeInfo, expectedStoreInfo, storeId);

          case 11:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided store Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var storeId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            storeId = (0, _v2.default)();
            _context10.prev = 1;
            _context10.next = 4;
            return _2.StoreService.delete(storeId);

          case 4:
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10['catch'](1);

            expect(_context10.t0.getErrorMessage()).toBe('No store found with Id: ' + storeId);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 6]]);
  })));

  test('should delete the existing store', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var storeId;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _2.StoreService.create((0, _Store.createStoreInfo)());

          case 2:
            storeId = _context11.sent;
            _context11.next = 5;
            return _2.StoreService.delete(storeId);

          case 5:
            _context11.prev = 5;
            _context11.next = 8;
            return _2.StoreService.read(storeId);

          case 8:
            _context11.next = 13;
            break;

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11['catch'](5);

            expect(_context11.t0.getErrorMessage()).toBe('No store found with Id: ' + storeId);

          case 13:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[5, 10]]);
  })));
});

describe('search', function () {
  test('should return no store if provided criteria matches no store', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var storeInfos;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _2.StoreService.search(createCriteria());

          case 2:
            storeInfos = _context12.sent;


            expect(storeInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  test('should return the stores matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var expectedStoreInfo, storeId, storeInfos, storeInfo;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            expectedStoreInfo = (0, _Store.createStoreInfo)();
            _context13.next = 3;
            return _2.StoreService.create(expectedStoreInfo);

          case 3:
            storeId = _context13.sent;
            _context13.next = 6;
            return _2.StoreService.search(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));

          case 6:
            storeInfos = _context13.sent;


            expect(storeInfos.count()).toBe(1);

            storeInfo = storeInfos.first();

            expectStoreInfo(storeInfo, expectedStoreInfo, storeId);

          case 10:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no store if provided criteria matches no store', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var result, stores;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            result = _2.StoreService.searchAll(createCriteria());
            _context14.prev = 1;
            stores = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              stores = stores.push(info);
            });

            _context14.next = 6;
            return result.promise;

          case 6:
            expect(stores.count()).toBe(0);

          case 7:
            _context14.prev = 7;

            result.event.unsubscribeAll();
            return _context14.finish(7);

          case 10:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined, [[1,, 7, 10]]);
  })));

  test('should return the stores matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var expectedStoreInfo, storeId1, storeId2, result, stores;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            expectedStoreInfo = (0, _Store.createStoreInfo)();
            _context15.next = 3;
            return _2.StoreService.create(expectedStoreInfo);

          case 3:
            storeId1 = _context15.sent;
            _context15.next = 6;
            return _2.StoreService.create(expectedStoreInfo);

          case 6:
            storeId2 = _context15.sent;
            result = _2.StoreService.searchAll(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));
            _context15.prev = 8;
            stores = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              stores = stores.push(info);
            });

            _context15.next = 13;
            return result.promise;

          case 13:
            expect(stores.count()).toBe(2);
            expect(stores.find(function (_) {
              return _.get('id').localeCompare(storeId1) === 0;
            })).toBeTruthy();
            expect(stores.find(function (_) {
              return _.get('id').localeCompare(storeId2) === 0;
            })).toBeTruthy();

          case 16:
            _context15.prev = 16;

            result.event.unsubscribeAll();
            return _context15.finish(16);

          case 19:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[8,, 16, 19]]);
  })));
});

describe('exists', function () {
  test('should return false if no store match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _2.StoreService.exists(createCriteria());

          case 2:
            response = _context16.sent;


            expect(response).toBeFalsy();

          case 4:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  })));

  test('should return true if any store match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var storeInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            storeInfo = (0, _Store.createStoreInfo)();
            _context17.next = 3;
            return _2.StoreService.create(storeInfo);

          case 3:
            response = _2.StoreService.exists(createCriteriaUsingProvidedStoreInfo(storeInfo));


            expect(response).toBeTruthy();

          case 5:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no store match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
    var response;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return _2.StoreService.count(createCriteria());

          case 2:
            response = _context18.sent;


            expect(response).toBe(0);

          case 4:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  })));

  test('should return the count of store match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
    var storeInfo, response;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            storeInfo = (0, _Store.createStoreInfo)();
            _context19.next = 3;
            return _2.StoreService.create(storeInfo);

          case 3:
            _context19.next = 5;
            return _2.StoreService.create(storeInfo);

          case 5:
            _context19.next = 7;
            return _2.StoreService.count(createCriteriaUsingProvidedStoreInfo(storeInfo));

          case 7:
            response = _context19.sent;


            expect(response).toBe(2);

          case 9:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  })));
});