'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProductPrices = exports.createProductPriceInfo = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _ProductPrice = require('../../schema/__tests__/ProductPrice.test');

var _StoreService = require('./StoreService.test');

var _TagService = require('./TagService.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getRandomInt = function getRandomInt(min, max) {
  var intMin = Math.ceil(min);
  var intMax = Math.floor(max);

  return Math.floor(Math.random() * (intMax - intMin)) + intMin;
};

var createCriteriaWthoutConditions = function createCriteriaWthoutConditions() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'description', 'priceDetails', 'priceToDisplay', 'saving', 'savingPercentage', 'offerEndDate', 'status', 'store', 'tags'),
    includeStore: true,
    includeTags: true
  });
};

var createCriteria = function createCriteria(productPrice) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      name: productPrice ? productPrice.get('name') : (0, _v2.default)(),
      description: productPrice ? productPrice.get('description') : (0, _v2.default)(),
      priceDetails: productPrice ? productPrice.get('priceDetails') : (0, _immutable.Map)({ price: getRandomInt(1, 1000) }),
      priceToDisplay: productPrice ? productPrice.get('priceToDisplay') : getRandomInt(1, 1000),
      saving: productPrice ? productPrice.get('saving') : getRandomInt(1, 1000),
      savingPercentage: productPrice ? productPrice.get('savingPercentage') : getRandomInt(1, 1000),
      offerEndDate: productPrice ? productPrice.get('offerEndDate') : new Date(),
      status: productPrice ? productPrice.get('status') : (0, _v2.default)(),
      storeId: productPrice ? productPrice.get('storeId') : undefined,
      tagIds: productPrice ? productPrice.get('tagIds') : undefined
    })
  }).merge(createCriteriaWthoutConditions());
};

var expectProductPrice = function expectProductPrice(productPrice, expectedProductPrice, productPriceId, expectedStore, expectedTags) {
  expect(productPrice.get('id')).toBe(productPriceId);
  expect(productPrice.get('name')).toBe(expectedProductPrice.get('name'));
  expect(productPrice.get('description')).toBe(expectedProductPrice.get('description'));
  expect(productPrice.get('priceDetails')).toEqual(expectedProductPrice.get('priceDetails'));
  expect(productPrice.get('priceToDisplay')).toEqual(expectedProductPrice.get('priceToDisplay'));
  expect(productPrice.get('saving')).toEqual(expectedProductPrice.get('saving'));
  expect(productPrice.get('savingPercentage')).toEqual(expectedProductPrice.get('savingPercentage'));
  expect(productPrice.get('offerEndDate')).toEqual(expectedProductPrice.get('offerEndDate'));
  expect(productPrice.get('status')).toEqual(expectedProductPrice.get('status'));
  expect(productPrice.get('store')).toEqual(expectedStore);
  expect(productPrice.get('tags')).toEqual(expectedTags);
};

var createProductPriceInfo = exports.createProductPriceInfo = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var store, tags;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _StoreService.createStores)(1);

          case 2:
            store = _context.sent.first();
            _context.next = 5;
            return (0, _TagService.createTags)(getRandomInt(1, 10));

          case 5:
            tags = _context.sent;
            return _context.abrupt('return', { productPrice: (0, _ProductPrice.createLightWeigthProductPriceInfo)({ storeId: store.get('id'), tagIds: tags.map(function (_) {
                  return _.get('id');
                }) }), store: store, tags: tags });

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createProductPriceInfo() {
    return _ref.apply(this, arguments);
  };
}();

