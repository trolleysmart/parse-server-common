'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.expectCrawledProductPrice = exports.createCrawledProductPrice = exports.createCrawledProductPriceInfo = undefined;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

var _StoreService = require('../../services/__tests__/StoreService.test');

var _StoreService2 = _interopRequireDefault(_StoreService);

var _TagService = require('../../services/__tests__/TagService.test');

var _TagService2 = _interopRequireDefault(_TagService);

var _CrawledStoreProductService = require('../../services/__tests__/CrawledStoreProductService.test');

var _CrawledStoreProductService2 = _interopRequireDefault(_CrawledStoreProductService);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            },
          );
        }
      }
      return step('next');
    });
  };
}

var chance = new _chance2.default();

var createCrawledProductPriceInfo = (exports.createCrawledProductPriceInfo = (function() {
  var _ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee() {
      var store, tags, crawledStoreProduct, crawledProductPrice;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return (0, _StoreService2.default)(1);

              case 2:
                store = _context.sent.first();
                _context.next = 5;
                return (0, _TagService2.default)(chance.integer({ min: 1, max: 10 }));

              case 5:
                tags = _context.sent;
                _context.next = 8;
                return (0, _CrawledStoreProductService2.default)(1);

              case 8:
                crawledStoreProduct = _context.sent.first();
                crawledProductPrice = (0, _immutable.Map)({
                  name: (0, _v2.default)(),
                  description: (0, _v2.default)(),
                  priceDetails: (0, _immutable.Map)({
                    price: chance.floating({ min: 0, max: 1000 }),
                  }),
                  priceToDisplay: chance.floating({ min: 0, max: 1000 }),
                  saving: chance.floating({ min: 0, max: 1000 }),
                  savingPercentage: chance.floating({ min: 0, max: 100 }),
                  offerEndDate: new Date(),
                  status: (0, _v2.default)(),
                  special: chance.integer({ min: 0, max: 1000 }) % 2 === 0,
                  barcode: (0, _v2.default)(),
                  size: (0, _v2.default)(),
                  imageUrl: (0, _v2.default)(),
                  productPageUrl: (0, _v2.default)(),
                  storeId: store.get('id'),
                  tagIds: tags.map(function(tag) {
                    return tag.get('id');
                  }),
                  crawledStoreProductId: crawledStoreProduct.get('id'),
                });
                return _context.abrupt('return', {
                  crawledProductPrice: crawledProductPrice,
                  store: store,
                  tags: tags,
                  crawledStoreProduct: crawledStoreProduct,
                });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        undefined,
      );
    }),
  );

  return function createCrawledProductPriceInfo() {
    return _ref.apply(this, arguments);
  };
})());

var createCrawledProductPrice = (exports.createCrawledProductPrice = (function() {
  var _ref2 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(object) {
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.t0 = _.CrawledProductPrice;
                _context2.t1 = object;

                if (_context2.t1) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return createCrawledProductPriceInfo();

              case 5:
                _context2.t1 = _context2.sent.crawledProductPrice;

              case 6:
                _context2.t2 = _context2.t1;
                return _context2.abrupt('return', _context2.t0.spawn.call(_context2.t0, _context2.t2));

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        undefined,
      );
    }),
  );

  return function createCrawledProductPrice(_x) {
    return _ref2.apply(this, arguments);
  };
})());

var expectCrawledProductPrice = (exports.expectCrawledProductPrice = function expectCrawledProductPrice(object, expectedObject) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    crawledProductPriceId = _ref3.crawledProductPriceId,
    expectedStore = _ref3.expectedStore,
    expectedTags = _ref3.expectedTags,
    expectedCrawledStoreProduct = _ref3.expectedCrawledStoreProduct;

  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('priceDetails')).toEqual(expectedObject.get('priceDetails'));
  expect(object.get('priceToDisplay')).toBe(expectedObject.get('priceToDisplay'));
  expect(object.get('saving')).toBe(expectedObject.get('saving'));
  expect(object.get('savingPercentage')).toBe(expectedObject.get('savingPercentage'));
  expect(object.get('offerEndDate')).toEqual(expectedObject.get('offerEndDate'));
  expect(object.get('status')).toBe(expectedObject.get('status'));
  expect(object.get('special')).toBe(expectedObject.get('special'));
  expect(object.get('barcode')).toBe(expectedObject.get('barcode'));
  expect(object.get('size')).toBe(expectedObject.get('size'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('productPageUrl')).toBe(expectedObject.get('productPageUrl'));
  expect(object.get('storeId')).toBe(expectedObject.get('storeId'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));
  expect(object.get('crawledStoreProductId')).toBe(expectedObject.get('crawledStoreProductId'));

  if (crawledProductPriceId) {
    expect(object.get('id')).toBe(crawledProductPriceId);
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
  }

  if (expectedCrawledStoreProduct) {
    expect(object.get('crawledStoreProductId')).toBe(expectedCrawledStoreProduct.get('id'));
  }
});

