'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _StapleItem = require('../../schema/__tests__/StapleItem.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();
var stapleItemService = new _2.StapleItemService();

var createCriteriaWthoutConditions = function createCriteriaWthoutConditions() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'description', 'imageUrl', 'popular', 'user', 'stapleTemplateItem', 'tags'),
    include_user: true,
    include_stapleTemplateItem: true,
    include_tags: true
  });
};

var createCriteria = function createCriteria(stapleItem) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      name: stapleItem ? stapleItem.get('name') : (0, _v2.default)(),
      description: stapleItem ? stapleItem.get('description') : (0, _v2.default)(),
      imageUrl: stapleItem ? stapleItem.get('imageUrl') : (0, _v2.default)(),
      popular: stapleItem ? stapleItem.get('popular') : chance.integer({ min: 0, max: 1000 }) % 2 === 0,
      userId: stapleItem ? stapleItem.get('userId') : (0, _v2.default)(),
      stapleTemplateItemId: stapleItem ? stapleItem.get('stapleTemplateItemId') : (0, _v2.default)(),
      tagIds: stapleItem ? stapleItem.get('tagIds') : _immutable.List.of((0, _v2.default)(), (0, _v2.default)())
    })
  }).merge(createCriteriaWthoutConditions());
};

var createStapleItems = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(count) {
    var useSameInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var stapleItem, _ref2, tempStapleItem;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            stapleItem = void 0;

            if (!useSameInfo) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return (0, _StapleItem.createStapleItemInfo)();

          case 4:
            _ref2 = _context2.sent;
            tempStapleItem = _ref2.stapleItem;


            stapleItem = tempStapleItem;

          case 7:
            _context2.t0 = _immutable2.default;
            _context2.next = 10;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var finalStapleItem, _ref4, _tempStapleItem;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      finalStapleItem = void 0;

                      if (!useSameInfo) {
                        _context.next = 5;
                        break;
                      }

                      finalStapleItem = stapleItem;
                      _context.next = 10;
                      break;

                    case 5:
                      _context.next = 7;
                      return (0, _StapleItem.createStapleItemInfo)();

                    case 7:
                      _ref4 = _context.sent;
                      _tempStapleItem = _ref4.stapleItem;


                      finalStapleItem = _tempStapleItem;

                    case 10:
                      _context.t0 = stapleItemService;
                      _context.next = 13;
                      return stapleItemService.create(finalStapleItem);

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

          case 10:
            _context2.t1 = _context2.sent;
            return _context2.abrupt('return', _context2.t0.fromJS.call(_context2.t0, _context2.t1));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createStapleItems(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = createStapleItems;


describe('create', function () {
  test('should return the created staple item Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var stapleItemId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = stapleItemService;
            _context3.next = 3;
            return (0, _StapleItem.createStapleItemInfo)();

          case 3:
            _context3.t1 = _context3.sent.stapleItem;
            _context3.next = 6;
            return _context3.t0.create.call(_context3.t0, _context3.t1);

          case 6:
            stapleItemId = _context3.sent;


            expect(stapleItemId).toBeDefined();

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('should create the staple item', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var _ref7, stapleItem, stapleItemId, fetchedStapleItem;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _StapleItem.createStapleItemInfo)();

          case 2:
            _ref7 = _context4.sent;
            stapleItem = _ref7.stapleItem;
            _context4.next = 6;
            return stapleItemService.create(stapleItem);

          case 6:
            stapleItemId = _context4.sent;
            _context4.next = 9;
            return stapleItemService.read(stapleItemId, createCriteriaWthoutConditions());

          case 9:
            fetchedStapleItem = _context4.sent;


            expect(fetchedStapleItem).toBeDefined();

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided staple item Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var stapleItemId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            stapleItemId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return stapleItemService.read(stapleItemId);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.message).toBe('No staple item found with Id: ' + stapleItemId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should read the existing staple item', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var _ref10, expectedStapleItem, expectedUser, expectedTags, stapleItemId, stapleItem;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _StapleItem.createStapleItemInfo)();

          case 2:
            _ref10 = _context6.sent;
            expectedStapleItem = _ref10.stapleItem;
            expectedUser = _ref10.stapleUser;
            expectedTags = _ref10.tags;
            _context6.next = 8;
            return stapleItemService.create(expectedStapleItem);

          case 8:
            stapleItemId = _context6.sent;
            _context6.next = 11;
            return stapleItemService.read(stapleItemId, createCriteriaWthoutConditions());

          case 11:
            stapleItem = _context6.sent;


            (0, _StapleItem.expectStapleItem)(stapleItem, expectedStapleItem, {
              stapleItemId: stapleItemId,
              expectedUser: expectedUser,
              expectedTags: expectedTags
            });

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided staple item Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var stapleItemId, stapleItem;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            stapleItemId = (0, _v2.default)();
            _context7.prev = 1;
            _context7.t0 = stapleItemService;
            _context7.t1 = stapleItemService;
            _context7.next = 6;
            return (0, _StapleItem.createStapleItemInfo)();

          case 6:
            _context7.t2 = _context7.sent.stapleItem;
            _context7.next = 9;
            return _context7.t1.create.call(_context7.t1, _context7.t2);

          case 9:
            _context7.t3 = _context7.sent;
            _context7.t4 = createCriteriaWthoutConditions();
            _context7.next = 13;
            return _context7.t0.read.call(_context7.t0, _context7.t3, _context7.t4);

          case 13:
            stapleItem = _context7.sent;
            _context7.next = 16;
            return stapleItemService.update(stapleItem.set('id', stapleItemId));

          case 16:
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t5 = _context7['catch'](1);

            expect(_context7.t5.message).toBe('No staple item found with Id: ' + stapleItemId);

          case 21:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 18]]);
  })));

  test('should return the Id of the updated staple item', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref13, expectedStapleItem, stapleItemId, id;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _StapleItem.createStapleItemInfo)();

          case 2:
            _ref13 = _context8.sent;
            expectedStapleItem = _ref13.stapleItem;
            _context8.t0 = stapleItemService;
            _context8.next = 7;
            return (0, _StapleItem.createStapleItemInfo)();

          case 7:
            _context8.t1 = _context8.sent.stapleItem;
            _context8.next = 10;
            return _context8.t0.create.call(_context8.t0, _context8.t1);

          case 10:
            stapleItemId = _context8.sent;
            _context8.next = 13;
            return stapleItemService.update(expectedStapleItem.set('id', stapleItemId));

          case 13:
            id = _context8.sent;


            expect(id).toBe(stapleItemId);

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  test('should update the existing staple item', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var _ref15, expectedStapleItem, expectedUser, expectedTags, stapleItemId, stapleItem;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _StapleItem.createStapleItemInfo)();

          case 2:
            _ref15 = _context9.sent;
            expectedStapleItem = _ref15.stapleItem;
            expectedUser = _ref15.stapleUser;
            expectedTags = _ref15.tags;
            _context9.t0 = stapleItemService;
            _context9.next = 9;
            return (0, _StapleItem.createStapleItemInfo)();

          case 9:
            _context9.t1 = _context9.sent.stapleItem;
            _context9.next = 12;
            return _context9.t0.create.call(_context9.t0, _context9.t1);

          case 12:
            stapleItemId = _context9.sent;
            _context9.next = 15;
            return stapleItemService.update(expectedStapleItem.set('id', stapleItemId));

          case 15:
            _context9.next = 17;
            return stapleItemService.read(stapleItemId, createCriteriaWthoutConditions());

          case 17:
            stapleItem = _context9.sent;


            (0, _StapleItem.expectStapleItem)(stapleItem, expectedStapleItem, {
              stapleItemId: stapleItemId,
              expectedUser: expectedUser,
              expectedTags: expectedTags
            });

          case 19:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided staple item Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var stapleItemId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            stapleItemId = (0, _v2.default)();
            _context10.prev = 1;
            _context10.next = 4;
            return stapleItemService.delete(stapleItemId);

          case 4:
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10['catch'](1);

            expect(_context10.t0.message).toBe('No staple item found with Id: ' + stapleItemId);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 6]]);
  })));

  test('should delete the existing staple item', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var stapleItemId;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.t0 = stapleItemService;
            _context11.next = 3;
            return (0, _StapleItem.createStapleItemInfo)();

          case 3:
            _context11.t1 = _context11.sent.stapleItem;
            _context11.next = 6;
            return _context11.t0.create.call(_context11.t0, _context11.t1);

          case 6:
            stapleItemId = _context11.sent;
            _context11.next = 9;
            return stapleItemService.delete(stapleItemId);

          case 9:
            _context11.prev = 9;
            _context11.next = 12;
            return stapleItemService.delete(stapleItemId);

          case 12:
            _context11.next = 17;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t2 = _context11['catch'](9);

            expect(_context11.t2.message).toBe('No staple item found with Id: ' + stapleItemId);

          case 17:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[9, 14]]);
  })));
});

