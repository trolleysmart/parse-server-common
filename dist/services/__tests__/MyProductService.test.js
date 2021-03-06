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

var _MyProduct = require('../../schema/__tests__/MyProduct.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chance = new _chance2.default();
var myProductService = new _2.MyProductService();

var createCriteriaWthoutConditions = function createCriteriaWthoutConditions() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'tags', 'ownedByUser'),
    include_tags: true,
    include_ownedByUser: true
  });
};

var createCriteria = function createCriteria(myProduct) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      name: myProduct ? myProduct.get('name') : (0, _v2.default)(),
      description: myProduct ? myProduct.get('description') : (0, _v2.default)(),
      barcode: myProduct ? myProduct.get('barcode') : (0, _v2.default)(),
      productPageUrl: myProduct ? myProduct.get('productPageUrl') : (0, _v2.default)(),
      imageUrl: myProduct ? myProduct.get('imageUrl') : (0, _v2.default)(),
      size: myProduct ? myProduct.get('size') : (0, _v2.default)(),
      tagIds: myProduct ? myProduct.get('tagIds') : _immutable.List.of((0, _v2.default)(), (0, _v2.default)()),
      ownedByUserId: myProduct ? myProduct.get('ownedByUserId') : (0, _v2.default)()
    })
  }).merge(createCriteriaWthoutConditions());
};

