'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _Store = require('../../schema/__tests__/Store.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();
var storeService = new _2.StoreService();

var createCriteriaWthoutConditions = function createCriteriaWthoutConditions() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'name', 'imageUrl', 'address', 'phones', 'geoLocation', 'openFrom', 'openUntil', 'forDisplay', 'parentStore', 'ownedByUser', 'maintainedByUsers', 'status', 'googleMapUrl'),
    include_parentStore: true,
    include_ownedByUser: true,
    include_maintainedByUsers: true
  });
};

var createCriteria = function createCriteria(store) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      key: store ? store.get('key') : (0, _v2.default)(),
      name: store ? store.get('name') : (0, _v2.default)(),
      imageUrl: store ? store.get('imageUrl') : (0, _v2.default)(),
      address: store ? store.get('address') : (0, _v2.default)(),
      phones: store ? store.get('phones') : (0, _immutable.Map)({ business: chance.integer({ min: 1000000, max: 999999999 }).toString() }),
      near_geoLocation: store ? store.get('geoLocation') : _parseServerCommon.ParseWrapperService.createGeoPoint({
        latitude: chance.floating({ min: 1, max: 20 }),
        longitude: chance.floating({ min: -30, max: -1 })
      }),
      openFrom: store ? store.get('openFrom') : new Date(),
      openUntil: store ? store.get('openUntil') : new Date(),
      forDisplay: store ? store.get('forDisplay') : chance.integer({ min: 1, max: 1000 }) % 2 === 0,
      parentStoreId: store && store.get('parentStoreId') ? store.get('parentStoreId') : undefined,
      ownedByUserId: store ? store.get('ownedByUserId') : (0, _v2.default)(),
      maintainedByUserIds: store ? store.get('maintainedByUserIds') : _immutable.List.of((0, _v2.default)(), (0, _v2.default)()),
      status: store ? store.get('status') : (0, _v2.default)(),
      googleMapUrl: store ? store.get('googleMapUrl') : (0, _v2.default)()
    })
  }).merge(createCriteriaWthoutConditions());
};

var createStores = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(count) {
    var useSameInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var createParentStore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var parentStore, store, _ref2, tempStore;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!createParentStore) {
              _context2.next = 6;
              break;
            }

            _context2.next = 3;
            return createStores(1, false, false);

          case 3:
            _context2.t0 = _context2.sent;
            _context2.next = 7;
            break;

          case 6:
            _context2.t0 = undefined;

          case 7:
            parentStore = _context2.t0;
            store = void 0;

            if (!useSameInfo) {
              _context2.next = 15;
              break;
            }

            _context2.next = 12;
            return (0, _Store.createStoreInfo)();

          case 12:
            _ref2 = _context2.sent;
            tempStore = _ref2.store;


            store = tempStore;

          case 15:
            _context2.t1 = _immutable2.default;
            _context2.next = 18;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var finalStore, _ref4, _tempStore;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      finalStore = void 0;

                      if (!useSameInfo) {
                        _context.next = 5;
                        break;
                      }

                      finalStore = store;
                      _context.next = 10;
                      break;

                    case 5:
                      _context.next = 7;
                      return (0, _Store.createStoreInfo)();

                    case 7:
                      _ref4 = _context.sent;
                      _tempStore = _ref4.store;


                      finalStore = _tempStore;

                    case 10:
                      _context.t0 = storeService;
                      _context.next = 13;
                      return storeService.create(createParentStore ? finalStore.merge((0, _immutable.Map)({ parentStoreId: parentStore.get('id') })) : finalStore);

                    case 13:
                      _context.t1 = _context.sent;
                      _context.t2 = createCriteriaWthoutConditions();
                      return _context.abrupt('return', _context.t0.read.call(_context.t0, _context.t1, _context.t2));

                    case 16:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }))).toArray());

          case 18:
            _context2.t2 = _context2.sent;
            return _context2.abrupt('return', _context2.t1.fromJS.call(_context2.t1, _context2.t2));

          case 20:
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