var createProductPrices = exports.createProductPrices = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(count) {
    var useSameInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var productPrice, _ref3, tempProductPrice;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            productPrice = void 0;

            if (!useSameInfo) {
              _context3.next = 7;
              break;
            }

            _context3.next = 4;
            return createProductPriceInfo();

          case 4:
            _ref3 = _context3.sent;
            tempProductPrice = _ref3.productPrice;


            productPrice = tempProductPrice;

          case 7:
            _context3.t0 = _immutable2.default;
            _context3.next = 10;
            return Promise.all((0, _immutable.Range)(0, count).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
              var finalProductPrice, _ref5, _tempProductPrice;

              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      finalProductPrice = void 0;

                      if (!useSameInfo) {
                        _context2.next = 5;
                        break;
                      }

                      finalProductPrice = productPrice;
                      _context2.next = 10;
                      break;

                    case 5:
                      _context2.next = 7;
                      return createProductPriceInfo();

                    case 7:
                      _ref5 = _context2.sent;
                      _tempProductPrice = _ref5.productPrice;


                      finalProductPrice = _tempProductPrice;

                    case 10:
                      _context2.t0 = _2.ProductPriceService;
                      _context2.next = 13;
                      return _2.ProductPriceService.create(finalProductPrice);

                    case 13:
                      _context2.t1 = _context2.sent;
                      _context2.t2 = createCriteriaWthoutConditions();
                      return _context2.abrupt('return', _context2.t0.read.call(_context2.t0, _context2.t1, _context2.t2));

                    case 16:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, undefined);
            }))).toArray());

          case 10:
            _context3.t1 = _context3.sent;
            return _context3.abrupt('return', _context3.t0.fromJS.call(_context3.t0, _context3.t1));

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function createProductPrices(_x) {
    return _ref2.apply(this, arguments);
  };
}();

describe('create', function () {
  test('should return the created product price Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var productPriceId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = _2.ProductPriceService;
            _context4.next = 3;
            return createProductPriceInfo();

          case 3:
            _context4.t1 = _context4.sent.productPrice;
            _context4.next = 6;
            return _context4.t0.create.call(_context4.t0, _context4.t1);

          case 6:
            productPriceId = _context4.sent;


            expect(productPriceId).toBeDefined();

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  test('should create the product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var _ref8, productPrice, productPriceId, fetchedProductPrice;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return createProductPriceInfo();

          case 2:
            _ref8 = _context5.sent;
            productPrice = _ref8.productPrice;
            _context5.next = 6;
            return _2.ProductPriceService.create(productPrice);

          case 6:
            productPriceId = _context5.sent;
            _context5.next = 9;
            return _2.ProductPriceService.read(productPriceId, createCriteriaWthoutConditions());

          case 9:
            fetchedProductPrice = _context5.sent;


            expect(fetchedProductPrice).toBeDefined();

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided product price Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var productPriceId;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            productPriceId = (0, _v2.default)();
            _context6.prev = 1;
            _context6.next = 4;
            return _2.ProductPriceService.read(productPriceId);

          case 4:
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6['catch'](1);

            expect(_context6.t0.getErrorMessage()).toBe('No product price found with Id: ' + productPriceId);

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 6]]);
  })));

  test('should read the existing product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var _ref11, expectedProductPrice, expectedStore, expectedTags, productPriceId, productPrice;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createProductPriceInfo();

          case 2:
            _ref11 = _context7.sent;
            expectedProductPrice = _ref11.productPrice;
            expectedStore = _ref11.store;
            expectedTags = _ref11.tags;
            _context7.next = 8;
            return _2.ProductPriceService.create(expectedProductPrice);

          case 8:
            productPriceId = _context7.sent;
            _context7.next = 11;
            return _2.ProductPriceService.read(productPriceId, createCriteriaWthoutConditions());

          case 11:
            productPrice = _context7.sent;


            expectProductPrice(productPrice, expectedProductPrice, productPriceId, expectedStore, expectedTags);

          case 13:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided product price Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var productPriceId, productPrice;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            productPriceId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.t0 = _2.ProductPriceService;
            _context8.t1 = _2.ProductPriceService;
            _context8.next = 6;
            return createProductPriceInfo();

          case 6:
            _context8.t2 = _context8.sent.productPrice;
            _context8.next = 9;
            return _context8.t1.create.call(_context8.t1, _context8.t2);

          case 9:
            _context8.t3 = _context8.sent;
            _context8.t4 = createCriteriaWthoutConditions();
            _context8.next = 13;
            return _context8.t0.read.call(_context8.t0, _context8.t3, _context8.t4);

          case 13:
            productPrice = _context8.sent;
            _context8.next = 16;
            return _2.ProductPriceService.update(productPrice.set('id', productPriceId));

          case 16:
            _context8.next = 21;
            break;

          case 18:
            _context8.prev = 18;
            _context8.t5 = _context8['catch'](1);

            expect(_context8.t5.getErrorMessage()).toBe('No product price found with Id: ' + productPriceId);

          case 21:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 18]]);
  })));

  test('should return the Id of the updated product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var _ref14, expectedProductPrice, productPriceId, id;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return createProductPriceInfo();

          case 2:
            _ref14 = _context9.sent;
            expectedProductPrice = _ref14.productPrice;
            _context9.t0 = _2.ProductPriceService;
            _context9.next = 7;
            return createProductPriceInfo();

          case 7:
            _context9.t1 = _context9.sent.productPrice;
            _context9.next = 10;
            return _context9.t0.create.call(_context9.t0, _context9.t1);

          case 10:
            productPriceId = _context9.sent;
            _context9.next = 13;
            return _2.ProductPriceService.update(expectedProductPrice.set('id', productPriceId));

          case 13:
            id = _context9.sent;


            expect(id).toBe(productPriceId);

          case 15:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));

  test('should update the existing product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var _ref16, expectedProductPrice, expectedStore, expectedTags, productPriceId, productPrice;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return createProductPriceInfo();

          case 2:
            _ref16 = _context10.sent;
            expectedProductPrice = _ref16.productPrice;
            expectedStore = _ref16.store;
            expectedTags = _ref16.tags;
            _context10.t0 = _2.ProductPriceService;
            _context10.next = 9;
            return createProductPriceInfo();

          case 9:
            _context10.t1 = _context10.sent.productPrice;
            _context10.next = 12;
            return _context10.t0.create.call(_context10.t0, _context10.t1);

          case 12:
            productPriceId = _context10.sent;
            _context10.next = 15;
            return _2.ProductPriceService.update(expectedProductPrice.set('id', productPriceId));

          case 15:
            _context10.next = 17;
            return _2.ProductPriceService.read(productPriceId, createCriteriaWthoutConditions());

          case 17:
            productPrice = _context10.sent;


            expectProductPrice(productPrice, expectedProductPrice, productPriceId, expectedStore, expectedTags);

          case 19:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided product price Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var productPriceId;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            productPriceId = (0, _v2.default)();
            _context11.prev = 1;
            _context11.next = 4;
            return _2.ProductPriceService.delete(productPriceId);

          case 4:
            _context11.next = 9;
            break;

          case 6:
            _context11.prev = 6;
            _context11.t0 = _context11['catch'](1);

            expect(_context11.t0.getErrorMessage()).toBe('No product price found with Id: ' + productPriceId);

          case 9:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[1, 6]]);
  })));

  test('should delete the existing product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var productPriceId;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.t0 = _2.ProductPriceService;
            _context12.next = 3;
            return createProductPriceInfo();

          case 3:
            _context12.t1 = _context12.sent.productPrice;
            _context12.next = 6;
            return _context12.t0.create.call(_context12.t0, _context12.t1);

          case 6:
            productPriceId = _context12.sent;
            _context12.next = 9;
            return _2.ProductPriceService.delete(productPriceId);

          case 9:
            _context12.prev = 9;
            _context12.next = 12;
            return _2.ProductPriceService.delete(productPriceId);

          case 12:
            _context12.next = 17;
            break;

          case 14:
            _context12.prev = 14;
            _context12.t2 = _context12['catch'](9);

            expect(_context12.t2.getErrorMessage()).toBe('No product price found with Id: ' + productPriceId);

          case 17:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[9, 14]]);
  })));
});