var createMyProducts = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(count) {
    var useSameInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var myProduct, _ref2, tempMyProduct;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            myProduct = void 0;

            if (!useSameInfo) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return (0, _MyProduct.createMyProductInfo)();

          case 4:
            _ref2 = _context2.sent;
            tempMyProduct = _ref2.myProduct;


            myProduct = tempMyProduct;

          case 7:
            _context2.t0 = _immutable2.default;
            _context2.next = 10;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var finalMyProduct, _ref4, _tempMyProduct;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      finalMyProduct = void 0;

                      if (!useSameInfo) {
                        _context.next = 5;
                        break;
                      }

                      finalMyProduct = myProduct;
                      _context.next = 10;
                      break;

                    case 5:
                      _context.next = 7;
                      return (0, _MyProduct.createMyProductInfo)();

                    case 7:
                      _ref4 = _context.sent;
                      _tempMyProduct = _ref4.myProduct;


                      finalMyProduct = _tempMyProduct;

                    case 10:
                      _context.t0 = myProductService;
                      _context.next = 13;
                      return myProductService.create(finalMyProduct);

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

  return function createMyProducts(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = createMyProducts;


describe('create', function () {
  test('should return the created my product Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var myProductId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = myProductService;
            _context3.next = 3;
            return (0, _MyProduct.createMyProductInfo)();

          case 3:
            _context3.t1 = _context3.sent.myProduct;
            _context3.next = 6;
            return _context3.t0.create.call(_context3.t0, _context3.t1);

          case 6:
            myProductId = _context3.sent;


            expect(myProductId).toBeDefined();

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('should create the my product', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var _ref7, myProduct, myProductId, fetchedMyProduct;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _MyProduct.createMyProductInfo)();

          case 2:
            _ref7 = _context4.sent;
            myProduct = _ref7.myProduct;
            _context4.next = 6;
            return myProductService.create(myProduct);

          case 6:
            myProductId = _context4.sent;
            _context4.next = 9;
            return myProductService.read(myProductId, createCriteriaWthoutConditions());

          case 9:
            fetchedMyProduct = _context4.sent;


            expect(fetchedMyProduct).toBeDefined();

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided my product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var myProductId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            myProductId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return myProductService.read(myProductId);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.message).toBe('No my product found with Id: ' + myProductId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should read the existing my product', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var _ref10, expectedMyProduct, expectedTags, myProductId, myProduct;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _MyProduct.createMyProductInfo)();

          case 2:
            _ref10 = _context6.sent;
            expectedMyProduct = _ref10.myProduct;
            expectedTags = _ref10.tags;
            _context6.next = 7;
            return myProductService.create(expectedMyProduct);

          case 7:
            myProductId = _context6.sent;
            _context6.next = 10;
            return myProductService.read(myProductId, createCriteriaWthoutConditions());

          case 10:
            myProduct = _context6.sent;


            (0, _MyProduct.expectMyProduct)(myProduct, expectedMyProduct, {
              myProductId: myProductId,
              expectedTags: expectedTags
            });

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided my product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var myProductId, myProduct;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            myProductId = (0, _v2.default)();
            _context7.prev = 1;
            _context7.t0 = myProductService;
            _context7.t1 = myProductService;
            _context7.next = 6;
            return (0, _MyProduct.createMyProductInfo)();

          case 6:
            _context7.t2 = _context7.sent.myProduct;
            _context7.next = 9;
            return _context7.t1.create.call(_context7.t1, _context7.t2);

          case 9:
            _context7.t3 = _context7.sent;
            _context7.t4 = createCriteriaWthoutConditions();
            _context7.next = 13;
            return _context7.t0.read.call(_context7.t0, _context7.t3, _context7.t4);

          case 13:
            myProduct = _context7.sent;
            _context7.next = 16;
            return myProductService.update(myProduct.set('id', myProductId));

          case 16:
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t5 = _context7['catch'](1);

            expect(_context7.t5.message).toBe('No my product found with Id: ' + myProductId);

          case 21:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 18]]);
  })));

  test('should return the Id of the updated my product', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref13, expectedMyProduct, myProductId, id;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _MyProduct.createMyProductInfo)();

          case 2:
            _ref13 = _context8.sent;
            expectedMyProduct = _ref13.myProduct;
            _context8.t0 = myProductService;
            _context8.next = 7;
            return (0, _MyProduct.createMyProductInfo)();

          case 7:
            _context8.t1 = _context8.sent.myProduct;
            _context8.next = 10;
            return _context8.t0.create.call(_context8.t0, _context8.t1);

          case 10:
            myProductId = _context8.sent;
            _context8.next = 13;
            return myProductService.update(expectedMyProduct.set('id', myProductId));

          case 13:
            id = _context8.sent;


            expect(id).toBe(myProductId);

          case 15:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  test('should update the existing my product', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var _ref15, expectedMyProduct, expectedTags, myProductId, myProduct;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _MyProduct.createMyProductInfo)();

          case 2:
            _ref15 = _context9.sent;
            expectedMyProduct = _ref15.myProduct;
            expectedTags = _ref15.tags;
            _context9.t0 = myProductService;
            _context9.next = 8;
            return (0, _MyProduct.createMyProductInfo)();

          case 8:
            _context9.t1 = _context9.sent.myProduct;
            _context9.next = 11;
            return _context9.t0.create.call(_context9.t0, _context9.t1);

          case 11:
            myProductId = _context9.sent;
            _context9.next = 14;
            return myProductService.update(expectedMyProduct.set('id', myProductId));

          case 14:
            _context9.next = 16;
            return myProductService.read(myProductId, createCriteriaWthoutConditions());

          case 16:
            myProduct = _context9.sent;


            (0, _MyProduct.expectMyProduct)(myProduct, expectedMyProduct, {
              myProductId: myProductId,
              expectedTags: expectedTags
            });

          case 18:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided my product Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var myProductId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            myProductId = (0, _v2.default)();
            _context10.prev = 1;
            _context10.next = 4;
            return myProductService.delete(myProductId);

          case 4:
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10['catch'](1);

            expect(_context10.t0.message).toBe('No my product found with Id: ' + myProductId);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 6]]);
  })));

  test('should delete the existing my product', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var myProductId;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.t0 = myProductService;
            _context11.next = 3;
            return (0, _MyProduct.createMyProductInfo)();

          case 3:
            _context11.t1 = _context11.sent.myProduct;
            _context11.next = 6;
            return _context11.t0.create.call(_context11.t0, _context11.t1);

          case 6:
            myProductId = _context11.sent;
            _context11.next = 9;
            return myProductService.delete(myProductId);

          case 9:
            _context11.prev = 9;
            _context11.next = 12;
            return myProductService.delete(myProductId);

          case 12:
            _context11.next = 17;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t2 = _context11['catch'](9);

            expect(_context11.t2.message).toBe('No my product found with Id: ' + myProductId);

          case 17:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[9, 14]]);
  })));
});

