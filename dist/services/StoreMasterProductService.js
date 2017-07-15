'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _ServiceBase2 = require('./ServiceBase');

var _ServiceBase3 = _interopRequireDefault(_ServiceBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreMasterProductService = function (_ServiceBase) {
  _inherits(StoreMasterProductService, _ServiceBase);

  function StoreMasterProductService() {
    _classCallCheck(this, StoreMasterProductService);

    return _possibleConstructorReturn(this, (StoreMasterProductService.__proto__ || Object.getPrototypeOf(StoreMasterProductService)).apply(this, arguments));
  }

  return StoreMasterProductService;
}(_ServiceBase3.default);

StoreMasterProductService.messagePrefix = 'No store master product found with Id: ';

StoreMasterProductService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info, acl) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _ServiceBase3.default.create(_schema.StoreMasterProduct, info, acl));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

StoreMasterProductService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _ServiceBase3.default.read(_schema.StoreMasterProduct, info, sessionToken, StoreMasterProductService.messagePrefix));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

StoreMasterProductService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', _ServiceBase3.default.update(_schema.StoreMasterProduct, info, sessionToken, StoreMasterProductService.messagePrefix));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

StoreMasterProductService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', _ServiceBase3.default.delete(_schema.StoreMasterProduct, info, sessionToken, StoreMasterProductService.messagePrefix));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

StoreMasterProductService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', _ServiceBase3.default.search(_schema.StoreMasterProduct, StoreMasterProductService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

StoreMasterProductService.searchAll = function (criteria, sessionToken) {
  return _ServiceBase3.default.searchAll(_schema.StoreMasterProduct, StoreMasterProductService.buildSearchQuery, criteria, sessionToken);
};

StoreMasterProductService.count = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', _ServiceBase3.default.count(StoreMasterProductService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

StoreMasterProductService.exists = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', _ServiceBase3.default.exists(StoreMasterProductService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

StoreMasterProductService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreMasterProduct, criteria);

  if (criteria.has('includeStoreTags')) {
    var value = criteria.get('includeStoreTags');

    if (value) {
      query.include('storeTags');
    }
  }

  if (criteria.has('includeStore')) {
    var _value = criteria.get('includeStore');

    if (_value) {
      query.include('store');
    }
  }

  if (criteria.has('includeMasterProduct')) {
    var _value2 = criteria.get('includeMasterProduct');

    if (_value2) {
      query.include('masterProduct');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

  if (conditions.has('with_name')) {
    var _value3 = conditions.get('with_name');

    if (_value3) {
      query.exists('name');
    }
  }

  if (conditions.has('without_name')) {
    var _value4 = conditions.get('without_name');

    if (_value4) {
      query.doesNotExist('name');
    }
  }

  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'description', 'lowerCaseDescription');

  if (conditions.has('barcode')) {
    var _value5 = conditions.get('barcode');

    if (_value5) {
      query.equalTo('barcode', _value5);
    }
  }

  if (conditions.has('productPageUrl')) {
    var _value6 = conditions.get('productPageUrl');

    if (_value6) {
      query.equalTo('productPageUrl', _value6);
    }
  }

  if (conditions.has('imageUrl')) {
    var _value7 = conditions.get('imageUrl');

    if (_value7) {
      query.equalTo('imageUrl', _value7);
    }
  }

  if (conditions.has('size')) {
    var _value8 = conditions.get('size');

    if (_value8) {
      query.equalTo('size', _value8);
    }
  }

  if (conditions.has('lastCrawlDateTime')) {
    var _value9 = conditions.get('lastCrawlDateTime');

    if (_value9) {
      query.equalTo('lastCrawlDateTime', _value9);
    }
  }

  if (conditions.has('lessThanOrEqualTo_lastCrawlDateTime')) {
    var _value10 = conditions.get('lessThanOrEqualTo_lastCrawlDateTime');

    if (_value10) {
      query.lessThanOrEqualTo('lastCrawlDateTime', _value10);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_lastCrawlDateTime')) {
    var _value11 = conditions.get('greaterThanOrEqualTo_lastCrawlDateTime');

    if (_value11) {
      query.greaterThanOrEqualTo('lastCrawlDateTime', _value11);
    }
  }

  if (conditions.has('storeTag')) {
    var _value12 = conditions.get('storeTag');

    if (_value12) {
      query.equalTo('storeTags', _value12);
    }
  }

  if (conditions.has('storeTags')) {
    var _value13 = conditions.get('storeTags');

    if (_value13) {
      query.containedIn('storeTags', _value13.toArray());
    }
  }

  if (conditions.has('storeTagId')) {
    var _value14 = conditions.get('storeTagId');

    if (_value14) {
      query.equalTo('storeTags', _schema.StoreTag.createWithoutData(_value14));
    }
  }

  if (conditions.has('storeTagIds')) {
    var _value15 = conditions.get('storeTagIds');

    if (_value15) {
      query.containedIn('storeTags', _value15.map(function (storeTagId) {
        return _schema.StoreTag.createWithoutData(storeTagId);
      }).toArray());
    }
  }

  if (conditions.has('store')) {
    var _value16 = conditions.get('store');

    if (_value16) {
      query.equalTo('store', _value16);
    }
  }

  if (conditions.has('storeId')) {
    var _value17 = conditions.get('storeId');

    if (_value17) {
      query.equalTo('store', _schema.Store.createWithoutData(_value17));
    }
  }

  if (conditions.has('with_masterProduct')) {
    var _value18 = conditions.get('with_masterProduct');

    if (_value18) {
      query.exists('masterProduct');
    }
  }

  if (conditions.has('without_masterProduct')) {
    var _value19 = conditions.get('without_masterProduct');

    if (_value19) {
      query.doesNotExist('masterProduct');
    }
  }

  if (conditions.has('masterProduct')) {
    var _value20 = conditions.get('masterProduct');

    if (_value20) {
      query.equalTo('masterProduct', _value20);
    }
  }

  if (conditions.has('masterProductId')) {
    var _value21 = conditions.get('masterProductId');

    if (_value21) {
      query.equalTo('masterProduct', _schema.MasterProduct.createWithoutData(_value21));
    }
  }

  return query;
};

exports.default = StoreMasterProductService;