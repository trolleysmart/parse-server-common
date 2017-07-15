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

var StoreTagService = function (_ServiceBase) {
  _inherits(StoreTagService, _ServiceBase);

  function StoreTagService() {
    _classCallCheck(this, StoreTagService);

    return _possibleConstructorReturn(this, (StoreTagService.__proto__ || Object.getPrototypeOf(StoreTagService)).apply(this, arguments));
  }

  return StoreTagService;
}(_ServiceBase3.default);

StoreTagService.messagePrefix = 'No store tag found with Id: ';

StoreTagService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info, acl) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _ServiceBase3.default.create(_schema.StoreTag, info, acl));

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

StoreTagService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _ServiceBase3.default.read(_schema.StoreTag, info, sessionToken, StoreTagService.messagePrefix));

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

StoreTagService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', _ServiceBase3.default.update(_schema.StoreTag, info, sessionToken, StoreTagService.messagePrefix));

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

StoreTagService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', _ServiceBase3.default.delete(_schema.StoreTag, info, sessionToken, StoreTagService.messagePrefix));

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

StoreTagService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', _ServiceBase3.default.search(_schema.StoreTag, StoreTagService.buildSearchQuery, criteria, sessionToken));

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

StoreTagService.searchAll = function (criteria, sessionToken) {
  return _ServiceBase3.default.searchAll(_schema.StoreTag, StoreTagService.buildSearchQuery, criteria, sessionToken);
};

StoreTagService.count = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', _ServiceBase3.default.count(StoreTagService.buildSearchQuery, criteria, sessionToken));

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

StoreTagService.exists = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', _ServiceBase3.default.exists(StoreTagService.buildSearchQuery, criteria, sessionToken));

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

StoreTagService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreTag, criteria);

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

  if (criteria.has('includeTag')) {
    var _value2 = criteria.get('includeTag');

    if (_value2) {
      query.include('tag');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('key')) {
    var _value3 = conditions.get('key');

    if (_value3) {
      query.equalTo('key', _value3);
    }
  }

  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

  if (conditions.has('weight')) {
    var _value4 = conditions.get('weight');

    if (_value4) {
      query.equalTo('weight', _value4);
    }
  }

  if (conditions.has('url')) {
    var _value5 = conditions.get('url');

    if (_value5) {
      query.equalTo('url', _value5);
    }
  }

  if (conditions.has('storeTag')) {
    var _value6 = conditions.get('storeTag');

    if (_value6) {
      query.equalTo('storeTags', _value6);
    }
  }

  if (conditions.has('storeTags')) {
    var _value7 = conditions.get('storeTags');

    if (_value7) {
      query.containedIn('storeTags', _value7.toArray());
    }
  }

  if (conditions.has('storeTagId')) {
    var _value8 = conditions.get('storeTagId');

    if (_value8) {
      query.equalTo('storeTags', _schema.StoreTag.createWithoutData(_value8));
    }
  }

  if (conditions.has('storeTagIds')) {
    var _value9 = conditions.get('storeTagIds');

    if (_value9) {
      query.containedIn('storeTags', _value9.map(function (storeTagId) {
        return _schema.StoreTag.createWithoutData(storeTagId);
      }).toArray());
    }
  }

  if (conditions.has('store')) {
    var _value10 = conditions.get('store');

    if (_value10) {
      query.equalTo('store', _value10);
    }
  }

  if (conditions.has('storeId')) {
    var _value11 = conditions.get('storeId');

    if (_value11) {
      query.equalTo('store', _schema.Store.createWithoutData(_value11));
    }
  }

  if (conditions.has('tag')) {
    var _value12 = conditions.get('tag');

    if (_value12) {
      query.equalTo('tag', _value12);
    }
  }

  if (conditions.has('tagId')) {
    var _value13 = conditions.get('tagId');

    if (_value13) {
      query.equalTo('tag', _schema.Tag.createWithoutData(_value13));
    }
  }

  return query;
};

exports.default = StoreTagService;