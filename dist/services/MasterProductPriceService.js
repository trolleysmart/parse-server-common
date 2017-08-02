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

var MasterProductPriceService = function (_ServiceBase) {
  _inherits(MasterProductPriceService, _ServiceBase);

  function MasterProductPriceService() {
    _classCallCheck(this, MasterProductPriceService);

    return _possibleConstructorReturn(this, (MasterProductPriceService.__proto__ || Object.getPrototypeOf(MasterProductPriceService)).apply(this, arguments));
  }

  return MasterProductPriceService;
}(_ServiceBase3.default);

MasterProductPriceService.messagePrefix = 'No master product price found with Id: ';

MasterProductPriceService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info, acl, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _ServiceBase3.default.create(_schema.MasterProductPrice, info, acl, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

MasterProductPriceService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _ServiceBase3.default.read(_schema.MasterProductPrice, info, sessionToken, MasterProductPriceService.messagePrefix));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

MasterProductPriceService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', _ServiceBase3.default.update(_schema.MasterProductPrice, info, sessionToken, MasterProductPriceService.messagePrefix));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

MasterProductPriceService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', _ServiceBase3.default.delete(_schema.MasterProductPrice, info, sessionToken, MasterProductPriceService.messagePrefix));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

MasterProductPriceService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', _ServiceBase3.default.search(_schema.MasterProductPrice, MasterProductPriceService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

MasterProductPriceService.searchAll = function (criteria, sessionToken) {
  return _ServiceBase3.default.searchAll(_schema.MasterProductPrice, MasterProductPriceService.buildSearchQuery, criteria, sessionToken);
};

MasterProductPriceService.count = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', _ServiceBase3.default.count(MasterProductPriceService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

MasterProductPriceService.exists = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', _ServiceBase3.default.exists(MasterProductPriceService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

MasterProductPriceService.buildSearchQuery = function (criteria) {
  if (!criteria.has('conditions')) {
    return MasterProductPriceService.buildSearchQueryInternal(criteria);
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('storeIds')) {
    var storeIds = conditions.get('storeIds');

    if (storeIds.isEmpty()) {
      return MasterProductPriceService.buildSearchQueryInternal(criteria);
    } else if (storeIds.count() === 1) {
      return MasterProductPriceService.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], storeIds.first()));
    }

    var queryWithoutStandardCriteriaAdded = _microBusinessParseServerCommon.ParseWrapperService.createOrQuery(storeIds.map(function (storeId) {
      return MasterProductPriceService.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], storeId));
    }));

    var query = _microBusinessParseServerCommon.ParseWrapperService.addStandardCriteriaToQuery(_schema.MasterProductPrice, queryWithoutStandardCriteriaAdded, criteria);

    if (criteria.has('includeMasterProduct')) {
      var value = criteria.get('includeMasterProduct');

      if (value) {
        query.include('masterProduct');
      }
    }

    if (criteria.has('includeStore')) {
      var _value = criteria.get('includeStore');

      if (_value) {
        query.include('store');
      }
    }

    return query;
  }

  return MasterProductPriceService.buildSearchQueryInternal(criteria);
};

