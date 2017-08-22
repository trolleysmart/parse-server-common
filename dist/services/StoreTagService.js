'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

var StoreTagService = (function(_ServiceBase) {
  _inherits(StoreTagService, _ServiceBase);

  function StoreTagService() {
    _classCallCheck(this, StoreTagService);

    return _possibleConstructorReturn(this, (StoreTagService.__proto__ || Object.getPrototypeOf(StoreTagService)).apply(this, arguments));
  }

  return StoreTagService;
})(_microBusinessParseServerCommon.ServiceBase);

StoreTagService.messagePrefix = 'No store tag found with Id: ';

StoreTagService.create = (function() {
  var _ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee(info, acl, sessionToken) {
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                return _context.abrupt('return', _microBusinessParseServerCommon.ServiceBase.create(_schema.StoreTag, info, acl, sessionToken));

              case 1:
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

  return function(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

StoreTagService.read = (function() {
  var _ref2 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(id, criteria, sessionToken) {
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                return _context2.abrupt(
                  'return',
                  _microBusinessParseServerCommon.ServiceBase.read(_schema.StoreTag, id, sessionToken, StoreTagService.messagePrefix, function(
                    query,
                  ) {
                    return StoreTagService.buildIncludeQuery(query, criteria);
                  }),
                );

              case 1:
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

  return function(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

StoreTagService.update = (function() {
  var _ref3 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee3(info, sessionToken) {
      return regeneratorRuntime.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                return _context3.abrupt(
                  'return',
                  _microBusinessParseServerCommon.ServiceBase.update(_schema.StoreTag, info, sessionToken, StoreTagService.messagePrefix),
                );

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee3,
        undefined,
      );
    }),
  );

  return function(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})();

StoreTagService.delete = (function() {
  var _ref4 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee4(id, sessionToken) {
      return regeneratorRuntime.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                return _context4.abrupt(
                  'return',
                  _microBusinessParseServerCommon.ServiceBase.delete(_schema.StoreTag, id, sessionToken, StoreTagService.messagePrefix),
                );

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        },
        _callee4,
        undefined,
      );
    }),
  );

  return function(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
})();

StoreTagService.search = (function() {
  var _ref5 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
      return regeneratorRuntime.wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                return _context5.abrupt(
                  'return',
                  _microBusinessParseServerCommon.ServiceBase.search(_schema.StoreTag, StoreTagService.buildSearchQuery, criteria, sessionToken),
                );

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        },
        _callee5,
        undefined,
      );
    }),
  );

  return function(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
})();

StoreTagService.searchAll = function(criteria, sessionToken) {
  return _microBusinessParseServerCommon.ServiceBase.searchAll(_schema.StoreTag, StoreTagService.buildSearchQuery, criteria, sessionToken);
};

StoreTagService.count = (function() {
  var _ref6 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
      return regeneratorRuntime.wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                return _context6.abrupt(
                  'return',
                  _microBusinessParseServerCommon.ServiceBase.count(StoreTagService.buildSearchQuery, criteria, sessionToken),
                );

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        },
        _callee6,
        undefined,
      );
    }),
  );

  return function(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
})();

StoreTagService.exists = (function() {
  var _ref7 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
      return regeneratorRuntime.wrap(
        function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                return _context7.abrupt(
                  'return',
                  _microBusinessParseServerCommon.ServiceBase.exists(StoreTagService.buildSearchQuery, criteria, sessionToken),
                );

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        },
        _callee7,
        undefined,
      );
    }),
  );

  return function(_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
})();

StoreTagService.buildIncludeQuery = function(query, criteria) {
  if (!criteria) {
    return query;
  }

  if (criteria.has('includeParentStoreTag')) {
    var value = criteria.get('includeParentStoreTag');

    if (value) {
      query.include('parentStoreTag');
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

  return query;
};

StoreTagService.buildSearchQuery = function(criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreTag, criteria);
  var query = StoreTagService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'name');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'description');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'url', 'url');
  _microBusinessParseServerCommon.ServiceBase.addNumberQuery(conditions, query, 'level', 'level');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'parentStoreTag', 'parentStoreTag', _schema.StoreTag);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'store', 'store', _schema.Store);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tag', _schema.Tag);

  return query;
};

exports.default = StoreTagService;
