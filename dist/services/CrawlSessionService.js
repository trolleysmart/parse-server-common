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

var CrawlSessionService = function (_ServiceBase) {
  _inherits(CrawlSessionService, _ServiceBase);

  function CrawlSessionService() {
    _classCallCheck(this, CrawlSessionService);

    return _possibleConstructorReturn(this, (CrawlSessionService.__proto__ || Object.getPrototypeOf(CrawlSessionService)).apply(this, arguments));
  }

  return CrawlSessionService;
}(_ServiceBase3.default);

CrawlSessionService.messagePrefix = 'No crawl session found with Id: ';

CrawlSessionService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info, acl, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _ServiceBase3.default.create(_schema.CrawlSession, info, acl, sessionToken));

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

CrawlSessionService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _ServiceBase3.default.read(_schema.CrawlSession, id, sessionToken, CrawlSessionService.messagePrefix));

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

CrawlSessionService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', _ServiceBase3.default.update(_schema.CrawlSession, info, sessionToken, CrawlSessionService.messagePrefix));

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

CrawlSessionService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', _ServiceBase3.default.delete(_schema.CrawlSession, id, sessionToken, CrawlSessionService.messagePrefix));

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

CrawlSessionService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', _ServiceBase3.default.search(_schema.CrawlSession, CrawlSessionService.buildSearchQuery, criteria, sessionToken));

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

CrawlSessionService.searchAll = function (criteria, sessionToken) {
  return _ServiceBase3.default.searchAll(_schema.CrawlSession, CrawlSessionService.buildSearchQuery, criteria, sessionToken);
};

CrawlSessionService.count = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', _ServiceBase3.default.count(CrawlSessionService.buildSearchQuery, criteria, sessionToken));

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

CrawlSessionService.exists = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', _ServiceBase3.default.exists(CrawlSessionService.buildSearchQuery, criteria, sessionToken));

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

CrawlSessionService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('sessionKey')) {
    var value = conditions.get('sessionKey');

    if (value) {
      query.equalTo('sessionKey', value);
    }
  }

  if (conditions.has('startsWith_sessionKey')) {
    var _value = conditions.get('startsWith_sessionKey');

    if (_value) {
      query.startsWith('sessionKey', _value);
    }
  }

  if (conditions.has('contains_sessionKey')) {
    var _value2 = conditions.get('contains_sessionKey');

    if (_value2) {
      query.contains('sessionKey', _value2);
    }
  }

  if (conditions.has('startDateTime')) {
    var _value3 = conditions.get('startDateTime');

    if (_value3) {
      query.equalTo('startDateTime', _value3);
    }
  }

  if (conditions.has('lessThanOrEqualTo_startDateTime')) {
    var _value4 = conditions.get('lessThanOrEqualTo_startDateTime');

    if (_value4) {
      query.lessThanOrEqualTo('startDateTime', _value4);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_startDateTime')) {
    var _value5 = conditions.get('greaterThanOrEqualTo_startDateTime');

    if (_value5) {
      query.greaterThanOrEqualTo('startDateTime', _value5);
    }
  }

  if (conditions.has('endDateTime')) {
    var _value6 = conditions.get('endDateTime');

    if (_value6) {
      query.equalTo('endDateTime', _value6);
    }
  }

  if (conditions.has('lessThanOrEqualTo_endDateTime')) {
    var _value7 = conditions.get('lessThanOrEqualTo_endDateTime');

    if (_value7) {
      query.lessThanOrEqualTo('endDateTime', _value7);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_endDateTime')) {
    var _value8 = conditions.get('greaterThanOrEqualTo_endDateTime');

    if (_value8) {
      query.greaterThanOrEqualTo('endDateTime', _value8);
    }
  }

  return query;
};

exports.default = CrawlSessionService;