'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _StapleItemService = require('./StapleItemService');

var _StapleItemService2 = _interopRequireDefault(_StapleItemService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StapleTemplateItemService = function (_ServiceBase) {
  _inherits(StapleTemplateItemService, _ServiceBase);

  function StapleTemplateItemService() {
    var _this2 = this;

    _classCallCheck(this, StapleTemplateItemService);

    var _this = _possibleConstructorReturn(this, (StapleTemplateItemService.__proto__ || Object.getPrototypeOf(StapleTemplateItemService)).call(this, _schema.StapleTemplateItem, StapleTemplateItemService.buildSearchQuery, StapleTemplateItemService.buildIncludeQuery, 'staple template item'));

    _this.cloneStapleTemplateItems = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
        var acl, stapleTemplateItems, stapleItemService;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                acl = _microBusinessParseServerCommon.ParseWrapperService.createACL(user);
                _context.next = 3;
                return _this.search(Map({ limit: 1000 }));

              case 3:
                stapleTemplateItems = _context.sent;
                stapleItemService = new _StapleItemService2.default();
                _context.next = 7;
                return Promise.all(stapleTemplateItems.map(function (stapleTemplateItem) {
                  return stapleItemService.create(stapleTemplateItem.merge({ userId: user.id, stapleTemplateItemId: stapleTemplateItem.get('id') }), acl);
                }).toArray());

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    return _this;
  }

  return StapleTemplateItemService;
}(_microBusinessParseServerCommon.ServiceBase);

StapleTemplateItemService.fields = _immutable.List.of('name', 'description', 'imageUrl', 'popular', 'stapleTemplates', 'tags');

StapleTemplateItemService.buildIncludeQuery = function (query, criteria) {
  if (!criteria) {
    return query;
  }

  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'stapleTemplates');
  _microBusinessParseServerCommon.ServiceBase.addIncludeQuery(criteria, query, 'tags');

  return query;
};

StapleTemplateItemService.buildSearchQuery = function (criteria) {
  var queryWithoutIncludes = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateItem, criteria);
  var query = StapleTemplateItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  StapleTemplateItemService.fields.forEach(function (field) {
    _microBusinessParseServerCommon.ServiceBase.addExistenceQuery(conditions, query, field);
  });
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
  _microBusinessParseServerCommon.ServiceBase.addEqualityQuery(conditions, query, 'popular', 'popular');
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'stapleTemplate', 'stapleTemplates', _schema.StapleTemplate);
  _microBusinessParseServerCommon.ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', _schema.Tag);

  return query;
};

exports.default = StapleTemplateItemService;