describe('search', function () {
  test('should return no product price if provided criteria matches no product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var productPrices;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _2.ProductPriceService.search(createCriteria());

          case 2:
            productPrices = _context13.sent;


            expect(productPrices.count()).toBe(0);

          case 4:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  })));

  test('should return the products price matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var _ref21, expectedProductPrice, expectedStore, expectedTags, results, productPrices;

    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return createProductPriceInfo();

          case 2:
            _ref21 = _context15.sent;
            expectedProductPrice = _ref21.productPrice;
            expectedStore = _ref21.store;
            expectedTags = _ref21.tags;
            _context15.t0 = _immutable2.default;
            _context15.next = 9;
            return Promise.all((0, _immutable.Range)(0, getRandomInt(2, 5)).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
              return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      return _context14.abrupt('return', _2.ProductPriceService.create(expectedProductPrice));

                    case 1:
                    case 'end':
                      return _context14.stop();
                  }
                }
              }, _callee14, undefined);
            }))).toArray());

          case 9:
            _context15.t1 = _context15.sent;
            results = _context15.t0.fromJS.call(_context15.t0, _context15.t1);
            _context15.next = 13;
            return _2.ProductPriceService.search(createCriteria(expectedProductPrice));

          case 13:
            productPrices = _context15.sent;


            expect(productPrices.count).toBe(results.count);
            productPrices.forEach(function (productPrice) {
              expect(results.find(function (_) {
                return _.localeCompare(productPrice.get('id')) === 0;
              })).toBeDefined();
              expectProductPrice(productPrice, expectedProductPrice, productPrice.get('id'), expectedStore, expectedTags);
            });

          case 16:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no product price if provided criteria matches no product price', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var productPrices, result;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            productPrices = (0, _immutable.List)();
            result = _2.ProductPriceService.searchAll(createCriteria());
            _context16.prev = 2;

            result.event.subscribe(function (info) {
              productPrices = productPrices.push(info);
            });

            _context16.next = 6;
            return result.promise;

          case 6:
            _context16.prev = 6;

            result.event.unsubscribeAll();
            return _context16.finish(6);

          case 9:

            expect(productPrices.count()).toBe(0);

          case 10:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined, [[2,, 6, 9]]);
  })));

  test('should return the products price matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
    var _ref25, expectedProductPrice, expectedStore, expectedTags, results, productPrices, result;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return createProductPriceInfo();

          case 2:
            _ref25 = _context18.sent;
            expectedProductPrice = _ref25.productPrice;
            expectedStore = _ref25.store;
            expectedTags = _ref25.tags;
            _context18.t0 = _immutable2.default;
            _context18.next = 9;
            return Promise.all((0, _immutable.Range)(0, getRandomInt(2, 5)).map(_asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
              return regeneratorRuntime.wrap(function _callee17$(_context17) {
                while (1) {
                  switch (_context17.prev = _context17.next) {
                    case 0:
                      return _context17.abrupt('return', _2.ProductPriceService.create(expectedProductPrice));

                    case 1:
                    case 'end':
                      return _context17.stop();
                  }
                }
              }, _callee17, undefined);
            }))).toArray());

          case 9:
            _context18.t1 = _context18.sent;
            results = _context18.t0.fromJS.call(_context18.t0, _context18.t1);
            productPrices = (0, _immutable.List)();
            result = _2.ProductPriceService.searchAll(createCriteria(expectedProductPrice));
            _context18.prev = 13;

            result.event.subscribe(function (info) {
              productPrices = productPrices.push(info);
            });

            _context18.next = 17;
            return result.promise;

          case 17:
            _context18.prev = 17;

            result.event.unsubscribeAll();
            return _context18.finish(17);

          case 20:

            expect(productPrices.count).toBe(results.count);
            productPrices.forEach(function (productPrice) {
              expect(results.find(function (_) {
                return _.localeCompare(productPrice.get('id')) === 0;
              })).toBeDefined();
              expectProductPrice(productPrice, expectedProductPrice, productPrice.get('id'), expectedStore, expectedTags);
            });

          case 22:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined, [[13,, 17, 20]]);
  })));
});