describe('constructor', function() {
  test(
    'should set class name',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.t0 = expect;
                  _context3.next = 3;
                  return createCrawledProductPrice();

                case 3:
                  _context3.t1 = _context3.sent.className;
                  (0, _context3.t0)(_context3.t1).toBe('CrawledProductPrice');

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          },
          _callee3,
          undefined,
        );
      }),
    ),
  );
});

describe('static public methods', function() {
  test(
    'spawn should set provided info',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee4() {
        var _ref6, crawledProductPrice, object, info;

        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return createCrawledProductPriceInfo();

                case 2:
                  _ref6 = _context4.sent;
                  crawledProductPrice = _ref6.crawledProductPrice;
                  _context4.next = 6;
                  return createCrawledProductPrice(crawledProductPrice);

                case 6:
                  object = _context4.sent;
                  info = object.getInfo();

                  expectCrawledProductPrice(info, crawledProductPrice);

                case 9:
                case 'end':
                  return _context4.stop();
              }
            }
          },
          _callee4,
          undefined,
        );
      }),
    ),
  );
});

describe('public methods', function() {
  test(
    'getObject should return provided object',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee5() {
        var object;
        return regeneratorRuntime.wrap(
          function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  _context5.next = 2;
                  return createCrawledProductPrice();

                case 2:
                  object = _context5.sent;

                  expect(new _.CrawledProductPrice(object).getObject()).toBe(object);

                case 4:
                case 'end':
                  return _context5.stop();
              }
            }
          },
          _callee5,
          undefined,
        );
      }),
    ),
  );

  test(
    'getId should return provided object Id',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee6() {
        var object;
        return regeneratorRuntime.wrap(
          function _callee6$(_context6) {
            while (1) {
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  _context6.next = 2;
                  return createCrawledProductPrice();

                case 2:
                  object = _context6.sent;

                  expect(new _.CrawledProductPrice(object).getId()).toBe(object.id);

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          },
          _callee6,
          undefined,
        );
      }),
    ),
  );

  test(
    'updateInfo should update object info',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee7() {
        var object, _ref10, updatedCrawledProductPrice, info;

        return regeneratorRuntime.wrap(
          function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  _context7.next = 2;
                  return createCrawledProductPrice();

                case 2:
                  object = _context7.sent;
                  _context7.next = 5;
                  return createCrawledProductPriceInfo();

                case 5:
                  _ref10 = _context7.sent;
                  updatedCrawledProductPrice = _ref10.crawledProductPrice;

                  object.updateInfo(updatedCrawledProductPrice);

                  info = object.getInfo();

                  expectCrawledProductPrice(info, updatedCrawledProductPrice);

                case 10:
                case 'end':
                  return _context7.stop();
              }
            }
          },
          _callee7,
          undefined,
        );
      }),
    ),
  );

  test(
    'getInfo should return provided info',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee8() {
        var _ref12, crawledProductPrice, object, info;

        return regeneratorRuntime.wrap(
          function _callee8$(_context8) {
            while (1) {
              switch ((_context8.prev = _context8.next)) {
                case 0:
                  _context8.next = 2;
                  return createCrawledProductPriceInfo();

                case 2:
                  _ref12 = _context8.sent;
                  crawledProductPrice = _ref12.crawledProductPrice;
                  _context8.next = 6;
                  return createCrawledProductPrice(crawledProductPrice);

                case 6:
                  object = _context8.sent;
                  info = object.getInfo();

                  expect(info.get('id')).toBe(object.getId());
                  expectCrawledProductPrice(info, crawledProductPrice);

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          },
          _callee8,
          undefined,
        );
      }),
    ),
  );
});
