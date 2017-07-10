'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _ServiceBase2 = require('./ServiceBase');

var _ServiceBase3 = _interopRequireDefault(_ServiceBase2);

var _NewSearchResultReceivedEvent = require('./NewSearchResultReceivedEvent');

var _NewSearchResultReceivedEvent2 = _interopRequireDefault(_NewSearchResultReceivedEvent);

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

MasterProductPriceService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _schema.MasterProductPrice.spawn(info).save();

          case 2:
            result = _context.sent;
            return _context.abrupt('return', result.id);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

MasterProductPriceService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
    var results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice).equalTo('objectId', id).limit(1).find();

          case 2:
            results = _context2.sent;

            if (!(results.length === 0)) {
              _context2.next = 5;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No master product price found with Id: ' + id);

          case 5:
            return _context2.abrupt('return', new _schema.MasterProductPrice(results[0]).getInfo());

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

MasterProductPriceService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info) {
    var results, object;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice).equalTo('objectId', info.get('id')).limit(1).find();

          case 2:
            results = _context3.sent;

            if (!(results.length === 0)) {
              _context3.next = 7;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No master product price found with Id: ' + info.get('id'));

          case 7:
            object = new _schema.MasterProductPrice(results[0]);
            _context3.next = 10;
            return object.updateInfo(info).saveObject();

          case 10:
            return _context3.abrupt('return', object.getId());

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();

MasterProductPriceService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
    var results;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice).equalTo('objectId', id).limit(1).find();

          case 2:
            results = _context4.sent;

            if (!(results.length === 0)) {
              _context4.next = 7;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No master product price found with Id: ' + id);

          case 7:
            _context4.next = 9;
            return results[0].destroy();

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}();

MasterProductPriceService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria) {
    var results;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return MasterProductPriceService.buildSearchQuery(criteria).find();

          case 2:
            results = _context5.sent;
            return _context5.abrupt('return', _immutable2.default.fromJS(results).map(function (_) {
              return new _schema.MasterProductPrice(_).getInfo();
            }));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}();

MasterProductPriceService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = MasterProductPriceService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.MasterProductPrice(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

MasterProductPriceService.exists = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria) {
    var total;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return MasterProductPriceService.count(criteria);

          case 2:
            total = _context6.sent;
            return _context6.abrupt('return', total > 0);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}();

MasterProductPriceService.count = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', MasterProductPriceService.buildSearchQuery(criteria).count());

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x7) {
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

    var query = _microBusinessParseServerCommon.ParseWrapperService.createOrQuery(storeIds.map(function (storeId) {
      return MasterProductPriceService.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], storeId));
    }));

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

  if (conditions.has('status')) {
    var _value6 = conditions.get('status');

    if (_value6) {
      query.equalTo('status', _value6);
    }
  }

  if (conditions.has('specialType')) {
    var _value7 = conditions.get('specialType');

    if (_value7) {
      query.equalTo('priceDetails.specialType', _value7);
    }
  }

  if (conditions.has('not_specialType')) {
    var _value8 = conditions.get('not_specialType');

    if (_value8) {
      query.notEqualTo('priceDetails.specialType', _value8);
    }
  }

  if (conditions.has('masterProductId')) {
    var _value9 = conditions.get('masterProductId');

    if (_value9) {
      query.equalTo('masterProduct', _schema.MasterProduct.createWithoutData(_value9));
    }
  }

  if (conditions.has('storeId')) {
    var _value10 = conditions.get('storeId');

    if (_value10) {
      query.equalTo('store', _schema.Store.createWithoutData(_value10));
    }
  }

  var masterProductQuery = MasterProductPriceService.buildMasterProductQuery(conditions);

  if (masterProductQuery) {
    query.matchesQuery('masterProduct', masterProductQuery);
  }

  var storeQuery = MasterProductPriceService.buildStoreQuery(conditions);

  if (storeQuery) {
    query.matchesQuery('store', storeQuery);
  }

  return query;
};

MasterProductPriceService.buildMasterProductQuery = function (conditions) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct);
  var hasTagsQuery = false;

  if (conditions.has('tag')) {
    var value = conditions.get('tag');

    if (value) {
      query.equalTo('tags', value);
      hasTagsQuery = true;
    }
  }

  if (conditions.has('tags')) {
    var _value11 = conditions.get('tags');

    if (_value11) {
      query.containedIn('tags', _value11.toArray());
      hasTagsQuery = true;
    }
  }

  if (conditions.has('tagId')) {
    var _value12 = conditions.get('tagId');

    if (_value12) {
      query.equalTo('tags', _schema.Tag.createWithoutData(_value12));
      hasTagsQuery = true;
    }
  }

  if (conditions.has('tagIds')) {
    var _value13 = conditions.get('tagIds');

    if (_value13) {
      query.containedIn('tags', _value13.map(function (tagId) {
        return _schema.Tag.createWithoutData(tagId);
      }).toArray());
      hasTagsQuery = true;
    }
  }

  var hasNameQuery = _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');
  var hasDescriptionsQuery = _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'description', 'lowerCaseDescription');

  if (hasNameQuery || hasDescriptionsQuery || hasTagsQuery) {
    return query;
  }

  return null;
};

MasterProductPriceService.buildStoreQuery = function (conditions) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store);
  var hasNameQuery = _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'storeName', 'lowerCaseName');

  if (hasNameQuery) {
    return query;
  }

  return null;
};

exports.default = MasterProductPriceService;