describe('exists', function () {
  test('should return false if no product price match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.t0 = expect;
            _context19.next = 3;
            return _2.ProductPriceService.exists(createCriteria());

          case 3:
            _context19.t1 = _context19.sent;
            (0, _context19.t0)(_context19.t1).toBeFalsy();

          case 5:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  })));

  test('should return true if any product price match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee20() {
    var productPrices;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return createProductPrices(getRandomInt(1, 10), true);

          case 2:
            productPrices = _context20.sent;
            _context20.t0 = expect;
            _context20.next = 6;
            return _2.ProductPriceService.exists(createCriteria(productPrices.first()));

          case 6:
            _context20.t1 = _context20.sent;
            (0, _context20.t0)(_context20.t1).toBeTruthy();

          case 8:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no master product price match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee21() {
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.t0 = expect;
            _context21.next = 3;
            return _2.ProductPriceService.count(createCriteria());

          case 3:
            _context21.t1 = _context21.sent;
            (0, _context21.t0)(_context21.t1).toBe(0);

          case 5:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  })));

  test('should return the count of master product price match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee22() {
    var productPrices;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return createProductPrices(getRandomInt(1, 10), true);

          case 2:
            productPrices = _context22.sent;
            _context22.t0 = expect;
            _context22.next = 6;
            return _2.ProductPriceService.count(createCriteria(productPrices.first()));

          case 6:
            _context22.t1 = _context22.sent;
            _context22.t2 = productPrices.count();
            (0, _context22.t0)(_context22.t1).toBe(_context22.t2);

          case 9:
          case 'end':
            return _context22.stop();
        }
      }
    }, _callee22, undefined);
  })));
});