exports.default = createStores;


describe('create', function () {
  test('should return the created store Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var storeId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = storeService;
            _context3.next = 3;
            return (0, _Store.createStoreInfo)();

          case 3:
            _context3.t1 = _context3.sent.store;
            _context3.next = 6;
            return _context3.t0.create.call(_context3.t0, _context3.t1);

          case 6:
            storeId = _context3.sent;


            expect(storeId).toBeDefined();

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('should create the store', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var _ref7, store, storeId, fetchedStore;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _Store.createStoreInfo)();

          case 2:
            _ref7 = _context4.sent;
            store = _ref7.store;
            _context4.next = 6;
            return storeService.create(store);

          case 6:
            storeId = _context4.sent;
            _context4.next = 9;
            return storeService.read(storeId, createCriteriaWthoutConditions());

          case 9:
            fetchedStore = _context4.sent;


            expect(fetchedStore).toBeDefined();

          case 11:
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
            return storeService.read(storeId);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.message).toBe('No store found with Id: ' + storeId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should read the existing store', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var _ref10, parentStore, parentStoreId, _ref11, expectedStore, expectedOwnedByUser, expectedMaintainedByUsers, storeId, store;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _Store.createStoreInfo)();

          case 2:
            _ref10 = _context6.sent;
            parentStore = _ref10.store;
            _context6.next = 6;
            return storeService.create(parentStore);

          case 6:
            parentStoreId = _context6.sent;
            _context6.next = 9;
            return (0, _Store.createStoreInfo)({
              parentStoreId: parentStoreId
            });

          case 9:
            _ref11 = _context6.sent;
            expectedStore = _ref11.store;
            expectedOwnedByUser = _ref11.ownedByUser;
            expectedMaintainedByUsers = _ref11.maintainedByUsers;
            _context6.next = 15;
            return storeService.create(expectedStore);

          case 15:
            storeId = _context6.sent;
            _context6.next = 18;
            return storeService.read(storeId, createCriteriaWthoutConditions());

          case 18:
            store = _context6.sent;


            (0, _Store.expectStore)(store, expectedStore, { expectedOwnedByUser: expectedOwnedByUser, expectedMaintainedByUsers: expectedMaintainedByUsers });

          case 20:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided store Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var storeId, store;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            storeId = (0, _v2.default)();
            _context7.prev = 1;
            _context7.t0 = storeService;
            _context7.t1 = storeService;
            _context7.next = 6;
            return (0, _Store.createStoreInfo)();

          case 6:
            _context7.t2 = _context7.sent.store;
            _context7.next = 9;
            return _context7.t1.create.call(_context7.t1, _context7.t2);

          case 9:
            _context7.t3 = _context7.sent;
            _context7.t4 = createCriteriaWthoutConditions();
            _context7.next = 13;
            return _context7.t0.read.call(_context7.t0, _context7.t3, _context7.t4);

          case 13:
            store = _context7.sent;
            _context7.next = 16;
            return storeService.update(store.set('id', storeId));

          case 16:
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t5 = _context7['catch'](1);

            expect(_context7.t5.message).toBe('No store found with Id: ' + storeId);

          case 21:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 18]]);
  })));

  test('should return the Id of the updated store', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref14, expectedStore, storeId, id;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _Store.createStoreInfo)();

          case 2:
            _ref14 = _context8.sent;
            expectedStore = _ref14.store;
            _context8.t0 = storeService;
            _context8.next = 7;
            return (0, _Store.createStoreInfo)();

          case 7:
            _context8.t1 = _context8.sent.store;
            _context8.next = 10;
            return _context8.t0.create.call(_context8.t0, _context8.t1);

          case 10:
            storeId = _context8.sent;
            _context8.next = 13;
            return storeService.update(expectedStore.set('id', storeId));

          case 13:
            id = _context8.sent;


            expect(id).toBe(storeId);

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  test('should update the existing store', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var _ref16, parentStore, parentStoreId, _ref17, expectedStore, expectedOwnedByUser, expectedMaintainedByUsers, storeId, store;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _Store.createStoreInfo)();

          case 2:
            _ref16 = _context9.sent;
            parentStore = _ref16.store;
            _context9.next = 6;
            return storeService.create(parentStore);

          case 6:
            parentStoreId = _context9.sent;
            _context9.next = 9;
            return (0, _Store.createStoreInfo)({
              parentStoreId: parentStoreId
            });

          case 9:
            _ref17 = _context9.sent;
            expectedStore = _ref17.store;
            expectedOwnedByUser = _ref17.ownedByUser;
            expectedMaintainedByUsers = _ref17.maintainedByUsers;
            _context9.t0 = storeService;
            _context9.next = 16;
            return (0, _Store.createStoreInfo)();

          case 16:
            _context9.t1 = _context9.sent.store;
            _context9.next = 19;
            return _context9.t0.create.call(_context9.t0, _context9.t1);

          case 19:
            storeId = _context9.sent;
            _context9.next = 22;
            return storeService.update(expectedStore.set('id', storeId));

          case 22:
            _context9.next = 24;
            return storeService.read(storeId, createCriteriaWthoutConditions());

          case 24:
            store = _context9.sent;


            (0, _Store.expectStore)(store, expectedStore, { expectedOwnedByUser: expectedOwnedByUser, expectedMaintainedByUsers: expectedMaintainedByUsers });

          case 26:
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
            return storeService.delete(storeId);

          case 4:
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10['catch'](1);

            expect(_context10.t0.message).toBe('No store found with Id: ' + storeId);

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
            _context11.t0 = storeService;
            _context11.next = 3;
            return (0, _Store.createStoreInfo)();

          case 3:
            _context11.t1 = _context11.sent.store;
            _context11.next = 6;
            return _context11.t0.create.call(_context11.t0, _context11.t1);

          case 6:
            storeId = _context11.sent;
            _context11.next = 9;
            return storeService.delete(storeId);

          case 9:
            _context11.prev = 9;
            _context11.next = 12;
            return storeService.delete(storeId);

          case 12:
            _context11.next = 17;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t2 = _context11['catch'](9);

            expect(_context11.t2.message).toBe('No store found with Id: ' + storeId);

          case 17:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[9, 14]]);
  })));
});

