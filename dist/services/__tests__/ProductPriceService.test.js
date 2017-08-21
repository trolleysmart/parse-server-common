'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createCriteriaUsingProvidedProductPriceInfo = exports.createCriteria = exports.createIncludeCriteria = exports.createProductPriceInfo = undefined;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _ProductPrice = require('../../schema/__tests__/ProductPrice.test');

var _StoreService = require('./StoreService.test');

var _TagService = require('./TagService.test');

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

var createProductPriceInfo = (exports.createProductPriceInfo = (function() {
  var _ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee() {
      var store, tags;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return (0, _StoreService.createStores)(1);

              case 2:
                store = _context.sent.first();
                _context.next = 5;
                return (0, _TagService.createTags)(2);

              case 5:
                tags = _context.sent;
                return _context.abrupt('return', {
                  productPrice: (0, _ProductPrice.createLightWeigthProductPriceInfo)({
                    storeId: store.get('id'),
                    tagIds: tags.map(function(_) {
                      return _.get('id');
                    }),
                  }),
                  store: store,
                  tags: tags,
                });

              case 7:
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

  return function createProductPriceInfo() {
    return _ref.apply(this, arguments);
  };
})());

var getFieldList = function getFieldList() {
  return _immutable.List.of(
    'name',
    'description',
    'priceDetails',
    'priceToDisplay',
    'saving',
    'savingPercentage',
    'offerEndDate',
    'status',
    'store',
    'tags',
  );
};

var expectProductPrice = function expectProductPrice(productPriceInfo, expectedProductPriceInfo, productPriceId, store, tags) {
  expect(productPriceInfo.get('id')).toBe(productPriceId);
  expect(productPriceInfo.get('name')).toBe(expectedProductPriceInfo.get('name'));
  expect(productPriceInfo.get('description')).toBe(expectedProductPriceInfo.get('description'));
  expect(productPriceInfo.get('priceDetails')).toEqual(expectedProductPriceInfo.get('priceDetails'));
  expect(productPriceInfo.get('priceToDisplay')).toEqual(expectedProductPriceInfo.get('priceToDisplay'));
  expect(productPriceInfo.get('saving')).toEqual(expectedProductPriceInfo.get('saving'));
  expect(productPriceInfo.get('savingPercentage')).toEqual(expectedProductPriceInfo.get('savingPercentage'));
  expect(productPriceInfo.get('offerEndDate')).toEqual(expectedProductPriceInfo.get('offerEndDate'));
  expect(productPriceInfo.get('status')).toEqual(expectedProductPriceInfo.get('status'));
  expect(productPriceInfo.get('store')).toEqual(store);
  expect(productPriceInfo.get('tags')).toEqual(tags);
};

var createIncludeCriteria = (exports.createIncludeCriteria = function createIncludeCriteria() {
  return (0, _immutable.Map)({
    fields: getFieldList(),
    includeStore: true,
    includeTags: true,
  });
});

var createCriteria = (exports.createCriteria = function createCriteria() {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      name: (0, _v2.default)(),
      description: (0, _v2.default)(),
    }),
  }).merge(createProductPriceInfo);
});

var createCriteriaUsingProvidedProductPriceInfo = (exports.createCriteriaUsingProvidedProductPriceInfo = function createCriteriaUsingProvidedProductPriceInfo(
  productPriceInfo,
) {
  return (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      name: productPriceInfo.get('name'),
      description: productPriceInfo.get('description'),
      storeId: productPriceInfo.get('storeId'),
      tags: productPriceInfo.get('tags'),
    }),
  }).merge(createProductPriceInfo);
});

describe('create', function() {
  test(
    'should return the created product price Id',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee2() {
        var productPriceId;
        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.t0 = _2.ProductPriceService;
                  _context2.next = 3;
                  return createProductPriceInfo();

                case 3:
                  _context2.t1 = _context2.sent.productPrice;
                  _context2.next = 6;
                  return _context2.t0.create.call(_context2.t0, _context2.t1);

                case 6:
                  productPriceId = _context2.sent;

                  expect(productPriceId).toBeDefined();

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
    ),
  );

  test(
    'should create the product price',
    _asyncToGenerator(
      regeneratorRuntime.mark(function _callee3() {
        var _ref4, productPrice, store, tags, productPriceId, fetchedProductPrice;

        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.next = 2;
                  return createProductPriceInfo();

                case 2:
                  _ref4 = _context3.sent;
                  productPrice = _ref4.productPrice;
                  store = _ref4.store;
                  tags = _ref4.tags;
                  _context3.next = 8;
                  return _2.ProductPriceService.create(productPrice);

                case 8:
                  productPriceId = _context3.sent;
                  _context3.next = 11;
                  return _2.ProductPriceService.read(productPriceId, createIncludeCriteria());

                case 11:
                  fetchedProductPrice = _context3.sent;

                  expectProductPrice(fetchedProductPrice, productPrice, productPriceId, store, tags);

                case 13:
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
