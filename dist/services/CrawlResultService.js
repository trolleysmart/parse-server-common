'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrawlResultService = function (_ServiceBase) {
  _inherits(CrawlResultService, _ServiceBase);

  function CrawlResultService() {
    _classCallCheck(this, CrawlResultService);

    return _possibleConstructorReturn(this, (CrawlResultService.__proto__ || Object.getPrototypeOf(CrawlResultService)).apply(this, arguments));
  }

  return CrawlResultService;
}(_microBusinessParseServerCommon.ServiceBase);

CrawlResultService.messagePrefix = 'No crawl result found with Id: ';

CrawlResultService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info, acl, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _microBusinessParseServerCommon.ServiceBase.create(_schema.CrawlResult, info, acl, sessionToken));

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

CrawlResultService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _microBusinessParseServerCommon.ServiceBase.read(_schema.CrawlResult, id, sessionToken, CrawlResultService.messagePrefix, function (query) {
              return CrawlResultService.buildIncludeQuery(query, criteria);
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

CrawlResultService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', _microBusinessParseServerCommon.ServiceBase.update(_schema.CrawlResult, info, sessionToken, CrawlResultService.messagePrefix));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

CrawlResultService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', _microBusinessParseServerCommon.ServiceBase.delete(_schema.CrawlResult, id, sessionToken, CrawlResultService.messagePrefix));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

CrawlResultService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', _microBusinessParseServerCommon.ServiceBase.search(_schema.CrawlResult, CrawlResultService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

CrawlResultService.searchAll = function (criteria, sessionToken) {
  return _microBusinessParseServerCommon.ServiceBase.searchAll(_schema.CrawlResult, CrawlResultService.buildSearchQuery, criteria, sessionToken);
};

CrawlResultService.count = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', _microBusinessParseServerCommon.ServiceBase.count(CrawlResultService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();

CrawlResultService.exists = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', _microBusinessParseServerCommon.ServiceBase.exists(CrawlResultService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();

CrawlResultService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  if (criteria.has('includeCrawlSession')) {
    var value = criteria.get('includeCrawlSession');

    if (value) {
      query.include('crawlSession');
    }
  }

  return query;
};

CrawlResultService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlResult, criteria);
  var query = CrawlResultService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'crawlSession', 'crawlSession', _schema.CrawlSession);

  return query;
};

exports.default = CrawlResultService;