describe('search', function () {
  test('should return no store if provided criteria matches no store', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var stores;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return storeService.search(createCriteria());

          case 2:
            stores = _context12.sent;


            expect(stores.count()).toBe(0);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  test('should return the store matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var _ref22, parentStore, parentStoreId, _ref23, expectedStore, expectedOwnedByUser, expectedMaintainedByUsers, results, stores;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _Store.createStoreInfo)();

          case 2:
            _ref22 = _context14.sent;
            parentStore = _ref22.store;
            _context14.next = 6;
            return storeService.create(parentStore);

          case 6:
            parentStoreId = _context14.sent;
            _context14.next = 9;
            return (0, _Store.createStoreInfo)({
              parentStoreId: parentStoreId
            });

          case 9:
            _ref23 = _context14.sent;
            expectedStore = _ref23.store;
            expectedOwnedByUser = _ref23.ownedByUser;
            expectedMaintainedByUsers = _ref23.maintainedByUsers;
            _context14.t0 = _immutable2.default;
            _context14.next = 16;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      return _context13.abrupt('return', storeService.create(expectedStore));

                    case 1:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, undefined);
            }))).toArray());

          case 16:
            _context14.t1 = _context14.sent;
            results = _context14.t0.fromJS.call(_context14.t0, _context14.t1);
            _context14.next = 20;
            return storeService.search(createCriteria(expectedStore));

          case 20:
            stores = _context14.sent;


            expect(stores.count).toBe(results.count);
            stores.forEach(function (store) {
              expect(results.find(function (_) {
                return _.localeCompare(store.get('id')) === 0;
              })).toBeDefined();
              (0, _Store.expectStore)(store, expectedStore, { expectedOwnedByUser: expectedOwnedByUser, expectedMaintainedByUsers: expectedMaintainedByUsers });
            });

          case 23:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no store if provided criteria matches no store', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var stores, result;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            stores = (0, _immutable.List)();
            result = storeService.searchAll(createCriteria());
            _context15.prev = 2;

            result.event.subscribe(function (info) {
              stores = stores.push(info);
            });

            _context15.next = 6;
            return result.promise;

          case 6:
            _context15.prev = 6;

            result.event.unsubscribeAll();
            return _context15.finish(6);

          case 9:

            expect(stores.count()).toBe(0);

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[2,, 6, 9]]);
  })));

  test('should return the store matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var _ref27, parentStore, parentStoreId, _ref28, expectedStore, expectedOwnedByUser, expectedMaintainedByUsers, results, stores, result;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _Store.createStoreInfo)();

          case 2:
            _ref27 = _context17.sent;
            parentStore = _ref27.store;
            _context17.next = 6;
            return storeService.create(parentStore);

          case 6:
            parentStoreId = _context17.sent;
            _context17.next = 9;
            return (0, _Store.createStoreInfo)({
              parentStoreId: parentStoreId
            });

          case 9:
            _ref28 = _context17.sent;
            expectedStore = _ref28.store;
            expectedOwnedByUser = _ref28.ownedByUser;
            expectedMaintainedByUsers = _ref28.maintainedByUsers;
            _context17.t0 = _immutable2.default;
            _context17.next = 16;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      return _context16.abrupt('return', storeService.create(expectedStore));

                    case 1:
                    case 'end':
                      return _context16.stop();
                  }
                }
              }, _callee16, undefined);
            }))).toArray());

          case 16:
            _context17.t1 = _context17.sent;
            results = _context17.t0.fromJS.call(_context17.t0, _context17.t1);
            stores = (0, _immutable.List)();
            result = storeService.searchAll(createCriteria(expectedStore));
            _context17.prev = 20;

            result.event.subscribe(function (info) {
              stores = stores.push(info);
            });

            _context17.next = 24;
            return result.promise;

          case 24:
            _context17.prev = 24;

            result.event.unsubscribeAll();
            return _context17.finish(24);

          case 27:

            expect(stores.count).toBe(results.count);
            stores.forEach(function (store) {
              expect(results.find(function (_) {
                return _.localeCompare(store.get('id')) === 0;
              })).toBeDefined();
              (0, _Store.expectStore)(store, expectedStore, { expectedOwnedByUser: expectedOwnedByUser, expectedMaintainedByUsers: expectedMaintainedByUsers });
            });

          case 29:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[20,, 24, 27]]);
  })));
});

