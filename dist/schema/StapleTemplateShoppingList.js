'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _StapleTemplate = require('./StapleTemplate');

var _StapleTemplate2 = _interopRequireDefault(_StapleTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StapleTemplateShoppingList = function (_BaseObject) {
  _inherits(StapleTemplateShoppingList, _BaseObject);

  function StapleTemplateShoppingList(object) {
    _classCallCheck(this, StapleTemplateShoppingList);

    var _this = _possibleConstructorReturn(this, (StapleTemplateShoppingList.__proto__ || Object.getPrototypeOf(StapleTemplateShoppingList)).call(this, object, 'StapleTemplateShoppingList'));

    _initialiseProps.call(_this);

    return _this;
  }

  return StapleTemplateShoppingList;
}(_microBusinessParseServerCommon.BaseObject);

StapleTemplateShoppingList.spawn = function (info) {
  var object = new StapleTemplateShoppingList();

  StapleTemplateShoppingList.updateInfoInternal(object, info);

  return object;
};

StapleTemplateShoppingList.updateInfoInternal = function (object, info) {
  object.set('description', info.get('description'));

  if (info.has('stapleTemplateIds')) {
    var stapleTemplateIds = info.get('stapleTemplateIds');

    if (stapleTemplateIds.isEmpty()) {
      object.set('stapleTemplates', []);
    } else {
      object.set('stapleTemplates', stapleTemplateIds.map(function (stapleTemplateId) {
        return _StapleTemplate2.default.createWithoutData(stapleTemplateId);
      }).toArray());
    }
  } else if (info.has('stapleTemplates')) {
    var stapleTemplates = info.get('stapleTemplates');

    if (stapleTemplates.isEmpty()) {
      object.set('stapleTemplates', []);
    } else {
      object.set('stapleTemplates', stapleTemplates.toArray());
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    StapleTemplateShoppingList.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    var stapleTemplateObjects = _this2.getObject().get('stapleTemplates');
    var stapleTemplates = stapleTemplateObjects ? _immutable2.default.fromJS(stapleTemplateObjects).map(function (stapleTemplate) {
      return new _StapleTemplate2.default(stapleTemplate).getInfo();
    }) : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      description: _this2.getObject().get('description'),
      stapleTemplates: stapleTemplates,
      stapleTemplateIds: stapleTemplates ? stapleTemplates.map(function (stapleTemplate) {
        return stapleTemplate.get('id');
      }) : (0, _immutable.List)()
    });
  };
};

exports.default = StapleTemplateShoppingList;