describe('search', function () {
  test('should return no staple item if provided criteria matches no staple item', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var stapleItems;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return stapleItemService.search(createCriteria());

          case 2:
            stapleItems = _context12.sent;


            expect(stapleItems.count()).toBe(0);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  test('should return the staple item matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var _ref20, expectedStapleItem, expectedUser, expectedTags, results, stapleItems;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _StapleItem.createStapleItemInfo)();

          case 2:
            _ref20 = _context14.sent;
            expectedStapleItem = _ref20.stapleItem;
            expectedUser = _ref20.stapleUser;
            expectedTags = _ref20.tags;
            _context14.t0 = _immutable2.default;
            _context14.next = 9;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      return _context13.abrupt('return', stapleItemService.create(expectedStapleItem));

                    case 1:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, undefined);
            }))).toArray());

          case 9:
            _context14.t1 = _context14.sent;
            results = _context14.t0.fromJS.call(_context14.t0, _context14.t1);
            _context14.next = 13;
            return stapleItemService.search(createCriteria(expectedStapleItem));

          case 13:
            stapleItems = _context14.sent;


            expect(stapleItems.count).toBe(results.count);
            stapleItems.forEach(function (stapleItem) {
              expect(results.find(function (_) {
                return _.localeCompare(stapleItem.get('id')) === 0;
              })).toBeDefined();
              (0, _StapleItem.expectStapleItem)(stapleItem, expectedStapleItem, {
                stapleItemId: stapleItem.get('id'),
                expectedUser: expectedUser,
                expectedTags: expectedTags
              });
            });

          case 16:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no staple item if provided criteria matches no staple item', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var stapleItems, result;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            stapleItems = (0, _immutable.List)();
            result = stapleItemService.searchAll(createCriteria());
            _context15.prev = 2;

            result.event.subscribe(function (info) {
              stapleItems = stapleItems.push(info);
            });

            _context15.next = 6;
            return result.promise;

          case 6:
            _context15.prev = 6;

            result.event.unsubscribeAll();
            return _context15.finish(6);

          case 9:

            expect(stapleItems.count()).toBe(0);

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[2,, 6, 9]]);
  })));

  test('should return the staple item matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var _ref24, expectedStapleItem, expectedUser, expectedTags, results, stapleItems, result;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _StapleItem.createStapleItemInfo)();

          case 2:
            _ref24 = _context17.sent;
            expectedStapleItem = _ref24.stapleItem;
            expectedUser = _ref24.stapleUser;
            expectedTags = _ref24.tags;
            _context17.t0 = _immutable2.default;
            _context17.next = 9;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      return _context16.abrupt('return', stapleItemService.create(expectedStapleItem));

                    case 1:
                    case 'end':
                      return _context16.stop();
                  }
                }
              }, _callee16, undefined);
            }))).toArray());

          case 9:
            _context17.t1 = _context17.sent;
            results = _context17.t0.fromJS.call(_context17.t0, _context17.t1);
            stapleItems = (0, _immutable.List)();
            result = stapleItemService.searchAll(createCriteria(expectedStapleItem));
            _context17.prev = 13;

            result.event.subscribe(function (info) {
              stapleItems = stapleItems.push(info);
            });

            _context17.next = 17;
            return result.promise;

          case 17:
            _context17.prev = 17;

            result.event.unsubscribeAll();
            return _context17.finish(17);

          case 20:

            expect(stapleItems.count).toBe(results.count);
            stapleItems.forEach(function (stapleItem) {
              expect(results.find(function (_) {
                return _.localeCompare(stapleItem.get('id')) === 0;
              })).toBeDefined();
              (0, _StapleItem.expectStapleItem)(stapleItem, expectedStapleItem, {
                stapleItemId: stapleItem.get('id'),
                expectedUser: expectedUser,
                expectedTags: expectedTags
              });
            });

          case 22:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[13,, 17, 20]]);
  })));
});

describe('exists', function () {
  test('should return false if no staple item match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.t0 = expect;
            _context18.next = 3;
            return stapleItemService.exists(createCriteria());

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

  test('should return true if any staple item match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
    var stapleItems;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return createStapleItems(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            stapleItems = _context19.sent;
            _context19.t0 = expect;
            _context19.next = 6;
            return stapleItemService.exists(createCriteria(stapleItems.first()));

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
  test('should return 0 if no staple item match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.t0 = expect;
            _context20.next = 3;
            return stapleItemService.count(createCriteria());

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

  test('should return the count of staple item match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee21() {
    var stapleItems;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return createStapleItems(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            stapleItems = _context21.sent;
            _context21.t0 = expect;
            _context21.next = 6;
            return stapleItemService.count(createCriteria(stapleItems.first()));

          case 6:
            _context21.t1 = _context21.sent;
            _context21.t2 = stapleItems.count();
            (0, _context21.t0)(_context21.t1).toBe(_context21.t2);

          case 9:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  })));
});