describe('exists', function () {
  test('should return false if no store match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.t0 = expect;
            _context18.next = 3;
            return storeService.exists(createCriteria());

          case 3:
            _context18.t1 = _context18.sent;
            (0, _context18.t0)(_context18.t1).toBeFalsy();

          case 5:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  })));

  test('should return true if any store match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
    var stores;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return createStores(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            stores = _context19.sent;
            _context19.t0 = expect;
            _context19.next = 6;
            return storeService.exists(createCriteria(stores.first()));

          case 6:
            _context19.t1 = _context19.sent;
            (0, _context19.t0)(_context19.t1).toBeTruthy();

          case 8:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no store match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.t0 = expect;
            _context20.next = 3;
            return storeService.count(createCriteria());

          case 3:
            _context20.t1 = _context20.sent;
            (0, _context20.t0)(_context20.t1).toBe(0);

          case 5:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  })));

  test('should return the count of store match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee21() {
    var stores;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return createStores(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            stores = _context21.sent;
            _context21.t0 = expect;
            _context21.next = 6;
            return storeService.count(createCriteria(stores.first()));

          case 6:
            _context21.t1 = _context21.sent;
            _context21.t2 = stores.count();
            (0, _context21.t0)(_context21.t1).toBe(_context21.t2);

          case 9:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  })));
});