MasterProductPriceService.buildSearchQueryInternal = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice, criteria);

  if (criteria.has('includeMasterProduct')) {
    var value = criteria.get('includeMasterProduct');

    if (value) {
      query.include('masterProduct');
    }
  }

  if (criteria.has('includeStore')) {
    var _value2 = criteria.get('includeStore');

    if (_value2) {
      query.include('store');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('priceToDisplay')) {
    var _value3 = conditions.get('priceToDisplay');

    if (_value3) {
      query.equalTo('priceToDisplay', _value3);
    }
  }

  if (conditions.has('lessThanOrEqualTo_priceToDisplay')) {
    var _value4 = conditions.get('lessThanOrEqualTo_priceToDisplay');

    if (_value4) {
      query.lessThanOrEqualTo('priceToDisplay', _value4);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_priceToDisplay')) {
    var _value5 = conditions.get('greaterThanOrEqualTo_priceToDisplay');

    if (_value5) {
      query.greaterThanOrEqualTo('priceToDisplay', _value5);
    }
  }

  if (conditions.has('saving')) {
    var _value6 = conditions.get('saving');

    if (_value6) {
      query.equalTo('saving', _value6);
    }
  }

  if (conditions.has('lessThanOrEqualTo_saving')) {
    var _value7 = conditions.get('lessThanOrEqualTo_saving');

    if (_value7) {
      query.lessThanOrEqualTo('saving', _value7);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_saving')) {
    var _value8 = conditions.get('greaterThanOrEqualTo_saving');

    if (_value8) {
      query.greaterThanOrEqualTo('saving', _value8);
    }
  }

  if (conditions.has('savingPercentage')) {
    var _value9 = conditions.get('savingPercentage');

    if (_value9) {
      query.equalTo('savingPercentage', _value9);
    }
  }

  if (conditions.has('lessThanOrEqualTo_savingPercentage')) {
    var _value10 = conditions.get('lessThanOrEqualTo_savingPercentage');

    if (_value10) {
      query.lessThanOrEqualTo('savingPercentage', _value10);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_savingPercentage')) {
    var _value11 = conditions.get('greaterThanOrEqualTo_savingPercentage');

    if (_value11) {
      query.greaterThanOrEqualTo('savingPercentage', _value11);
    }
  }

  if (conditions.has('offerEndDate')) {
    var _value12 = conditions.get('offerEndDate');

    if (_value12) {
      query.equalTo('offerEndDate', _value12);
    }
  }

  if (conditions.has('lessThanOrEqualTo_offerEndDate')) {
    var _value13 = conditions.get('lessThanOrEqualTo_offerEndDate');

    if (_value13) {
      query.lessThanOrEqualTo('offerEndDate', _value13);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_offerEndDate')) {
    var _value14 = conditions.get('greaterThanOrEqualTo_offerEndDate');

    if (_value14) {
      query.greaterThanOrEqualTo('offerEndDate', _value14);
    }
  }

  if (conditions.has('firstCrawledDate')) {
    var _value15 = conditions.get('firstCrawledDate');

    if (_value15) {
      query.equalTo('firstCrawledDate', _value15);
    }
  }

  if (conditions.has('lessThanOrEqualTo_firstCrawledDate')) {
    var _value16 = conditions.get('lessThanOrEqualTo_firstCrawledDate');

    if (_value16) {
      query.lessThanOrEqualTo('firstCrawledDate', _value16);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_firstCrawledDate')) {
    var _value17 = conditions.get('greaterThanOrEqualTo_firstCrawledDate');

    if (_value17) {
      query.greaterThanOrEqualTo('firstCrawledDate', _value17);
    }
  }

  if (conditions.has('status')) {
    var _value18 = conditions.get('status');

    if (_value18) {
      query.equalTo('status', _value18);
    }
  }

  if (conditions.has('specialType')) {
    var _value19 = conditions.get('specialType');

    if (_value19) {
      query.equalTo('priceDetails.specialType', _value19);
    }
  }

  if (conditions.has('not_specialType')) {
    var _value20 = conditions.get('not_specialType');

    if (_value20) {
      query.notEqualTo('priceDetails.specialType', _value20);
    }
  }

  if (conditions.has('masterProductId')) {
    var _value21 = conditions.get('masterProductId');

    if (_value21) {
      query.equalTo('masterProduct', _schema.MasterProduct.createWithoutData(_value21));
    }
  }

  if (conditions.has('storeId')) {
    var _value22 = conditions.get('storeId');

    if (_value22) {
      query.equalTo('store', _schema.Store.createWithoutData(_value22));
    }
  }

  if (conditions.has('tag')) {
    var _value23 = conditions.get('tag');

    if (_value23) {
      query.equalTo('tags', _value23);
    }
  }

  if (conditions.has('tags')) {
    var _value24 = conditions.get('tags');

    if (_value24) {
      query.containedIn('tags', _value24.toArray());
    }
  }

  if (conditions.has('tagId')) {
    var _value25 = conditions.get('tagId');

    if (_value25) {
      query.equalTo('tags', _schema.Tag.createWithoutData(_value25));
    }
  }

  if (conditions.has('tagIds')) {
    var _value26 = conditions.get('tagIds');

    if (_value26) {
      query.containedIn('tags', _value26.map(function (tagId) {
        return _schema.Tag.createWithoutData(tagId);
      }).toArray());
    }
  }

  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'name', 'name');
  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'description', 'description');
  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'storeName', 'storeName');

  return query;
};

exports.default = MasterProductPriceService;