describe('search', function () {
  test('should return no my product if provided criteria matches no my product', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var myProducts;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return myProductService.search(createCriteria());

          case 2:
            myProducts = _context12.sent;


            expect(myProducts.count()).toBe(0);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  test('should return the my product matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var _ref20, expectedMyProduct, expectedTags, results, myProducts;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _MyProduct.createMyProductInfo)();

          case 2:
            _ref20 = _context14.sent;
            expectedMyProduct = _ref20.myProduct;
            expectedTags = _ref20.tags;
            _context14.t0 = _immutable2.default;
            _context14.next = 8;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 1, max: 10 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      return _context13.abrupt('return', myProductService.create(expectedMyProduct));

                    case 1:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, undefined);
            }))).toArray());

          case 8:
            _context14.t1 = _context14.sent;
            results = _context14.t0.fromJS.call(_context14.t0, _context14.t1);
            _context14.next = 12;
            return myProductService.search(createCriteria(expectedMyProduct));

          case 12:
            myProducts = _context14.sent;


            expect(myProducts.count).toBe(results.count);
            myProducts.forEach(function (myProduct) {
              expect(results.find(function (_) {
                return _.localeCompare(myProduct.get('id')) === 0;
              })).toBeDefined();
              (0, _MyProduct.expectMyProduct)(myProduct, expectedMyProduct, {
                myProductId: myProduct.get('id'),
                expectedTags: expectedTags
              });
            });

          case 15:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no my product if provided criteria matches no my product', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var myProducts, result;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            myProducts = (0, _immutable.List)();
            result = myProductService.searchAll(createCriteria());
            _context15.prev = 2;

            result.event.subscribe(function (info) {
              myProducts = myProducts.push(info);
            });

            _context15.next = 6;
            return result.promise;

          case 6:
            _context15.prev = 6;

            result.event.unsubscribeAll();
            return _context15.finish(6);

          case 9:

            expect(myProducts.count()).toBe(0);

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[2,, 6, 9]]);
  })));

  test('should return the my product matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var _ref24, expectedMyProduct, expectedTags, results, myProducts, result;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _MyProduct.createMyProductInfo)();

          case 2:
            _ref24 = _context17.sent;
            expectedMyProduct = _ref24.myProduct;
            expectedTags = _ref24.tags;
            _context17.t0 = _immutable2.default;
            _context17.next = 8;
            return Promise.all((0, _immutable.Range)(0, chance.integer({ min: 2, max: 5 })).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      return _context16.abrupt('return', myProductService.create(expectedMyProduct));

                    case 1:
                    case 'end':
                      return _context16.stop();
                  }
                }
              }, _callee16, undefined);
            }))).toArray());

          case 8:
            _context17.t1 = _context17.sent;
            results = _context17.t0.fromJS.call(_context17.t0, _context17.t1);
            myProducts = (0, _immutable.List)();
            result = myProductService.searchAll(createCriteria(expectedMyProduct));
            _context17.prev = 12;

            result.event.subscribe(function (info) {
              myProducts = myProducts.push(info);
            });

            _context17.next = 16;
            return result.promise;

          case 16:
            _context17.prev = 16;

            result.event.unsubscribeAll();
            return _context17.finish(16);

          case 19:

            expect(myProducts.count).toBe(results.count);
            myProducts.forEach(function (myProduct) {
              expect(results.find(function (_) {
                return _.localeCompare(myProduct.get('id')) === 0;
              })).toBeDefined();
              (0, _MyProduct.expectMyProduct)(myProduct, expectedMyProduct, {
                myProductId: myProduct.get('id'),
                expectedTags: expectedTags
              });
            });

          case 21:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[12,, 16, 19]]);
  })));
});

describe('exists', function () {
  test('should return false if no my product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.t0 = expect;
            _context18.next = 3;
            return myProductService.exists(createCriteria());

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

  test('should return true if any my product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
    var myProducts;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return createMyProducts(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            myProducts = _context19.sent;
            _context19.t0 = expect;
            _context19.next = 6;
            return myProductService.exists(createCriteria(myProducts.first()));

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
  test('should return 0 if no my product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.t0 = expect;
            _context20.next = 3;
            return myProductService.count(createCriteria());

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

  test('should return the count of my product match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee21() {
    var myProducts;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return createMyProducts(chance.integer({ min: 1, max: 10 }), true);

          case 2:
            myProducts = _context21.sent;
            _context21.t0 = expect;
            _context21.next = 6;
            return myProductService.count(createCriteria(myProducts.first()));

          case 6:
            _context21.t1 = _context21.sent;
            _context21.t2 = myProducts.count();
            (0, _context21.t0)(_context21.t1).toBe(_context21.t2);

          case 9:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  })));
});